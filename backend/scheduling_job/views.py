from datetime import datetime, timedelta
import pytz
from rest_framework import permissions
from rest_framework.permissions import AllowAny
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Job
from .serializers import JobSerializer

class Jobs(generics.ListCreateAPIView):
    permission_classes = (permissions.AllowAny,)

    queryset = Job.objects.all()
    serializer_class = JobSerializer

class JobDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Job.objects.all()
    serializer_class = JobSerializer

@api_view(['POST',])
@permission_classes((AllowAny, ))
def job_filter_view(request):
    today_date = request.data.get("todayDate")
    #TODO - Response based on displayRange given
    #type = request.data.get("displayRange")
    data = {}
    if not today_date:
        data["message"] = "Both date and type are required"
        return Response(data=data)
    date = datetime.strptime(today_date, '%Y-%m-%d')
    start_date = date - timedelta(days=(date.weekday() + 1) % 7)
    end_date = start_date + timedelta(days=7)
    query_set = Job.objects.filter(job_date__gte=start_date, job_date__lte=end_date)
    aus_timezone = pytz.timezone('Australia/Sydney')
    start_date = aus_timezone.localize(start_date)
    end_date = aus_timezone.localize(end_date)
    #TODO Convert timeslot handler into a seperate function
    date_array = []
    job_count = 0
    if len(query_set) > 0:
        while start_date < end_date:
            end_of_day = start_date + timedelta(hours=15, minutes=59, seconds=59)
            start_of_day = start_date + timedelta(hours=7)
            first_job_date = datetime.strptime(query_set[job_count].job_date.strftime('%Y-%m-%dT%H:%M:%S'), '%Y-%m-%dT%H:%M:%S')
            first_job_date = aus_timezone.localize(first_job_date)
            date_data = {}
            date_jobs_array = []
            if end_of_day < first_job_date:
                while start_of_day < end_of_day:
                    date_jobs_array.append(None)
                    start_of_day = start_of_day + timedelta(hours=2)
                date_data['jobs'] = date_jobs_array
                date_data['date'] = start_date
            #handle timeslot found
            elif end_of_day > first_job_date:
                while start_of_day < end_of_day:
                    #somewhere in this array has first job
                    if start_of_day == first_job_date:
                        serialise = JobSerializer(query_set[job_count])
                        date_jobs_array.append(serialise.data)
                        start_of_day = start_of_day + timedelta(hours=2)
                        if job_count < len(query_set)-1:
                            job_count += 1
                            first_job_date = datetime.strptime(query_set[job_count].job_date.strftime('%Y-%m-%dT%H:%M:%S'), '%Y-%m-%dT%H:%M:%S')
                            first_job_date = aus_timezone.localize(first_job_date)
                    else:
                        date_jobs_array.append(None)
                        start_of_day = start_of_day + timedelta(hours=2)
                date_data['jobs'] = date_jobs_array
                date_data['date'] = start_date
            date_array.append(date_data)
            start_date = start_date + timedelta(days=1)
    else:
        while start_date < end_date:
            end_of_day = start_date + timedelta(hours=16) # end 4pm
            start_of_day = start_date + timedelta(hours=7) #start 7am
            date_data = {}
            date_jobs_array = []
            while start_of_day < end_of_day:
                date_jobs_array.append(None)
                start_of_day = start_of_day + timedelta(hours=2)
            date_data['jobs'] = date_jobs_array
            date_data['date'] = start_date
            date_array.append(date_data)
            start_date = start_date + timedelta(days=1)
    return Response(data=date_array)
