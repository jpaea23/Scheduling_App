from rest_framework import serializers
from .models import Job, Client

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

#Creating Job Serializer for data transformation of API
class JobSerializer(serializers.ModelSerializer):
    client = ClientSerializer(read_only=True)
    clientId = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all(), source='client', write_only=True)
    class Meta:
        model = Job
        fields = ('jobId', 'clientId', 'client', 'created_date', 'job_date', 'address', 'status', 'description')
