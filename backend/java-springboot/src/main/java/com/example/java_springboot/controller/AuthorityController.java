package com.example.java_springboot.controller;

import com.example.java_springboot.entity.AuthorityEntity;
import com.example.java_springboot.service.AuthorityService;
import com.example.java_springboot.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/authorities")
public class AuthorityController {

    @Autowired
    private AuthorityService authorityService;

    /**
     * Register a new authority.
     *
     * @param authority The authority entity to be registered.
     * @return The registered authority entity.
     */
    @PostMapping("/register")
    public ResponseEntity<AuthorityEntity> registerAuthority(@RequestBody AuthorityEntity authority) {
        if (authority == null) {
            return ResponseEntity.badRequest().build();
        }

        try {
            AuthorityEntity registeredAuthority = authorityService.registerAuthority(authority);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredAuthority);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get all authorities.
     *
     * @return A list of all authorities.
     */
    @GetMapping("/")
    public ResponseEntity<List<AuthorityEntity>> getAllAuthorities() {
        List<AuthorityEntity> authorities = authorityService.getAllAuthorities();
        return ResponseEntity.ok(authorities);
    }

    /**
     * Get an authority by its ID.
     *
     * @param id The ID of the authority.
     * @return The authority entity.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AuthorityEntity> getAuthorityById(@PathVariable String id) {
        try {
            AuthorityEntity authority = authorityService.getAuthorityById(id);
            return ResponseEntity.ok(authority);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update an existing authority.
     *
     * @param id             The ID of the authority to update.
     * @param updatedAuthority The updated authority entity.
     * @return The updated authority entity.
     */
    @PutMapping("/{id}")
    public ResponseEntity<AuthorityEntity> updateAuthority(
            @PathVariable String id,
            @RequestBody AuthorityEntity updatedAuthority) {

        try {
            AuthorityEntity updated = authorityService.updateAuthority(id, updatedAuthority);
            return ResponseEntity.ok(updated);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Delete an authority by its ID.
     *
     * @param id The ID of the authority to delete.
     * @return A response indicating success or failure.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuthority(@PathVariable String id) {
        try {
            authorityService.deleteAuthority(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Get an authority by its email.
     *
     * @param email The email of the authority.
     * @return The authority entity.
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<AuthorityEntity> getAuthorityByEmail(@PathVariable String email) {
        try {
            AuthorityEntity authority = authorityService.getAuthorityByEmail(email);
            return ResponseEntity.ok(authority);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}