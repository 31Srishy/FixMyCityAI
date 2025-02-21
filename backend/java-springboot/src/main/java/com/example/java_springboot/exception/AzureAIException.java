package com.example.java_springboot.exception;

public class AzureAIException extends RuntimeException {
    public AzureAIException(String message, Throwable cause) {
        super(message, cause);
    }
}