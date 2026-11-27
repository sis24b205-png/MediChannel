package com.medichannel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "notices")
@Getter
@Setter
@NoArgsConstructor
public class Notice {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "notice_id")
    private Long noticeId;

    @Column (name = "title", nullable = false, length = 200)
    private String title;

    @Column (name = "content", nullable = false, columnDefinition = "TEXT")
    private String content;

    @Column (name = "status", nullable = false, length = 10)
    private String status = "DRAFT";

    @Column (name = "published_at")
    private OffsetDateTime publishedAt;

    @Column (name = "expires_at")
    private OffsetDateTime expiresAt;

    @Column (name = "created_by_user_id", nullable = false)
    private Long createdByUserId;

    @Column (name = "updated_by_user_id", nullable = false)
    private Long updatedByUserId;

    @Column (name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt; 

    @Column (name = "updated_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime updatedAt;
}
