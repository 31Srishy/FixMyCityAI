package com.example.java_springboot.service;

import com.example.java_springboot.entity.ComplaintEntity;
import com.example.java_springboot.repository.ComplaintRepository;
import com.example.java_springboot.exception.DuplicateComplaintException;
import com.example.java_springboot.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.UUID;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Autowired
    private AzureAIService azureAIService;

    @Autowired
    private AzureTableStorageService azureTableStorageService;

    // Directory to store uploaded images
    private static final String UPLOAD_DIR = "src/main/resources/uploads/";

    /**
     * Lodge a new complaint.
     *
     * @param complaint The complaint entity to be lodged.
     * @param image     The image file associated with the complaint.
     * @return The saved complaint entity.
     * @throws IOException If file upload fails.
     */
    public ComplaintEntity lodgeComplaint(ComplaintEntity complaint, MultipartFile image) throws IOException {
        // Validate input
        if (complaint == null || image == null || image.isEmpty()) {
            throw new IllegalArgumentException("Complaint and image must not be null or empty.");
        }

        // Save the image to the upload directory
        String filePath = UPLOAD_DIR + image.getOriginalFilename();
        Files.copy(image.getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
        complaint.setImageUrl(filePath);

        // Check for duplicate complaints
        if (isDuplicateComplaint(complaint)) {
            throw new DuplicateComplaintException("A similar complaint already exists.");
        }

        // Categorize and prioritize the complaint using Azure AI
        complaint.setCategory(azureAIService.categorizeComplaint(complaint.getDescription()));
        complaint.setPriority(azureAIService.assignPriority(complaint.getDescription()));
        complaint.setStatus("Open");

        // Save the complaint to the database
        ComplaintEntity savedComplaint = complaintRepository.save(complaint);

        // Save the complaint to Azure Table Storage
        azureTableStorageService.saveComplaint(
                savedComplaint.getId().toString(),
                savedComplaint.getTitle(),
                savedComplaint.getCategory(),
                savedComplaint.getPriority()
        );

        return savedComplaint;
    }

    /**
     * Check if a similar complaint already exists.
     *
     * @param complaint The complaint to check.
     * @return True if a duplicate exists, false otherwise.
     */
    private boolean isDuplicateComplaint(ComplaintEntity complaint) {
        return complaintRepository.findAll().stream()
                .anyMatch(c -> c.getTitle().equalsIgnoreCase(complaint.getTitle()) &&
                        c.getCategory().equalsIgnoreCase(complaint.getCategory()));
    }

    /**
     * Get all complaints.
     *
     * @return A list of all complaints.
     */
    public List<ComplaintEntity> getAllComplaints() {
        return complaintRepository.findAll();
    }

    /**
     * Get a complaint by its ID.
     *
     * @param id The ID of the complaint.
     * @return The complaint entity.
     * @throws ResourceNotFoundException If the complaint is not found.
     */
    public ComplaintEntity getComplaintById(UUID id) {
        return complaintRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Complaint not found with ID: " + id));
    }

    /**
     * Update an existing complaint.
     *
     * @param id              The ID of the complaint to update.
     * @param updatedComplaint The updated complaint entity.
     * @return The updated complaint.
     * @throws ResourceNotFoundException If the complaint is not found.
     */
    public ComplaintEntity updateComplaint(UUID id, ComplaintEntity updatedComplaint) {
        if (!complaintRepository.existsById(id)) {
            throw new ResourceNotFoundException("Complaint not found with ID: " + id);
        }
        updatedComplaint.setId(id);
        return complaintRepository.save(updatedComplaint);
    }

    /**
     * Delete a complaint by its ID.
     *
     * @param id The ID of the complaint to delete.
     * @throws ResourceNotFoundException If the complaint is not found.
     */
    public void deleteComplaint(UUID id) {
        if (!complaintRepository.existsById(id)) {
            throw new ResourceNotFoundException("Complaint not found with ID: " + id);
        }
        complaintRepository.deleteById(id);
    }
}