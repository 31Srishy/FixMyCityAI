from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate,login
from rest_framework.permissions import IsAuthenticated
from .serializers import *

from django.contrib.auth.hashers import check_password

User = get_user_model()

# print(User._meta.get_fields())
# print(User.objects.filter(username="john_doe").exists())
# user = User.objects.get(username="john_doe")
# print(user.check_password("password123"))
# email="john@example.com"
# password="password123"

# user = authenticate(email=email, password=password)
# print(f"Authenticating: username={email}, password={password}")

# if user:
#     print("Authentication successful")
# else:
#     print("Authentication failed!")

class RegisterView(APIView):
    def post(self, request):
        print("Received Data:", request.data)  # Debugging
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        print("Errors:", serializer.errors)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    def post(self, request):
        # print("Received data:", request.data)  # Debugging print
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            try:
                user = User.objects.get(username=username)

                if user.check_password(password):  # Manually verify password
                    login(request, user)  # Log the user in

                    refresh = RefreshToken.for_user(user)
                    return Response({
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                        "role": user.role
                    })

                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            except User.DoesNotExist:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        print("Serializer errors:", serializer.errors)  # Debugging print
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            # Get the refresh token from request data
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)

            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()

            # Log out the user
            logout(request)

            return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
        
        except Exception as e:
            return Response({"error": "Invalid token or already logged out"}, status=status.HTTP_400_BAD_REQUEST)