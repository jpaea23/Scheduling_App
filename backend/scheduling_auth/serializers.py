from rest_framework import serializers, exceptions
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

#Creating Job Serializer for data transformation of API
class LoginSerializer(serializers.Serializer):
    #Pass Data Manually since no model is being used
    username = serializers.CharField()
    password = serializers.CharField()

    #create function to perform validation on data, Will be called everytime class is initialized
    def validate(self, data):
        #Instantiate data variables(username and password)
        serialUsername = data.get("username", "")
        serialPassword = data.get("password", "")

        #Validate Data is persent
        if not serialUsername.strip() or not serialPassword.strip():
            msg = "Please provide both username and password."
            raise exceptions.ValidationError(msg)
        
        #Validate password and username correct
        user = authenticate(username=serialUsername, password=serialPassword)
        if user:
            if user.is_active:
                data["user"] = user
            else:
                msg = "User is inactive"
                raise exceptions.ValidationError(msg)
        else:
            msg = "Username and/or Password not valid"
            raise exceptions.ValidationError(msg)   
        
        return data