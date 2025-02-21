package com.example.java_springboot;

import com.azure.spring.data.cosmos.repository.config.EnableCosmosRepositories;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@EnableCosmosRepositories(basePackages = "com.example.java_springboot.repository")
public class JavaSpringbootApplication {

	public static void main(String[] args) {
		SpringApplication.run(JavaSpringbootApplication.class, args);
	}

}
