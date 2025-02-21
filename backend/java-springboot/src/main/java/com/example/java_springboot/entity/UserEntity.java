package com.example.java_springboot.entity;

import com.azure.spring.data.cosmos.core.mapping.Container;
import com.azure.spring.data.cosmos.core.mapping.GeneratedValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Container(containerName = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    @GeneratedValue
    private String id = UUID.randomUUID().toString();
    private String name;
    private String email;
    private String phone;
    private String address;
    private String role; // USER or AUTHORITY
}