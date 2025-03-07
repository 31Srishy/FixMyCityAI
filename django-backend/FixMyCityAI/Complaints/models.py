from django.db import models
from registration.models import User
from django.core.validators import RegexValidator
from cloudinary.models import CloudinaryField
from datetime import datetime

# Define a validator for the phone number
phone_validator = RegexValidator(regex=r'^\d{10}$', message="Phone number must be 10 digits.")

# Create your models here.


class Domain(models.Model):
    domain_name = models.CharField(max_length=100, unique=True)
    ministry = models.CharField(max_length=100, unique=True, default="Default")
    phoneno = models.CharField(max_length=10, validators=[phone_validator], default='0000000000')
    email = models.EmailField(unique=True, default="help@gmail.com")
    STATUS_CHOICES = [
        ('low', 'low'),
        ('medium', 'medium'),
        ('high', 'high'),
    ]
    severity = models.CharField(max_length=20, choices=STATUS_CHOICES, default='low')  

    def __str__(self):
        return self.domain_name

class Authority(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    domain = models.ForeignKey(Domain, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.user.username} from {self.domain.domain_name}"

class Complaint(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)  
    image = CloudinaryField("Image", overwrite=True, resource_type="image", use_filename=True, unique_filename=True,
                            transformation={"quality": 'auto:low', 'width': 300, 'height': 300, 'crop': "scale"},
                            format="jpeg",null=True)
    location = models.CharField(max_length=255)
    pincode = models.CharField(max_length=255, default="0.0") 
    latitude = models.CharField(max_length=255, default="0.0")  # Default to 0.0
    longitude = models.CharField(max_length=255, default="0.0")  # Default to 0.0
    description = models.TextField()
    summary = models.TextField(null=True, blank=True)
    classified_domain = models.ForeignKey(Domain, on_delete=models.SET_NULL, null=True, blank=True)
    vote = models.IntegerField(default=0)
    assigned = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name="assigned_complaints", 
        limit_choices_to={'role': 'Authority'}, 
        default=2  # Replace with a valid default user ID
    )  
    submitted_date = models.DateTimeField(default=datetime.now)  
    completed_date = models.DateTimeField(null=True, blank=True)

    STATUS_CHOICES = [
        ('Pending', 'Pending'),
        ('In Progress', 'In Progress'),
        ('Resolved', 'Resolved'),
        ('Rejected', 'Rejected'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')  

    severity_score = models.IntegerField(default=0)  

    def __str__(self):
        return f"Complaint by {self.user.username} - {self.status}"





