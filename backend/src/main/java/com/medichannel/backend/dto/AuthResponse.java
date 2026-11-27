package com.medichannel.backend.dto;

public record AuthResponse(
    String accessToken,
    long expiresIn,
    String role,
    boolean mustChangePassword
) {
    @Override
    public String toString() {
        return "AuthResponse[redacted]";
    }
}