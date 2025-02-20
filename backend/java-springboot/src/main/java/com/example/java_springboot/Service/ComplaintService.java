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

    public ComplaintEntity lodgeComplaint(ComplaintEntity complaint) {
        String filePath = "src/main/resources/uploads/" + complaint.getImage().getOriginalFilename();
        try {
            Files.copy(complaint.getImage().getInputStream(), Paths.get(filePath), StandardCopyOption.REPLACE_EXISTING);
            complaint.setImagePath(filePath);
        } catch (IOException e) {
            e.printStackTrace();
        }
        // Send complaint data to Azure AI for categorization & prioritization
        complaint.setCategory(AzureAIService.categorizeComplaint(complaint.getDescription()));
        complaint.setPriority(AzureAIService.assignPriority(complaint.getDescription()));
        complaint.setStatus("Open");
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
