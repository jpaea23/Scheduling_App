from django.contrib.auth import authenticate
from rest_framework import serializers, exceptions

#Creating Job Serializer for data transformation of API
class LoginSerializer(serializers.Serializer):
    #Pass Data Manually since no model is being used
    username = serializers.CharField()
    password = serializers.CharField()

    #create function to perform validation on data, Will be called everytime class is initialized
    def validate(self, data):
        #Instantiate data variables(username and password)
        serial_username = data.get("username", "")
        serial_password = data.get("password", "")

        #Validate Data is persent
        if not serial_username.strip() or not serial_password.strip():
            msg = "Please provide both username and password."
            raise exceptions.ValidationError(msg)
        user = authenticate(username=serial_username, password=serial_password)
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
        