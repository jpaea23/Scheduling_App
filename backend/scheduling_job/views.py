from datetime import datetime, timedelta
import pytz
import pandas as pd
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
    data = {}
    if not today_date:
        data["message"] = "Both date and type are required"
        return Response(data=data)
    date = datetime.strptime(today_date, '%Y-%m-%d')
    utc_date = timezone_format('UTC', date)
    start_date = utc_date - timedelta(days=(date.weekday() + 1) % 7)
    end_date = start_date + timedelta(days=7)
    query_set = Job.objects.filter(job_date__gte=start_date, job_date__lte=end_date)

    #localise date to Australia time
    aus_date = timezone_format('Australia/Sydney', date)
    start_date = aus_date - timedelta(days=(date.weekday() + 1) % 7)
    end_date = start_date + timedelta(days=7)

    # work day 7am to 4pm (16), 2hrs per job (with 1hr lunch break from 11-12? either way below code handles that)
    date_range = pd.date_range(str(start_date), str(end_date - timedelta(days=1)))
    job_dict = {str(date.date()) : {} for date in date_range}
    for job in query_set:
        aus_dt = datetime.strptime(job.job_date.strftime('%Y-%m-%dT%H:%M:%S'), '%Y-%m-%dT%H:%M:%S')
        aus_dt = timezone_format('Australia/Sydney', aus_dt)
        job_index = aus_dt.hour
        job_dict[str(aus_dt.date())][job_index] = JobSerializer(job).data
    return Response(data=job_dict)

def timezone_format(time_zone, date):
    this_timezone = pytz.timezone(time_zone)
    time_zone_date = this_timezone.localize(date)
    return time_zone_date
