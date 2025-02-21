package com.example.java_springboot.controller;

import com.example.java_springboot.entity.UserEntity;
import com.example.java_springboot.service.UserService;
import com.example.java_springboot.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Register a new user.
     *
     * @param user The user entity to be registered.
     * @return The registered user entity.
     */
    @PostMapping("/register")
    public ResponseEntity<UserEntity> registerUser(@RequestBody UserEntity user) {
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        try {
            UserEntity registeredUser = userService.registerUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Get all users.
     *
     * @return A list of all users.
     */
    @GetMapping("/")
    public ResponseEntity<List<UserEntity>> getAllUsers() {
        List<UserEntity> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    /**
     * Get a user by their ID.
     *
     * @param id The ID of the user.
     * @return The user entity.
     */
    @GetMapping("/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable String id) {
        try {
            UserEntity user = userService.getUserById(id);
            return ResponseEntity.ok(user);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Update an existing user.
     *
     * @param id        The ID of the user to update.
     * @param updatedUser The updated user entity.
     * @return The updated user entity.
     */
    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> updateUser(
            @PathVariable String id,
            @RequestBody UserEntity updatedUser) {

        try {
            UserEntity updated = userService.updateUser(id, updatedUser);
            return ResponseEntity.ok(updated);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Delete a user by their ID.
     *
     * @param id The ID of the user to delete.
     * @return A response indicating success or failure.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Get a user by their email.
     *
     * @param email The email of the user.
     * @return The user entity.
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<UserEntity> getUserByEmail(@PathVariable String email) {
        try {
            UserEntity user = userService.getUserByEmail(email);
            return ResponseEntity.ok(user);
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
}