package com.example.java_springboot.repository;

import com.azure.spring.data.cosmos.repository.CosmosRepository;
import com.example.java_springboot.entity.ComplaintEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ComplaintRepository extends CosmosRepository<ComplaintEntity, String> {
    List<ComplaintEntity> findByCategory(String category);
    List<ComplaintEntity> findByStatus(String status);
    List<ComplaintEntity> findByPriority(String priority);
    Optional<ComplaintEntity> findById(String id); // Provided by CosmosRepository
    List<ComplaintEntity> findAll(); // Provided by CosmosRepository
}