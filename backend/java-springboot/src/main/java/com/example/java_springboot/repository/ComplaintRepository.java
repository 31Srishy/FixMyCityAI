package com.example.java_springboot.repository;

import com.azure.spring.data.cosmos.repository.CosmosRepository;
import com.example.java_springboot.entity.ComplaintEntity;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ComplaintRepository extends CosmosRepository<ComplaintEntity, String> {
    List<ComplaintEntity> findByCategory(String category);
    List<ComplaintEntity> findByStatus(String status);
    List<ComplaintEntity> findByPriority(String priority);
}