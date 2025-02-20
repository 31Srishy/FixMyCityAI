package com.example.java_springboot.Repository;
import com.azure.spring.data.cosmos.Repository.CosmosRepository;
import com.example.java_springboot.Entity.AuthorityEntity;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends CosmosRepository<AuthorityEntity, String> {
    AuthorityEntity findByEmail(String email);
    
    List<AuthorityEntity> findAllByIdIn(List<String> ids);
}
