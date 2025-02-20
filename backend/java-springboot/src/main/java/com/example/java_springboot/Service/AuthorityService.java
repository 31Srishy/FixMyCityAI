package com.example.java_springboot.service;

import com.example.java_springboot.Entity.AuthorityEntity;
import com.example.java_springboot.Repository.AuthorityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorityService {
    @Autowired
    private AuthorityRepository authorityRepository;

    public AuthorityEntity registerAuthority(AuthorityEntity authority) {
        return authorityRepository.save(authority);
    }

    public List<AuthorityEntity> getAllAuthorities() {
        return authorityRepository.findAll();
    }

    public Optional<AuthorityEntity> getAuthorityById(String id) {
        return authorityRepository.findById(id);
    }

    public AuthorityEntity updateAuthority(String id, AuthorityEntity updatedAuthority) {
        if (authorityRepository.existsById(id)) {
            updatedAuthority.setId(id);
            return authorityRepository.save(updatedAuthority);
        }
        return null;
    }

    public void deleteAuthority(String id) {
        authorityRepository.deleteById(id);
    }
}

