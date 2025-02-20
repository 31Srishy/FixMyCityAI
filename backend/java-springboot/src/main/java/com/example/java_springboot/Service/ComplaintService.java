package com.example.java_springboot.service;

import com.example.java_springboot.Entity.ComplaintEntity;
import com.example.java_springboot.Repository.ComplaintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ComplaintService {
    @Autowired
    private ComplaintRepository complaintRepository;
    @Autowired
    private AzureAIService azureAIService;

    public ComplaintEntity lodgeComplaint(ComplaintEntity complaint) {
        String filePath = "src/main/resources/uploads/" + complaint.getImage().getOriginalFilename();
        try {
            Files.copy(complaint.getImage().getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
            complaint.setImagePath(filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        // Check for duplicate complaint
        Optional<ComplaintEntity> existingComplaint = complaintRepository.findAll().stream()
                .filter(c -> c.getTitle().equalsIgnoreCase(complaint.getTitle()) &&
                        c.getCategory().equalsIgnoreCase(azureAIService.categorizeComplaint(complaint.getDescription())))
                .findFirst();

        if (existingComplaint.isPresent()) {
            throw new DuplicateComplaintException("Similar complaint exists! Please upvote: " + existingComplaint.get().getId());
        }
        // Send complaint data to Azure AI for categorization & prioritization
        complaint.setCategory(azureAIService.categorizeComplaint(complaint.getDescription()));
        complaint.setPriority(azureAIService.assignPriority(complaint.getDescription()));
        complaint.setStatus("Open");
        azureTableStorageService.saveComplaint(savedComplaint.getId(), savedComplaint.getTitle(), savedComplaint.getCategory(), savedComplaint.getPriority());
        return complaintRepository.save(complaint);
    }

    public List<ComplaintEntity> getAllComplaints() {
        return (List<ComplaintEntity>) complaintRepository.findAll();
    }

    public Optional<ComplaintEntity> getComplaintById(String id) {
        return complaintRepository.findById(id);
    }

    public ComplaintEntity updateComplaint(String id, ComplaintEntity updatedComplaint) {
        if (complaintRepository.existsById(id)) {
            updatedComplaint.setId(id);
            return complaintRepository.save(updatedComplaint);
        }
        return null;
    }

    public void deleteComplaint(String id) {
        complaintRepository.deleteById(id);
    }
}
