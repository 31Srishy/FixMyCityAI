from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint
from .serializers import *
from .azure_services import analyze_complaint
from azure.storage.blob import BlobServiceClient
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
import json
from django.http import JsonResponse
import uuid
import os


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
            try:
                complaint = serializer.save()
                summary, classified_domain = analyze_complaint(complaint.description)

                complaint.summary = summary
                complaint.classified_domain = classified_domain
                complaint.save()

                return Response({"message": "Complaint submitted successfully!", "summary": summary}, status=status.HTTP_201_CREATED)
            except ValueError as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        print("Errors:", serializer.errors)
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
                
                complaint.vote -= 1
            
            else:
                complaint.votes += 1  # Default behavior

            complaint.save()
            return JsonResponse({"message": "Vote updated", "votes": complaint.vote}, status=200)
        
        except Complaint.DoesNotExist:
            return JsonResponse({"error": "Complaint not found"}, status=404)
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON format"}, status=400)

    return JsonResponse({"error": "Invalid request method"}, status=405)