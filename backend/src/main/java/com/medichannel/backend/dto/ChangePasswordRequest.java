package com.medichannel.backend.dto;

import jakarta.validation.constraints.*;

public record ChangePasswordRequest(

    @NotBlank
    @Size(max = 72)
    String currentPassword,

    @NotBlank
    @Size(min = 8, max = 72)
    @Pattern(
        regexp = "(?s)(?=.*[A-Za-z])(?=.*[0-9])"
               + "(?=.*[^A-Za-z0-9\\s]).+"
    )
    String newPassword

) {

    @Override
    public String toString() {
        return "ChangePasswordRequest[redacted]";
    }
}