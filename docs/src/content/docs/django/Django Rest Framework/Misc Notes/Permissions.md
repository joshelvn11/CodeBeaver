---
title: Permissions
---

### Authentication

**Authentication** is the process of verifying the identity of a user. DRF provides various authentication methods that can be easily integrated into your API.

#### Common Authentication Methods

1. **Basic Authentication**:

   - Uses a username and password for authentication.
   - Credentials are sent with each request.
   - Simple but less secure (credentials are base64-encoded, not encrypted).

2. **Token Authentication**:

   - Uses a token instead of a username and password.
   - The token is sent with each request in the header.
   - More secure and suitable for API-based authentication.

3. **Session Authentication**:

   - Uses Django's session framework.
   - Suitable for web applications with session management.

4. **JWT (JSON Web Token) Authentication**:
   - Uses tokens that are compact, URL-safe, and self-contained.
   - The token contains user information and is signed to ensure its authenticity.
   - Suitable for modern web and mobile applications.

### Setting Up Authentication

#### Basic Authentication

1. **Install DRF** (if not already installed):

```bash
pip install djangorestframework
```

2. **Configure DRF in `settings.py`**:

```python
INSTALLED_APPS = [
    ...,
    'rest_framework',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}
```

3. **Protect Your Views**:

```python
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {'message': 'Hello, authenticated user!'}
        return Response(content)
```

With these settings, any request to `ProtectedView` will require basic authentication.

### Permissions

**Permissions** determine whether a user is allowed to perform a certain action or access a certain resource. They are checked after authentication and authorization.

#### Common Permission Classes

1. **IsAuthenticated**: Only authenticated users can access the view.
2. **AllowAny**: Any user can access the view, whether authenticated or not.
3. **IsAdminUser**: Only admin users can access the view.
4. **IsAuthenticatedOrReadOnly**: Authenticated users can perform any request. Unauthenticated users can only perform read-only requests (GET, HEAD, OPTIONS).

### Setting Up Permissions

You can set permissions globally or per view.

#### Global Permissions

Set default permissions in `settings.py`:

```python
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}
```

#### Per-View Permissions

Override default permissions for specific views:

```python
# views.py
from rest_framework.permissions import IsAdminUser, AllowAny

class AdminOnlyView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        content = {'message': 'Hello, admin user!'}
        return Response(content)

class PublicView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        content = {'message': 'Hello, everyone!'}
        return Response(content)
```

### Custom Permissions

You can create custom permissions by subclassing `BasePermission`.

```python
# custom_permissions.py
from rest_framework.permissions import BasePermission

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.owner == request.user
```

Use the custom permission in a view:

```python
# views.py
from .custom_permissions import IsOwner

class UserProfileDetail(APIView):
    permission_classes = [IsAuthenticated, IsOwner]

    def get_object(self, pk):
        try:
            return UserProfile.objects.get(pk=pk)
        except UserProfile.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        profile = self.get_object(pk)
        self.check_object_permissions(request, profile)
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)
```

### Putting It All Together

Here's a complete example using token authentication and permissions:

1. **Install `djangorestframework` and `djangorestframework-authtoken`**:

```bash
pip install djangorestframework djangorestframework-authtoken
```

2. **Add the apps to `settings.py`**:

```python
INSTALLED_APPS = [
    ...,
    'rest_framework',
    'rest_framework.authtoken',
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
}
```

3. **Create a View to Obtain Auth Token**:

```python
# views.py
from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path

urlpatterns = [
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]
```

4. **Protect Your Views with Permissions**:

```python
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        content = {'message': 'Hello, authenticated user!'}
        return Response(content)
```

### Summary

- **Authentication**: Verifies the identity of a user. Common methods include Basic Authentication, Token Authentication, and JWT Authentication.
- **Permissions**: Determine what actions a user can perform. Common permissions include `IsAuthenticated`, `AllowAny`, `IsAdminUser`, and `IsAuthenticatedOrReadOnly`.
- **Custom Permissions**: Create custom permissions by subclassing `BasePermission`.

By integrating authentication and permissions, you can secure your API and control access to its resources, ensuring that only authorized users can perform certain actions.
