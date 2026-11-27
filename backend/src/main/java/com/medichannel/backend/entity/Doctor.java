package com.medichannel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "doctors")
@Getter
@Setter
@NoArgsConstructor
public class Doctor {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "doctor_id")
    private Long doctorId;

    @Column (name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column (name = "specialisation_id", nullable = false)
    private Long specialisationId;

    @Column (name = "full_name", nullable = false, length = 150)
    private String fullName;

    @Column (name = "slmc_registration_number", nullable = false, unique = true, length = 50)
    private String slmcRegistrationNumber;

    @Column (name = "qualifications", nullable = false, columnDefinition = "TEXT")
    private String qualifications;

    @Column (name = "consultation_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal consultationFee;

    @Column (name = "bio", columnDefinition = "TEXT")
    private String bio;

    @Column (name = "is_active", nullable = false)
    private boolean active = true;

    @Column (name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column (name = "updated_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime updatedAt;
}
