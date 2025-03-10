from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

# class RegisterSerializer(serializers.ModelSerializer):
#     role = serializers.ChoiceField(choices=[('citizen', 'Citizen'), ('admin', 'Admin'), ('authority', 'Authority')], default='citizen')

#     class Meta:
#         model = User
#         fields = ["username", "email", "password", "role", "domain", "profile_pic", "address", "pincode", "phoneno"]
#         extra_kwargs = {"password": {"write_only": True}}

#     def create(self, validated_data):
#         domain = validated_data.pop("domain", None)
#         user = User.objects.create_user(**validated_data)
#         return user

class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=[('citizen', 'Citizen'), ('admin', 'Admin'), ('authority', 'Authority')], default='citizen')
    domain = serializers.IntegerField(write_only=True, required=False)  # Add domain field explicitly

    class Meta:
        model = User
        fields = ["username", "email", "password", "role","domain", "profile_pic", "address", "pincode", "phoneno"]  # Remove domain from fields
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name", "role","pincode"]