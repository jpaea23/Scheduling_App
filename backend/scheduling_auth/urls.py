from django.urls import path
from .views import LoginView
from django.views.decorators.csrf import csrf_exempt

from knox.views import LogoutView

urlpatterns = [
    path('api/login/', csrf_exempt(LoginView.as_view())),
    path('api/logout/', LogoutView.as_view())

    #TODO Logout Url
]