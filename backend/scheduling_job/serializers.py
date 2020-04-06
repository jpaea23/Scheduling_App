from rest_framework import serializers
from .models import Job, Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

#Creating Job Serializer for data transformation of API
class JobSerializer(serializers.ModelSerializer):
    client = ClientSerializer()
    class Meta:
        model = Job
        fields = ('jobId', 'client', 'created_date', 'job_date', 'address', 'status', 'description')
        