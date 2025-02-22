from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from .models import Domain

AZURE_ENDPOINT = "https://fixmycity.cognitiveservices.azure.com/"
AZURE_KEY = "AvMfjSXeS2bjOga35zrwIzoR1c9fYaIr2MgqXmKP5CthPxCEGPiEJQQJ99BBACYeBjFXJ3w3AAAaACOGGvNK"

def authenticate_client():
    return TextAnalyticsClient(endpoint=AZURE_ENDPOINT, credential=AzureKeyCredential(AZURE_KEY))

def analyze_complaint(description):
    client = authenticate_client()

    response = client.extract_key_phrases([description])
    key_phrases = response[0].key_phrases if response and response[0].key_phrases else []
    summary = " | ".join(key_phrases[:3]) 

    existing_domains = Domain.objects.values_list('domain_name', flat=True)
    classified_domain = None

    for domain in existing_domains:
        if domain.lower() in description.lower():
            classified_domain = Domain.objects.get(name=domain)
            break  # Stop at first match

    return summary, classified_domain
