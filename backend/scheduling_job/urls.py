from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from .views import Jobs, JobDetail, job_filter_view

urlpatterns = [
    path('job/', Jobs.as_view()),
    path('job/<int:pk>/', JobDetail.as_view()),
    path('jobs', csrf_exempt(job_filter_view)),
]
