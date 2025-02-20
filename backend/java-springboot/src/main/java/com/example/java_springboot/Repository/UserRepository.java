package com.example.java_springboot.Repository;
import com.azure.spring.data.cosmos.repository.CosmosRepository;
import com.example.java_springboot.Entity.UserEntity;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends CosmosRepository<UserEntity, String> {

    UserEntity findByEmail(String email);

    UserEntity findById(String id);
}
