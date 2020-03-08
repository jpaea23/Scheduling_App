from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from knox.views import LogoutView
from .views import LoginView

urlpatterns = [
    path('api/login/', csrf_exempt(LoginView.as_view())),
    path('api/logout/', LogoutView.as_view())
]
