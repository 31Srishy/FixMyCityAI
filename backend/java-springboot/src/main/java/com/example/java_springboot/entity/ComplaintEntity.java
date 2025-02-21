package com.example.java_springboot.entity;

import com.azure.spring.data.cosmos.core.mapping.Container;
import com.azure.spring.data.cosmos.core.mapping.GeneratedValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Container(containerName = "complaint")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ComplaintEntity {
    @GeneratedValue
    private String id = UUID.randomUUID().toString();
    private String title;
    private String imageUrl;
    private String description;
    private String category;
    private String priority;
    private String status = "Pending";
}