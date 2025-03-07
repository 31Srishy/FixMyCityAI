from rest_framework import serializers
from .models import Complaint, Domain

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
    image = serializers.SerializerMethodField()  # Add this line

    class Meta:
        model = Complaint
        fields = '__all__'

    def get_image(self, obj):
        # Return the full Cloudinary URL for the image
        if obj.image:
            return obj.image.url  # This ensures the full URL is returned
        return None