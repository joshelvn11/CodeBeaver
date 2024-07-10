---
title: Setting Up DRF
---

## 1. Install Django and Django Rest Framework

First, ensure you have Python installed on your system. You can check your Python version using:

```bash
python --version
```

### 1.1 Installing Django

If you don't have Django installed, you can install it using pip:

```bash
pip install django
```

### 1.2 Installing Django Rest Framework

Next, install Django Rest Framework:

```bash
pip install djangorestframework
```

## 2. Create a New Django Project

Create a new Django project by running:

```bash
django-admin startproject myproject
```

Navigate to your project directory:

```bash
cd myproject
```

## 3. Create a New Django App

Create a new app within your project. For example, to create an app named `api`:

```bash
python manage.py startapp api
```

## 4. Add DRF to Installed Apps

Open your `settings.py` file (located in your project directory) and add `'rest_framework'` to the `INSTALLED_APPS` list:

```python
INSTALLED_APPS = [
    ...
    'rest_framework',
    'api',  # Add your newly created app
]
```

## 5. Configure Basic Settings

You can add basic DRF settings in your `settings.py` file. For instance:

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
```

## 6. Create a Simple API

### 6.1 Models

Define a simple model in your `api/models.py`:

```python
from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
```

Run migrations to create the database tables:

```bash
python manage.py makemigrations
python manage.py migrate
```

### 6.2 Serializers

Create a serializer for your model in `api/serializers.py`:

```python
from rest_framework import serializers
from .models import Item

class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
```

### 6.3 Views

Create views in `api/views.py`:

```python
from rest_framework import generics
from .models import Item
from .serializers import ItemSerializer

class ItemListCreate(generics.ListCreateAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

class ItemDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
```

### 6.4 URLs

Define URLs for your API in `api/urls.py`:

```python
from django.urls import path
from .views import ItemListCreate, ItemDetail

urlpatterns = [
    path('items/', ItemListCreate.as_view(), name='item-list-create'),
    path('items/<int:pk>/', ItemDetail.as_view(), name='item-detail'),
]
```

Include these URLs in your project's `urls.py`:

```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
```

## 7. Run the Server

Run the development server to test your API:

```bash
python manage.py runserver
```

You can now navigate to `http://127.0.0.1:8000/api/items/` to see your API in action.

## 8. Test Your API

You can test your API using tools like Postman or curl. For example, using curl:

```bash
curl -X GET http://127.0.0.1:8000/api/items/
```

This setup gives you a basic REST API with Django Rest Framework. From here, you can expand your API by adding more models, serializers, views, and customizations as needed.
