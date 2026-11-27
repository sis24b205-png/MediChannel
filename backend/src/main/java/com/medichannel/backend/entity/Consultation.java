package com.medichannel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "consultations")
@Getter
@Setter
@NoArgsConstructor
public class Consultation {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "consultation_id")
    private Long consultationId;

    @Column (name = "appointment_id", nullable = false, unique = true)
    private Long appointmentId;

    @Column (name = "diagnosis_encrypted", columnDefinition = "TEXT")
    private String diagnosisEncrypted;

    @Column (name = "advice_encrypted", columnDefinition = "TEXT")
    private String adviceEncrypted;

    @Column (name = "prescription_encrypted", columnDefinition = "TEXT")
    private String prescriptionEncrypted;

    @Column (name = "started_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime startedAt;

    @Column (name = "ended_at")
    private OffsetDateTime endedAt;

    @Column (name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column (name = "updated_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime updatedAt;    
}
