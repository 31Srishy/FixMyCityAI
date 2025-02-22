from django.db import models
from cloudinary.models import CloudinaryField


class Domain(models.Model):
    domain_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class Complaint(models.Model):
    full_name = models.CharField(max_length=100)  # Consider changing to a ForeignKey if referencing another model
    email = models.EmailField()
    phone_no = models.CharField(max_length=15)
    image = CloudinaryField('image', blank=True, null=True)  # Store image in Cloudinary
    location = models.CharField(max_length=255)
    description = models.TextField()
    summary = models.TextField(null=True, blank=True)
    classified_domain = models.ForeignKey(Domain, on_delete=models.SET_NULL, null=True, blank=True)
    vote = models.IntegerField(default=0)

    def __str__(self):
        return f"Complaint by {self.full_name}"

