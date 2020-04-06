from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_200_OK
)
#Knox Token generation
from knox.models import AuthToken
from .serializers import LoginSerializer

#add class loginAuth
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        #passing request data to LoginSerializer for processing
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        #No Exceptions caught in serializer, processing login.
        user = serializer.validated_data["user"]
        login(request, user)
        return Response({
            "token": AuthToken.objects.create(user)[1],
            "user": {
                "username": user.username,
                "email": user.email
            }
        }, status=HTTP_200_OK)
