package com.example.java_springboot.Service;

import com.example.java_springboot.Entity.UserEntity;
import com.example.java_springboot.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserEntity registerUser(UserEntity user) {
        return userRepository.save(user);
    }

    public List<UserEntity> getAllUsers() {
        return (List<UserEntity>) userRepository.findAll();
    }

    public Optional<UserEntity> getUserById(String id) {
        return userRepository.findById(id);
    }

    public UserEntity updateUser(String id, UserEntity updatedUser) {
        if (userRepository.existsById(id)) {
            updatedUser.setId(id);
            return userRepository.save(updatedUser);
        }
        return null;
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public Optional<UserEntity> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}

