package com.example.java_springboot.repository;

import com.azure.cosmos.models.PartitionKey;
import com.azure.spring.data.cosmos.repository.CosmosRepository;
import com.example.java_springboot.entity.AuthorityEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuthorityRepository extends CosmosRepository<AuthorityEntity, String> {
    Optional<AuthorityEntity> findByEmail(String email);
    boolean existsByEmail(String email);
}