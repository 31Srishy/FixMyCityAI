from django.urls import path
from .views import *

urlpatterns = [
    path('', hello_world),
    path('submit-complaint/', ComplaintView.as_view(), name='submit-complaint'),
    path('add-domain/', DomainView.as_view(), name='add-domain'),
    path('display-complaints/', get_complaints, name='get_complaints'),
    path('add-vote/', vote_complaint, name='vote-complaint'),
]

