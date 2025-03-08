from django.urls import path
from .views import *

urlpatterns = [
    path('', hello_world),
    path('submit-complaint/', ComplaintView.as_view(), name='submit-complaint'),
    path('add-domain/', DomainView.as_view(), name='add-domain'),
    path('display-complaints/', get_complaints, name='get_complaints'),
    path('get_domains/', get_domains, name='get_domains'),
    path('add-vote/', vote_complaint, name='vote-complaint'),
    path('complaints-by-domain/', ComplaintsByDomainView.as_view(), name='complaints-by-domain'),
    path("assignauthority/", AssignAuthorityView.as_view(), name="assign-authority"),
    path('complaints-by-domain-authority/', ComplaintsByDomainAndAuthorityView.as_view(), name='complaints-by-domain-authority'),
    path('update-complaint/', update_complaint, name='update-complaint'),
]


