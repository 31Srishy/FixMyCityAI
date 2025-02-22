from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('citizen', 'Citizen'),
        ('authority', 'Authority'),
        ('admin', 'Admin'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='citizen')

    def __str__(self):
        return f"{self.username} ({self.role})"

