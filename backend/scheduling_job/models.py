from django.db import models

class Client(models.Model):
    clientId = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    phone = models.CharField(db_index=True, max_length=10)

    def __str__(self):
        return self.phone



class Job(models.Model):
    jobId = models.AutoField(primary_key=True)
    client = models.ForeignKey('Client', on_delete=models.CASCADE)
    created_date = models.DateField(db_index=True, auto_now_add=True)
    job_date = models.DateTimeField(db_index=True)
    address = models.CharField(max_length=100)
    status = models.BooleanField(default=False)
    description = models.TextField(null=True,blank=True)

    def __str__(self):
        return '%s %s %s' % (self.job_date, self.description, self.status)
