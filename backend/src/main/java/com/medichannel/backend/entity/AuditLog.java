package com.medichannel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.net.InetAddress;

@Entity
@Table(name = "audit_logs")
@Getter
@Setter
@NoArgsConstructor
public class AuditLog {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "audit_log_id")
    private Long auditLogId;

    @Column (name = "actor_user_id")
    private Long actorUserId;

    @Column (name = "action", nullable = false, length = 50)
    private String action;

    @Column (name = "target_type", length = 30)
    private String targetType;

    @Column (name = "target_id")
    private Long targetId;

    @Column (name = "outcome", nullable = false, length = 10)
    private String outcome;

    @JdbcTypeCode (SqlTypes.INET)
    @Column (name = "ip_address", nullable = false)
    private InetAddress ipAddress; 

    @Column (name = "occurred_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime occurredAt; 
}
