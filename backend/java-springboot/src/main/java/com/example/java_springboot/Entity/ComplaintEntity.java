package com.example.java_springboot.Entity;
package com.example.java_springboot.Entity;

import lombok.Data;
import org.hibernate.annotations.Type;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Data
public class ComplaintEntity {
    @Id
    @Type(type = "uuid-char")
    private UUID id = UUID.randomUUID();
    private String title;
    private String imageUrl;
    private String description;
    private String category;
    private String priority;
    private String status = "Pending";
}
