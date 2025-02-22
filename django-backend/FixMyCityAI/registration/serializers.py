from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.ChoiceField(choices=[('Citizen', 'Citizen'), ('Admin', 'Admin'), ('Authority', 'Authority')], default='User')

    class Meta:
        model = User
        fields = ["username", "email", "password", "role"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
