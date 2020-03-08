from rest_framework import permissions
from rest_framework import generics
from .models import Job
from .serializers import JobSerializer


class Jobs(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = Job.objects.all().order_by('job_date')
    serializer_class = JobSerializer

class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer