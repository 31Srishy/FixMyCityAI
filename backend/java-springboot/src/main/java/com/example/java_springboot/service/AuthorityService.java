package com.example.java_springboot.service;

import com.example.java_springboot.entity.AuthorityEntity;
import com.example.java_springboot.repository.AuthorityRepository;
import com.example.java_springboot.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorityService {

    @Autowired
    private AuthorityRepository authorityRepository;

    /**
     * Register a new authority.
     *
     * @param authority The authority entity to be registered.
     * @return The registered authority entity.
     * @throws IllegalArgumentException If the authority is null or has invalid data.
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
     *
     * @return A list of all authorities.
     */
    public List<AuthorityEntity> getAllAuthorities() {
        return authorityRepository.findAll();
    }

    /**
     * Get an authority by its ID.
     *
     * @param id The ID of the authority.
     * @return The authority entity.
     * @throws ResourceNotFoundException If the authority is not found.
     */
    public AuthorityEntity getAuthorityById(String id) {
        return authorityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Authority not found with ID: " + id));
    }

    /**
     * Update an existing authority.
     *
     * @param id             The ID of the authority to update.
     * @param updatedAuthority The updated authority entity.
     * @return The updated authority entity.
     * @throws ResourceNotFoundException If the authority is not found.
     */
    public AuthorityEntity updateAuthority(String id, AuthorityEntity updatedAuthority) {
        if (!authorityRepository.existsById(id)) {
            throw new ResourceNotFoundException("Authority not found with ID: " + id);
        }

        updatedAuthority.setId(id);
        return authorityRepository.save(updatedAuthority);
    }

    /**
     * Delete an authority by its ID.
     *
     * @param id The ID of the authority to delete.
     * @throws ResourceNotFoundException If the authority is not found.
     */
    public void deleteAuthority(String id) {
        if (!authorityRepository.existsById(id)) {
            throw new ResourceNotFoundException("Authority not found with ID: " + id);
        }

        authorityRepository.deleteById(id);
    }

    /**
     * Get an authority by its email.
     *
     * @param email The email of the authority.
     * @return The authority entity.
     * @throws ResourceNotFoundException If the authority is not found.
     */
    public AuthorityEntity getAuthorityByEmail(String email) {
        return authorityRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("Authority not found with email: " + email));
    }

    /**
     * Check if an authority exists with the given email.
     *
     * @param email The email to check.
     * @return True if the email is registered, false otherwise.
     */
    public boolean existsByEmail(String email) {
        return authorityRepository.existsByEmail(email);
    }
}