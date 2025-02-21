package com.example.java_springboot.repository;

import com.azure.spring.data.cosmos.repository.CosmosRepository;
import com.example.java_springboot.entity.UserEntity;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CosmosRepository<UserEntity, String> {
    Optional<UserEntity> findByEmail(String email);
    boolean existsByEmail(String email);
}