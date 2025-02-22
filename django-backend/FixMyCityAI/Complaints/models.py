from django.db import models

class Domain(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Complaint(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone_no = models.CharField(max_length=15)
    image = models.ImageField(upload_to='complaints/', null=True, blank=True)
    location = models.CharField(max_length=255)
    description = models.TextField()
    summary = models.TextField(null=True, blank=True)
    classified_domain = models.ForeignKey(Domain, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Complaint by {self.full_name}"
