package com.example.java_springboot.controller;

import com.example.java_springboot.entity.ComplaintEntity;
import com.example.java_springboot.service.ComplaintService;
import com.example.java_springboot.exception.DuplicateComplaintException;
import com.example.java_springboot.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    /**
     * Lodge a new complaint.
     *
     * @param image       The image file associated with the complaint.
     * @param title       The title of the complaint.
     * @param description The description of the complaint.
     * @return The lodged complaint entity.
     * @throws IOException If file upload fails.
     */
    @PostMapping("/lodge")
    public ResponseEntity<ComplaintEntity> lodgeComplaint(
            @RequestParam("image") MultipartFile image,
            @RequestParam("title") String title,
            @RequestParam("description") String description) throws IOException {

        if (image.isEmpty() || title == null || description == null) {
            return ResponseEntity.badRequest().build();
        }

        try {
            ComplaintEntity complaint = new ComplaintEntity();
            complaint.setTitle(title);
            complaint.setDescription(description);

            ComplaintEntity lodgedComplaint = complaintService.lodgeComplaint(complaint, image);
            return ResponseEntity.status(HttpStatus.CREATED).body(lodgedComplaint);
        } catch (DuplicateComplaintException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get all complaints.
     *
     * @return A list of all complaints.
     */
    @GetMapping("/")
    public ResponseEntity<List<ComplaintEntity>> getAllComplaints() {
        List<ComplaintEntity> complaints = complaintService.getAllComplaints();
        return ResponseEntity.ok(complaints);
    }

    /**
     * Get a complaint by its ID.
     *
     * @param id The ID of the complaint.
     * @return The complaint entity.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ComplaintEntity> getComplaintById(@PathVariable UUID id) {
        try {
            ComplaintEntity complaint = complaintService.getComplaintById(id);
            return ResponseEntity.ok(complaint);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update an existing complaint.
     *
     * @param id              The ID of the complaint to update.
     * @param updatedComplaint The updated complaint entity.
     * @return The updated complaint entity.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ComplaintEntity> updateComplaint(
            @PathVariable UUID id,
            @RequestBody ComplaintEntity updatedComplaint) {

        try {
            ComplaintEntity updated = complaintService.updateComplaint(id, updatedComplaint);
            return ResponseEntity.ok(updated);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Delete a complaint by its ID.
     *
     * @param id The ID of the complaint to delete.
     * @return A response indicating success or failure.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteComplaint(@PathVariable UUID id) {
        try {
            complaintService.deleteComplaint(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}