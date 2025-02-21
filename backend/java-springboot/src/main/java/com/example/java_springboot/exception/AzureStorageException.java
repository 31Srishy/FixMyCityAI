package com.example.java_springboot.exception;

public class AzureStorageException extends RuntimeException {
    public AzureStorageException(String message, Throwable cause) {
        super(message, cause);
    }
}