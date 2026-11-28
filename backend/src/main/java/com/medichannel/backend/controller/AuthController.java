package com.medichannel.backend.controller;

import com.medichannel.backend.dto.RegisterRequest;
import com.medichannel.backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

import com.medichannel.backend.dto.LoginRequest;
import com.medichannel.backend.dto.AuthResponse;

import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import com.medichannel.backend.dto.ChangePasswordRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(
            @Valid @RequestBody RegisterRequest request) {

        authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of(
                        "message",
                        "Registration successful"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        AuthResponse response = authService.login(request);

        return ResponseEntity.ok(response);
}
    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me(
        @AuthenticationPrincipal Jwt jwt) {

        return ResponseEntity.ok(Map.of(
            "userId", jwt.getSubject(),
            "roles", jwt.getClaimAsStringList("roles")
    ));
}

@PostMapping("/change-password")
public ResponseEntity<Map<String, String>> changePassword(
        @AuthenticationPrincipal Jwt jwt,
        @Valid @RequestBody ChangePasswordRequest request) {

    Long userId = Long.valueOf(jwt.getSubject());

    authService.changePassword(userId, request);

    return ResponseEntity.ok(
            Map.of("message", "Password changed successfully"));
}
}