package com.example.java_springboot.Service;

import com.azure.ai.textanalytics.TextAnalyticsClient;
import com.azure.ai.textanalytics.TextAnalyticsClientBuilder;
import com.azure.ai.textanalytics.models.DocumentSentiment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AzureAIService {

    private final TextAnalyticsClient client;

    public AzureAIService(@Value("${azure.ai.endpoint}") String endpoint,
                          @Value("${azure.ai.api-key}") String apiKey) {
        this.client = new TextAnalyticsClientBuilder()
                .endpoint(endpoint)
                .credential(new com.azure.core.credential.AzureKeyCredential(apiKey))
                .buildClient();
    }

    // Categorize complaint based on keywords
    public String categorizeComplaint(String description) {
        Map<String, String> categoryKeywords = new HashMap<>();
        categoryKeywords.put("Water", "water leak, no water, pipeline burst");
        categoryKeywords.put("Roads", "pothole, road repair, traffic light issue");
        categoryKeywords.put("Power", "electricity, power outage, voltage issue");
        categoryKeywords.put("Sanitation", "garbage, drainage, sewage");

        for (Map.Entry<String, String> entry : categoryKeywords.entrySet()) {
            for (String keyword : entry.getValue().split(",")) {
                if (description.toLowerCase().contains(keyword.trim().toLowerCase())) {
                    return entry.getKey();
                }
            }
        }
        return "Other";
    }

    // Assign priority based on sentiment analysis
    public String assignPriority(String description) {
        DocumentSentiment sentiment = client.analyzeSentiment(description);
        switch (sentiment.getSentiment()) {
            case NEGATIVE:
                return "High";
            case NEUTRAL:
                return "Medium";
            case POSITIVE:
                return "Low";
            default:
                return "Medium";
        }
    }
}

