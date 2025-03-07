from rest_framework import serializers
from .models import *

class ComplaintSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)
    class Meta:
        model = Complaint
        fields = [ 'image', 'pincode', 'latitude', 'longitude','location', 'description']

class DomainSerializer(serializers.ModelSerializer):
    class Meta:
        model = Domain
        fields = '__all__' 

class ComplaintDisplaySerializer(serializers.ModelSerializer):
    classified_domain = serializers.CharField(source="classified_domain.domain_name", allow_null=True)

    class Meta:
        model = Complaint
        fields = '__all__'