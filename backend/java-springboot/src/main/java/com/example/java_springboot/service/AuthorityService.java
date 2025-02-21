package com.example.java_springboot.service;

import com.azure.cosmos.models.PartitionKey;
import com.example.java_springboot.entity.AuthorityEntity;
import com.example.java_springboot.repository.AuthorityRepository;
import com.example.java_springboot.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    /**
     * Register a new authority.
     */
    public AuthorityEntity registerAuthority(AuthorityEntity authority) {
        if (authority == null) {
            throw new IllegalArgumentException("Authority must not be null.");
        }

        // Check if the email is already registered
        if (authorityRepository.existsByEmail(authority.getEmail())) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        return authorityRepository.save(authority);
    }

    /**
     * Get all authorities.
     */
    public List<AuthorityEntity> getAllAuthorities() {
        // Convert Iterable to List
        return StreamSupport.stream(authorityRepository.findAll().spliterator(), false)
                .collect(Collectors.toList());
    }

    /**
     * Get an authority by ID.
     */
    public AuthorityEntity getAuthorityById(String id) {
        return authorityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Authority not found with ID: " + id));
    }

    /**
     * Update an existing authority.
     */
    public AuthorityEntity updateAuthority(String id, AuthorityEntity updatedAuthority) {
        // Check if the authority exists before updating
        if (!authorityRepository.findById(id).isPresent()) {
            throw new ResourceNotFoundException("Authority not found with ID: " + id);
        }

        updatedAuthority.setId(id);
        return authorityRepository.save(updatedAuthority);
    }

    /**
     * Delete an authority by ID.
     */
    public void deleteAuthority(String id) {
        // Check if the authority exists before deleting
        if (!authorityRepository.findById(id).isPresent()) {
            throw new ResourceNotFoundException("Authority not found with ID: " + id);
        }

        authorityRepository.deleteById(id);
    }

    /**
     * Get an authority by email.
     */
    public AuthorityEntity getAuthorityByEmail(String email) {
        return authorityRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authority not found with email: " + email));
    }

    /**
     * Check if an authority exists by email.
     */
    public boolean existsByEmail(String email) {
        return authorityRepository.existsByEmail(email);
    }
}
