package com.example.java_springboot.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "complaint")
@Data
public class ComplaintEntity {
    @Id
    private String id = UUID.randomUUID().toString();
    private String title;
    private String imageUrl;
    private String description;
    private String category;
    private String priority;
    private String status = "Pending";
}