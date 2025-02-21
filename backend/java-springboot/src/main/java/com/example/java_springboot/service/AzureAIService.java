package com.example.java_springboot.service;

import com.azure.ai.textanalytics.TextAnalyticsClient;
import com.azure.ai.textanalytics.TextAnalyticsClientBuilder;
import com.azure.ai.textanalytics.models.DocumentSentiment;
import com.azure.core.credential.AzureKeyCredential;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AzureAIService {

    private final TextAnalyticsClient textAnalyticsClient;
    private final Map<String, String> categoryKeywords;

    public AzureAIService(
            @Value("${azure.ai.endpoint}") String endpoint,
            @Value("${azure.ai.api-key}") String apiKey) {

        // Initialize the Text Analytics client
        this.textAnalyticsClient = new TextAnalyticsClientBuilder()
                .endpoint(endpoint)
                .credential(new AzureKeyCredential(apiKey))
                .buildClient();

        // Initialize category keywords
        this.categoryKeywords = new HashMap<>();
        categoryKeywords.put("Water", "water leak, no water, pipeline burst");
        categoryKeywords.put("Roads", "pothole, road repair, traffic light issue");
        categoryKeywords.put("Power", "electricity, power outage, voltage issue");
        categoryKeywords.put("Sanitation", "garbage, drainage, sewage");
    }

    /**
     * Categorize a complaint based on its description.
     *
     * @param description The complaint description.
     * @return The category of the complaint.
     */
    public String categorizeComplaint(String description) {
        if (description == null || description.isEmpty()) {
            throw new IllegalArgumentException("Description must not be null or empty.");
        }

        // Check for keywords in the description
        for (Map.Entry<String, String> entry : categoryKeywords.entrySet()) {
            for (String keyword : entry.getValue().split(",")) {
                if (description.toLowerCase().contains(keyword.trim().toLowerCase())) {
                    return entry.getKey();
                }
            }
        }

        // Default category if no keywords are found
        return "Other";
    }

    /**
     * Assign priority to a complaint based on sentiment analysis.
     *
     * @param description The complaint description.
     * @return The priority of the complaint (High, Medium, Low).
     */
    public String assignPriority(String description) {
        if (description == null || description.isEmpty()) {
            throw new IllegalArgumentException("Description must not be null or empty.");
        }

        try {
            // Analyze sentiment using Azure Text Analytics
            DocumentSentiment sentiment = textAnalyticsClient.analyzeSentiment(description);

            // Assign priority based on sentiment
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
        } catch (Exception e) {
            // Log the error and return a default priority
            System.err.println("Error analyzing sentiment: " + e.getMessage());
            return "Medium";
        }
    }
}