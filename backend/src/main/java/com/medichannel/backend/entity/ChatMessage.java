package com.medichannel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "chat_messages")
@Getter
@Setter
@NoArgsConstructor
public class ChatMessage {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "message_id")
    private Long messageId;

    @Column (name = "consultation_id", nullable = false)
    private Long consultationId;

    @Column (name = "sender_user_id", nullable = false)
    private Long senderUserId;

    @Column (name = "message_encrypted", nullable = false, columnDefinition = "TEXT")
    private String messageEncrypted;

    @Column (name = "sent_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime sentAt; 
}
