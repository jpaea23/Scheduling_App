from rest_framework import serializers
from .models import Job

#Creating Job Serializer for data transformation of API
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = ('jobId', 'client', 'created_date', 'job_date', 'address', 'status', 'description')
