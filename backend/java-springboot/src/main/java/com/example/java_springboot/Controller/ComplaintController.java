package com.example.java_springboot.controller;

import com.example.java_springboot.Entity.ComplaintEntity;
import com.example.java_springboot.Service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    @PostMapping("/lodge")
    public ComplaintEntity lodgeComplaint(
            @RequestParam("image") MultipartFile image,
            @RequestParam("title") String title,
            @RequestParam("description") String description) throws IOException {

        ComplaintEntity complaint = new ComplaintEntity();
        complaint.setTitle(title);
        complaint.setDescription(description);

        return complaintService.lodgeComplaint(complaint);
    }

    @GetMapping("/")
    public List<ComplaintEntity> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ComplaintEntity> getComplaintById(@PathVariable String id) {
        return complaintService.getComplaintById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<ComplaintEntity> updateComplaint(@PathVariable String id, @RequestBody ComplaintEntity updatedComplaint) {
        ComplaintEntity updated = complaintService.updateComplaint(id, updatedComplaint);
        return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComplaint(@PathVariable String id) {
        complaintService.deleteComplaint(id);
        return ResponseEntity.noContent().build();
    }
}
