from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential
from .models import Domain

AZURE_ENDPOINT = "https://fixmycity.cognitiveservices.azure.com/"
AZURE_KEY = "AvMfjSXeS2bjOga35zrwIzoR1c9fYaIr2MgqXmKP5CthPxCEGPiEJQQJ99BBACYeBjFXJ3w3AAAaACOGGvNK"

def authenticate_client():
    return TextAnalyticsClient(endpoint=AZURE_ENDPOINT, credential=AzureKeyCredential(AZURE_KEY))

# def analyze_complaint(description):
#     client = authenticate_client()

#     response = client.extract_key_phrases([description])
#     key_phrases = response[0].key_phrases if response and response[0].key_phrases else []
#     summary = " | ".join(key_phrases[:3]) 

#     existing_domains = Domain.objects.values_list('domain_name', flat=True)
#     classified_domain = None

#     for domain in existing_domains:
#         if domain.lower() in description.lower():
#             classified_domain = Domain.objects.get(name=domain)
#             break  # Stop at first match

#     return summary, classified_domain

def analyze_complaint(description):
    client = authenticate_client()

    # Perform Key Phrase Extraction
    key_phrase_response = client.extract_key_phrases([description])
    key_phrases = key_phrase_response[0].key_phrases if key_phrase_response and key_phrase_response[0].key_phrases else []
    summary = " | ".join(key_phrases[:3])  # Extract up to 3 key phrases

    # Perform Sentiment Analysis
    sentiment_response = client.analyze_sentiment([description])
    if sentiment_response and sentiment_response[0]:
        confidence_scores = sentiment_response[0].confidence_scores
        negative_score = confidence_scores.negative

        # Determine priority based on negative sentiment
        if negative_score >= 0.7:
            priority = "High"
        elif 0.4 <= negative_score < 0.7:
            priority = "Medium"
        else:
            priority = "Low"

        sentiment_data = {
            "sentiment": sentiment_response[0].sentiment,
            "priority": priority,
            "positive_score": confidence_scores.positive,
            "neutral_score": confidence_scores.neutral,
            "negative_score": negative_score
        }
    else:
        sentiment_data = {
            "sentiment": "unknown",
            "priority": "Low",
            "positive_score": 0.0,
            "neutral_score": 0.0,
            "negative_score": 0.0
        }

    # Classify the complaint into a domain
    existing_domains = Domain.objects.values_list('domain_name', flat=True)
    classified_domain = None

    for domain in existing_domains:
        if domain.lower() in description.lower():
            classified_domain = Domain.objects.get(domain_name=domain)
            break  # Stop at first match

    return summary, classified_domain, sentiment_data
