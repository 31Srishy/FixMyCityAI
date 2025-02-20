package com.example.java_springboot.controller;

import com.example.java_springboot.Entity.AuthorityEntity;
import com.example.java_springboot.Service.AuthorityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/authorities")
public class AuthorityController {
    @Autowired
    private AuthorityService authorityService;

    @PostMapping("/register")
    public AuthorityEntity registerAuthority(@RequestBody AuthorityEntity authority) {
        return authorityService.registerAuthority(authority);
    }

    @GetMapping("/")
    public List<AuthorityEntity> getAllAuthorities() {
        return authorityService.getAllAuthorities();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuthorityEntity> getAuthorityById(@PathVariable String id) {
        return authorityService.getAuthorityById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuthorityEntity> updateAuthority(@PathVariable String id, @RequestBody AuthorityEntity updatedAuthority) {
        return authorityService.updateAuthority(id, updatedAuthority)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuthority(@PathVariable String id) {
        authorityService.deleteAuthority(id);
        return ResponseEntity.noContent().build();
    }
}
