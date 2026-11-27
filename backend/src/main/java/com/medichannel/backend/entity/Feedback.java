package com.medichannel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "feedback")
@Getter
@Setter
@NoArgsConstructor
public class Feedback {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "feedback_id")
    private Long feedbackId;

    @Column (name = "appointment_id", nullable = false, unique = true)
    private Long appointmentId;

    @Column (name = "rating", nullable = false)
    private Short rating;

    @Column (name = "comment", columnDefinition = "TEXT")
    private String comment;

    @Column (name = "moderation_status", nullable = false, length = 10)
    private String moderationStatus = "PENDING";

    @Column (name = "moderated_by_user_id")
    private Long moderatedByUserId;

    @Column (name = "moderated_at")
    private OffsetDateTime moderatedAt; 

    @Column (name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt; 

    @Column (name = "updated_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime updatedAt; 
}
