from django.urls import path
from .views import *

urlpatterns = [
    path('', hello_world),
    path('submit-complaint/', ComplaintView.as_view(), name='submit-complaint'),
]

