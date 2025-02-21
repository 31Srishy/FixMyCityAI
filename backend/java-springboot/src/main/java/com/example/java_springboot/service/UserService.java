package com.example.java_springboot.service;

import com.example.java_springboot.entity.UserEntity;
import com.example.java_springboot.repository.UserRepository;
import com.example.java_springboot.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Register a new user.
     *
     * @param user The user entity to be registered.
     * @return The registered user entity.
     * @throws IllegalArgumentException If the user is null or has invalid data.
     */
    public UserEntity registerUser(UserEntity user) {
        if (user == null) {
            throw new IllegalArgumentException("User must not be null.");
        }

        // Check if the email is already registered
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        return userRepository.save(user);
    }

    /**
     * Get all users.
     *
     * @return A list of all users.
     */
    public List<UserEntity> getAllUsers() {
        Iterable<UserEntity> iterable = userRepository.findAll();
        return StreamSupport.stream(iterable.spliterator(), false)
                .collect(Collectors.toList());
    }

    /**
     * Get a user by their ID.
     *
     * @param id The ID of the user.
     * @return The user entity.
     * @throws ResourceNotFoundException If the user is not found.
     */
    public UserEntity getUserById(String id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));
    }

    /**
     * Update an existing user.
     *
     * @param id        The ID of the user to update.
     * @param updatedUser The updated user entity.
     * @return The updated user entity.
     * @throws ResourceNotFoundException If the user is not found.
     */
    public UserEntity updateUser(String id, UserEntity updatedUser) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with ID: " + id);
        }

        updatedUser.setId(id);
        return userRepository.save(updatedUser);
    }

    /**
     * Delete a user by their ID.
     *
     * @param id The ID of the user to delete.
     * @throws ResourceNotFoundException If the user is not found.
     */
    public void deleteUser(String id) {
        if (!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("User not found with ID: " + id);
        }

        userRepository.deleteById(id);
    }

    /**
     * Get a user by their email.
     *
     * @param email The email of the user.
     * @return The user entity.
     * @throws ResourceNotFoundException If the user is not found.
     */
    public UserEntity getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + email));
    }

    /**
     * Check if a user exists with the given email.
     *
     * @param email The email to check.
     * @return True if the email is registered, false otherwise.
     */
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}