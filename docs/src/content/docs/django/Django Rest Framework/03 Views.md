---
title: Views
---

Certainly! Let's break down the concept of function-based views (FBV) and class-based views (CBV) in Django Rest Framework (DRF) in a beginner-friendly way.

### Function-Based Views (FBV)

**Function-based views** are simple functions that take a web request and return a web response. They are straightforward and easy to understand, especially for those who are new to Django and DRF.

#### Example of a Function-Based View

Let's create a simple API to handle `Item` objects.

1. **Define a Model**

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

3. **Create Function-Based Views**

```python
# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Item
from .serializers import ItemSerializer

@api_view(['GET', 'POST'])
def item_list(request):
    if request.method == 'GET':
        items = Item.objects.all()
        serializer = ItemSerializer(items, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def item_detail(request, pk):
    try:
        item = Item.objects.get(pk=pk)
    except Item.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ItemSerializer(item)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
```

4. **Configure URLs**

```python
# urls.py
from django.urls import path
from .views import item_list, item_detail

urlpatterns = [
    path('items/', item_list, name='item-list'),
    path('items/<int:pk>/', item_detail, name='item-detail'),
]
```

### Class-Based Views (CBV)

**Class-based views** are more structured and reusable. They use Python classes to represent views, making it easier to manage complex views by organizing them into reusable components.

#### Example of a Class-Based View

1. **Define the Same Model and Serializer** (as above).

2. **Create Class-Based Views**

```python
# views.py
from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer

class ItemList(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
```

3. **Configure URLs**

```python
# urls.py
from django.urls import path
from .views import ItemList, ItemDetail

urlpatterns = [
    path('items/', ItemList.as_view(), name='item-list'),
    path('items/<int:pk>/', ItemDetail.as_view(), name='item-detail'),
]
```

### Comparison

- **Function-Based Views (FBV)**:

  - Simple to understand and implement.
  - Good for small projects or simple views.
  - All logic for different HTTP methods (GET, POST, PUT, DELETE) is in one function, which can become unwieldy as complexity increases.

- **Class-Based Views (CBV)**:
  - More structured and organized.
  - Encourages reuse and inheritance.
  - Separate methods for different HTTP actions (`get`, `post`, `put`, `delete`), which makes the code cleaner and easier to maintain.

### Which One to Use?

- **Use FBV** if you are new to Django and DRF, or if your API endpoints are simple and straightforward.
- **Use CBV** if you have a more complex project, need to reuse code across multiple views, or want to take advantage of Django's built-in generic views that handle common patterns.

### Summary

- **FBV** are simple and straightforward but can become cumbersome with complex logic.
- **CBV** are more powerful and organized, allowing for better code reuse and cleaner organization of view logic.

By understanding both FBV and CBV, you can choose the right approach for your project and make your code more maintainable and scalable.
