from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator

from cloudinary.models import CloudinaryField

# Define a validator for the phone number
phone_validator = RegexValidator(regex=r'^\d{10}$', message="Phone number must be 10 digits.")

class User(AbstractUser):
    ROLE_CHOICES = (
        ('citizen', 'Citizen'),
        ('authority', 'Authority'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='patient')
    profile_pic = CloudinaryField("Image", overwrite=True, resource_type="image", use_filename=True, unique_filename=True,
    transformation={"quality": 'auto:low', 'width':300, 'height': 300, 'crop': "scale",},
    format="jpeg", null=True)
    address = models.CharField(max_length=40, default="India")
    pincode=models.CharField(max_length=40, default="570000")

    phoneno = models.CharField(max_length=10, validators=[phone_validator], default='0000000000')

    def __str__(self):
        return f"{self.username} ({self.role})"

