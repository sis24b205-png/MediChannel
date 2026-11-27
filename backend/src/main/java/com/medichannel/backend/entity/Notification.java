package com.medichannel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;

@Entity
@Table(name = "notifications")
@Getter
@Setter
@NoArgsConstructor
public class Notification {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "notification_id")
    private Long notificationId;

    @Column (name = "recipient_user_id", nullable = false)
    private Long recipientUserId;

    @Column (name = "session_id")
    private Long sessionId;

    @Column (name = "appointment_id")
    private Long appointmentId;

    @Column (name = "notification_type", nullable = false, length = 30)
    private String notificationType;

    @Column (name = "message", nullable = false, columnDefinition = "TEXT")
    private String message;

    @Column (name = "read_at")
    private OffsetDateTime readAt; 

    @Column (name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt; 
}
