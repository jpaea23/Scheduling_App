from django.contrib import admin
from .models import Client,Job

class ClientAdmin(admin.ModelAdmin):
	list_display = ('clientId', 'name', 'phone')

admin.site.register(Client, ClientAdmin)

class JobAdmin(admin.ModelAdmin):
	list_display = ('jobId','client', 'created_date', 'job_date', 'address', 'status', 'description')

admin.site.register(Job, JobAdmin)