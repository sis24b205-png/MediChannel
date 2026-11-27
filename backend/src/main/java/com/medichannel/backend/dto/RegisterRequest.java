package com.medichannel.backend.dto;

import jakarta.validation.constraints.*;
import java.time.LocalDate;

public record RegisterRequest(
    @NotBlank @Size(max = 150) String fullName,

    @NotBlank
    @Pattern(regexp = "(?i)([0-9]{9}[VX]|[0-9]{12})")
    String nic,

    @NotNull @Past LocalDate dateOfBirth,

    @NotBlank @Size(max = 30) String gender,

    @NotBlank
    @Pattern(regexp = "07[0-9]{8}")
    String phone,

    @NotBlank @Email @Size(max = 254)
    String email,

    @NotBlank @Size(max = 500)
    String address,

    @NotBlank @Size(min = 8, max = 72)
    @Pattern(regexp = "(?s)(?=.*[A-Za-z])(?=.*[0-9])"
        + "(?=.*[^A-Za-z0-9\\s]).+")
    String password
) {
    @Override
    public String toString() {
        return "RegisterRequest[redacted]";
    }
}
