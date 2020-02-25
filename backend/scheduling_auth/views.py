from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

from django.views.decorators.csrf import csrf_exempt

# Create your views here.
@csrf_exempt
@api_view(('POST',))
def loginAuthenticate(request):
    username = request.data.get("username")
    password = request.data.get("password")
    if username is None or password is None:
        return Response({
            'Error': {
                'Code': '400',
                'Message': 'Please provide both username and password.'
        }},status=HTTP_400_BAD_REQUEST)
    user = authenticate(username=username, password=password)
    if not user:
        return Response({
            'Error':{
                'Code': '404',
                'Message': 'Username and/or Password not valid.'
        }},status=HTTP_404_NOT_FOUND)
    return Response({
        'Message': 'Valid User'},status=HTTP_200_OK)

