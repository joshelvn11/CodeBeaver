---
title: APIView() Class
---

### What is `APIView`?

The `APIView` class is part of DRF and provides the core functionality for creating custom views. It extends Django's regular class-based views to provide additional features specific to API development, such as content negotiation and handling various HTTP methods more conveniently.

### Key Features of `APIView`

1. **Method Handling**: Define methods like `get()`, `post()`, `put()`, and `delete()` to handle corresponding HTTP requests.
2. **Content Negotiation**: Automatically handles different content types (e.g., JSON, XML) based on client requests.
3. **Exception Handling**: Provides built-in exception handling for common errors.
4. **Authentication and Permissions**: Easily integrate authentication and permission checks.

### Basic Structure

Here’s the basic structure of an `APIView`:

```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class MyAPIView(APIView):
    def get(self, request, *args, **kwargs):
        # Handle GET request
        return Response({"message": "GET request received"})

    def post(self, request, *args, **kwargs):
        # Handle POST request
        return Response({"message": "POST request received"}, status=status.HTTP_201_CREATED)
```

### Example: Creating a Simple API

Let's create a simple API for managing `Item` objects using `APIView`.

1. **Define the Model**

```python
# models.py
from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
```

2. **Create a Serializer**

```python
# serializers.py
from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ['id', 'name', 'description']
```

3. **Create Views Using `APIView`**

```python
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404
from .models import Item
from .serializers import ItemSerializer

class ItemList(APIView):
    """
    List all items, or create a new item.
    """
    def get(self, request):
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ItemDetail(APIView):
    """
    Retrieve, update, or delete an item instance.
    """
    def get_object(self, pk):
        try:
            return Item.objects.get(pk=pk)
        except Item.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        item = self.get_object(pk)
        serializer = ItemSerializer(item)
        return Response(serializer.data)

    def put(self, request, pk):
        item = self.get_object(pk)
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        item = self.get_object(pk)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

4. **Configure URLs**

```python
# urls.py
from django.urls import path
from .views import ItemList, ItemDetail

urlpatterns = [
    path('items/', ItemList.as_view(), name='item-list'),
    path('items/<int:pk>/', ItemDetail.as_view(), name='item-detail'),
]
```

### Detailed Explanation

- **`ItemList` Class**:

  - **GET Method**: Retrieves and returns all `Item` objects in the database.
  - **POST Method**: Accepts data to create a new `Item` and saves it to the database.

- **`ItemDetail` Class**:
  - **`get_object` Method**: Helper method to retrieve an `Item` by its primary key (`pk`). Raises `Http404` if the item does not exist.
  - **GET Method**: Retrieves and returns a specific `Item` based on its `pk`.
  - **PUT Method**: Updates an existing `Item` with new data.
  - **DELETE Method**: Deletes a specific `Item`.

### Key Points to Remember

1. **Defining Methods**: You define methods (`get`, `post`, `put`, `delete`, etc.) inside the `APIView` class to handle different types of HTTP requests.
2. **Automatic Method Calls**: DRF automatically calls the appropriate method based on the HTTP request type.
3. **Response Handling**: Use the `Response` class to return data and HTTP status codes.
4. **Error Handling**: Use exceptions like `Http404` to handle errors gracefully.
5. **Content Negotiation**: DRF handles different content types automatically, responding with the appropriate format (e.g., JSON).

### Summary

The `APIView` class in Django Rest Framework provides a flexible way to handle HTTP requests in a clean and organized manner. It allows you to define methods for different HTTP actions, handle content negotiation, and integrate authentication and permissions easily. This approach is highly customizable and is ideal for creating RESTful APIs.
