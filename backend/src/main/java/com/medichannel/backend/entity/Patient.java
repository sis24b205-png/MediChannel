package com.medichannel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "patients")
@Getter
@Setter
@NoArgsConstructor
public class Patient {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "patient_id")
    private Long patientId;

    @Column (name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column (name = "full_name_encrypted", nullable = false, columnDefinition = "TEXT")
    private String fullNameEncrypted;

    @Column (name = "nic_encrypted", nullable = false, columnDefinition = "TEXT")
    private String nicEncrypted;

    @Column (name = "nic_hash", nullable = false, unique = true, length = 64)
    private String nicHash;

    @Column (name = "date_of_birth_encrypted", nullable = false, columnDefinition = "TEXT")
    private String dateOfBirthEncrypted;

    @Column (name = "gender", nullable = false, length = 30)
    private String gender;

    @Column (name = "phone_encrypted", nullable = false, columnDefinition = "TEXT")
    private String phoneEncrypted;

    @Column (name = "address_encrypted", nullable = false, columnDefinition = "TEXT")
    private String addressEncrypted;

    @Column (name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column (name = "updated_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime updatedAt;
}
