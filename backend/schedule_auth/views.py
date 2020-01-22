from django.contrib.auth import authenticate, login
from django.views.decorators.csrf import csrf_exempt

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

# Authentication View 

#1. Login
#@csrf_exempt
@api_view(["POST"])
@permission_classes((AllowAny,))
def user_login(requst):
    username = requst.data.get("username")
    password = requst.data.get("password")
    if username is None or password is None:
        return Response({'message': 'Please provide both username and password'})
    user = authenticate(username=username, password=password)
    if not user:
        return Response({'message': 'Invalid Credentials'})
    return Response({'message': 'Login successful', 'username': username})
