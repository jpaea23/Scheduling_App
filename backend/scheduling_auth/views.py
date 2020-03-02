from django.contrib.auth import login

from .serializers import LoginSerializer

from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

#Knox Token generation
from knox.models import AuthToken

#add class loginAuth
class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self,request):
        #passing request data to LoginSerializer for processing
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        #No Exceptions caught in serializer, processing login.
        user = serializer.validated_data["user"]
        login(request, user)
        #Todo Add token generation on successful login before returning a response
        return Response({
            "token": AuthToken.objects.create(user)[1], 
            "user": {
                "username": user.username,
                "email": user.email
            }
        }, status=HTTP_200_OK)


#Todo Data validation - Sec Vuln ? XXS, CSRF

#Extra Todo implement token regenration based on token creation date
    #Using knox to accomplish this. - 3rd party

