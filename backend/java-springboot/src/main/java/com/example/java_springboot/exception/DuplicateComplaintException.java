package com.example.java_springboot.exception;

public class DuplicateComplaintException extends RuntimeException {
    public DuplicateComplaintException(String message) {
        super(message);
    }
}