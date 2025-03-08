from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate,login
from rest_framework.permissions import IsAuthenticated
from .serializers import *
from Complaints.models import Authority,Domain
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

# class RegisterView(APIView):
#     def post(self, request):
#         print("Received Data:", request.data)
#         domain=request.data.get("domain")  # Debugging
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
#         print("Errors:", serializer.errors)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class RegisterView(APIView):
#     def post(self, request):
#         print("Received Data:", request.data)
#         serializer = RegisterSerializer(data=request.data)

#         if serializer.is_valid():
#             user = serializer.save()  # This will handle the domain and Authority creation
#             return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

#         print("Errors:", serializer.errors)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from Complaints.models import Domain, Authority

class RegisterView(APIView):
    def post(self, request):
        print("Received Data:", request.data)
        
        # Create a mutable copy of request.data
        mutable_data = request.data.copy()
        
        # Extract the domain
        domain = mutable_data.get("domain")  # Debugging
        
        # Remove the domain from the mutable data
        if 'domain' in mutable_data:
            del mutable_data['domain']
        
        # Pass the modified data to the serializer
        serializer = RegisterSerializer(data=mutable_data)
        
        if serializer.is_valid():
            user = serializer.save()

            try:
                # Fetch the Domain object using the ID
                domain_obj = Domain.objects.get(id=domain)
            except Domain.DoesNotExist:
                return Response({"message": "Domain does not exist"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Create an Authority object
            authority = Authority(user=user, domain=domain_obj)
            authority.save()
            
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        
        print("Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]

            try:
                user = User.objects.get(username=username)

                if user.check_password(password):  # Manually verify password
                    login(request, user)  # Log the user in
                    
                    user_data = UserSerializer(user).data

                    # If the user is an authority, fetch additional details
                    if user.role == "authority":
                        try:
                            authority = Authority.objects.get(user=user)
                            user_data["authority_id"] = authority.id
                            user_data["domain_id"] = authority.domain.id  # Assuming Authority has a ForeignKey to Domain
                        except Authority.DoesNotExist:
                            user_data["authority_id"] = None
                            user_data["domain_id"] = None
                    print(user_data)
                    refresh = RefreshToken.for_user(user)

                    return Response({
                        "refresh": str(refresh),
                        "access": str(refresh.access_token),
                        "user": user_data  # Send updated user data
                    })

                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

            except User.DoesNotExist:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

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