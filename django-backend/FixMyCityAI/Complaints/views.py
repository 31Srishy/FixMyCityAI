from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpResponseRedirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Complaint
from .serializers import ComplaintSerializer
from .azure_services import analyze_complaint

@api_view(['GET'])
def hello_world(request):
    return HttpResponseRedirect("http://localhost:3000")


class ComplaintView(APIView):
    def post(self, request):
        serializer = ComplaintSerializer(data=request.data)

        if serializer.is_valid():
            complaint = serializer.save()
            summary, classified_domain = analyze_complaint(complaint.description)

            # Update the complaint with AI analysis results
            complaint.summary = summary
            complaint.classified_domain = classified_domain
            complaint.save()

            return Response({"message": "Complaint submitted successfully!", "summary": summary}, status=status.HTTP_201_CREATED)
        print("Errors:", serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
