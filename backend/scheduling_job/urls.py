from django.urls import path
from .views import Jobs, JobDetail

urlpatterns = [
    path('job/', Jobs.as_view()),
     path('job/<int:pk>/', JobDetail.as_view()),
]