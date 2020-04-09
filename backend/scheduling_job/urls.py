from django.urls import path
from django.views.decorators.csrf import csrf_exempt
from .views import Jobs, JobDetail, job_filter_view, Clients

#TODO - Remomve csrf_exempt
urlpatterns = [
    path('job/', Jobs.as_view()),
    path('job/<int:pk>/', JobDetail.as_view()),
    path('api/filter-jobs/', csrf_exempt(job_filter_view)),
    path('client/', Clients.as_view()),
]
