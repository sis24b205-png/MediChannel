package com.medichannel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "rooms")
@Getter
@Setter
@NoArgsConstructor
public class Room {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "room_id")
    private Long roomId;

    @Column (name = "room_number", nullable = false, length = 30)
    private String roomNumber;

    @Column (name = "description", columnDefinition = "TEXT")
    private String description;

    @Column (name = "is_active", nullable = false)
    private boolean active = true;

    @Column (name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column (name = "updated_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime updatedAt;
}
