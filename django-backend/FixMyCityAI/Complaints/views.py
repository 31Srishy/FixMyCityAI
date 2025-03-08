from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint
from registration.models import User
from .serializers import *
from .azure_services import analyze_complaint, authenticate_client
from azure.storage.blob import BlobServiceClient
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
import uuid
import os
from django.db.models import Case, When, Value, IntegerField
from datetime import datetime
from django.shortcuts import get_object_or_404
from django.views import View


# Azure Storage Account credentials
AZURE_CONNECTION_STRING = os.getenv("AZURE_CONNECTION_STRING")
CONTAINER_NAME = "complaints-images"

@api_view(['GET'])
def hello_world(request):
    return HttpResponseRedirect("http://localhost:3000")


class ComplaintView(APIView):
    def post(self, request):
        serializer = ComplaintSerializer(data=request.data)
        if serializer.is_valid():
            latitude = request.data.get('latitude')
            longitude = request.data.get('longitude')
            
            # Check if a complaint with the same latitude and longitude already exists
            if Complaint.objects.filter(latitude=latitude, longitude=longitude).exists():
                return Response({"error": "Complaint already exists at this location."}, status=status.HTTP_409_CONFLICT)
            
            try:
                complaint = serializer.save()
                summary, classified_domain = analyze_complaint(complaint.description)

                complaint.summary = summary
                complaint.classified_domain = classified_domain
                # complaint.severity = sentiment
                complaint.save()

                return Response({"message": "Complaint submitted successfully!", "summary": summary}, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class ComplaintView(APIView):
#     def post(self, request):
#         print("Received Data:", request.data)  # Debugging request data
#         serializer = ComplaintSerializer(data=request.data)

#         if not serializer.is_valid():
#             print("Serializer Errors:", serializer.errors)  # Debugging validation errors
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             complaint = serializer.save()
#             print(f"Complaint Saved: ID {complaint.id}")  # Debugging output
#         except Exception as e:
#             print("Error while saving complaint:", str(e))
#             return Response({"error": "Failed to save complaint"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#         blob_url = None
#         if "image" in request.FILES:
#             image_file = request.FILES["image"]
#             print(f"Received file: {image_file.name}, size: {image_file.size}")
#             blob_url = self.upload_to_azure(image_file)
#             if blob_url:
#                 Complaint.objects.filter(id=complaint.id).update(image=blob_url)

#         summary, classified_domain = analyze_complaint(complaint.description)
#         Complaint.objects.filter(id=complaint.id).update(
#             summary=summary, classified_domain=classified_domain, vote=complaint.vote + 1
#         )

#         return Response(
#             {
#                 "message": "Complaint submitted successfully!",
#                 "summary": summary,
#                 "image_url": blob_url if blob_url else None,
#             },
#             status=status.HTTP_201_CREATED,
#         )

#     def upload_to_azure(self, image_file):
#         """Uploads an image to Azure Blob Storage and returns the blob URL."""
#         blob_service_client = BlobServiceClient.from_connection_string(AZURE_CONNECTION_STRING)
#         container_client = blob_service_client.get_container_client(CONTAINER_NAME)

#         blob_name = f"{uuid.uuid4()}_{image_file.name}"
#         blob_client = container_client.get_blob_client(blob_name)
#         blob_client.upload_blob(image_file, overwrite=True)

#         return f"https://{settings.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net/{CONTAINER_NAME}/{blob_name}"


class DomainView(APIView):
    def post(self, request):
        serializer = DomainSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Domain added successfully!", "domain": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_complaints(request):
    complaints = Complaint.objects.all()
    # print(complaints)
    
    serializer = ComplaintDisplaySerializer(complaints, many=True)
    # print(serializer.data)
    return Response(serializer.data)


def check_authentication():
    client = authenticate_client()
    try:
        response = client.detect_language(documents=["Hello, world!"])
        print("Authentication successful!")
        return True
    except Exception as e:
        print(f"Authentication failed: {e}")
        return False

@api_view(['GET'])
def get_domains(request):
    domains = Domain.objects.all()
    serializer = DomainSerializer(domains, many=True)
    return Response(serializer.data)

@csrf_exempt
def vote_complaint(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            complaint_id = data.get("id")

            if not complaint_id:
                return JsonResponse({"error": "Missing complaint ID"}, status=400)

            complaint = Complaint.objects.get(id=complaint_id)

            # Toggle votes logic
            if "action" in data and data["action"] == "toggle":
                if complaint.vote > 0:
                    complaint.vote -= 1  # Decrease vote if already liked
                else:
                    complaint.vote += 1  # Increase vote if not liked
            else:
                complaint.vote += 1  # Default behavior (increasing the vote)

            complaint.save()
            return JsonResponse({"message": "Vote updated", "votes": complaint.vote}, status=200)
        
        except Complaint.DoesNotExist:
            return JsonResponse({"error": "Complaint not found"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)

def get_all_complaints(request):
    complaints = Complaint.objects.all().values(
        'id', 'user__username', 'image', 'location', 'description', 'summary',
        'classified_domain__name', 'vote', 'assigned__username',
        'submitted_date', 'completed_date', 'status'
    )
    return JsonResponse(list(complaints), safe=False)


class ComplaintsByDomainView(View):
    def get(self, request):
        domain_id = request.GET.get("domain_id")  # Get domain ID from query params

        if not domain_id:
            return JsonResponse({"error": "Domain ID is required"}, status=400)

        # Retrieve domain object or return 404
        domain = get_object_or_404(Domain, id=domain_id)
        severity_ordering = Case(
            When(status="High", then=Value(3)),
            When(status="Medium", then=Value(2)),
            When(status="Low", then=Value(1)),
            default=Value(0),  # Default to 0 if status is missing
            output_field=IntegerField(),
        )
        # Get complaints and serialize the Cloudinary image URL
        # complaints = Complaint.objects.filter(classified_domain=domain).values(
        #     "id", "user__username", "location", "description","summary", "status", "submitted_date"
        # )
        complaints = Complaint.objects.filter(classified_domain=domain).annotate(
        severity_rank=severity_ordering
        ).values(
            "id", "user__username", "location", "description", "summary", "status", "submitted_date"
        ).order_by("-severity", "-submitted_date")

        # Convert queryset to list and add Cloudinary image URL manually
        complaints_list = list(complaints)
        for complaint in complaints_list:
            obj = Complaint.objects.get(id=complaint["id"])  # Retrieve full object
            complaint["image"] = obj.image.url if obj.image else None  # Get Cloudinary URL
        # print(complaints_list)    
        return JsonResponse(complaints_list, safe=False)

class ComplaintsByDomainAndAuthorityView(View):
    def get(self, request):
        domain_id = request.GET.get("domain_id")  # Get domain ID from query params
        authority_id = request.GET.get("authority_id") 
        if not domain_id:
            return JsonResponse({"error": "Domain ID is required"}, status=400)

        # Retrieve domain object or return 404
        domain = get_object_or_404(Domain, id=domain_id)
        authority = get_object_or_404(User, id=authority_id,role="authority")
        severity_ordering = Case(
            When(status="High", then=Value(3)),
            When(status="Medium", then=Value(2)),
            When(status="Low", then=Value(1)),
            default=Value(0),  # Default to 0 if status is missing
            output_field=IntegerField(),
        )
        # Get complaints and serialize the Cloudinary image URL
        # complaints = Complaint.objects.filter(classified_domain=domain).values(
        #     "id", "user__username", "location", "description","summary", "status", "submitted_date"
        # )
        complaints = Complaint.objects.filter(classified_domain=domain,assigned=authority).annotate(
        severity_rank=severity_ordering
        ).values(
            "id", "user__username", "location", "description", "summary", "status", "submitted_date"
        ).order_by("-severity", "-submitted_date")

        # Convert queryset to list and add Cloudinary image URL manually
        complaints_list = list(complaints)
        for complaint in complaints_list:
            obj = Complaint.objects.get(id=complaint["id"])  # Retrieve full object
            complaint["image"] = obj.image.url if obj.image else None  # Get Cloudinary URL
        # print(complaints_list)    
        return JsonResponse(complaints_list, safe=False)

class AssignAuthorityView(APIView):
    def post(self, request):
        print("Received Data:", request.data)
        complaint_id = request.data.get("complaint_id")
        authority_id = request.data.get("authority_id")

        if not complaint_id or not authority_id:
            return Response({"error": "Complaint ID and Authority ID are required"}, status=status.HTTP_400_BAD_REQUEST)

        # Fetch complaint
        complaint = get_object_or_404(Complaint, id=complaint_id)

        # Fetch authority user
        authority = get_object_or_404(User, id=authority_id, role="authority")
        print(authority)
        # Assign authority and update status
        complaint.assigned = authority
        complaint.status = "In Progress"
        complaint.save()

        return Response({
            "message": "Authority assigned successfully",
            "assigned_to": authority.username,
            "new_status": complaint.status
        }, status=status.HTTP_200_OK)



@api_view(["POST"])
def update_complaint(request):
    try:
        data = request.data
        complaint_id = data.get("complaint_id")
        new_status = data.get("status")

        # Fetch the complaint
        complaint = Complaint.objects.get(id=complaint_id)

        # Update status and set completed_date if resolved
        complaint.status = new_status
        if new_status == "Resolved":
            complaint.completed_date = datetime.now()
        else:
            complaint.completed_date = None  # Reset completed_date if not resolved

        complaint.save()

        return JsonResponse({
            "success": True,
            "new_status": complaint.status,
            "completed_date": complaint.completed_date,
        })
    except Complaint.DoesNotExist:
        return JsonResponse({"error": "Complaint not found"}, status=404)
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)