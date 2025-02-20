package com.example.java_springboot.Entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document(collection = "user")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEntity {
    @Id
    private String id = UUID.randomUUID().toString();
    private String name;
    private String email;
    private String phone;
    private String address;
    private String role; // USER or AUTHORITY
}
