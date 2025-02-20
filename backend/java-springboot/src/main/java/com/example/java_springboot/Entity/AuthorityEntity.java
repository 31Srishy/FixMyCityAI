package com.example.java_springboot.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthorityEntity {
    @Id
    private String id = UUID.randomUUID().toString();
    private String name;
    private String email;
    private String phone;
    private String domain;
}
