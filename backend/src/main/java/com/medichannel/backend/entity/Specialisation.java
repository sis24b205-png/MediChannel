package com.medichannel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "specialisations")
@Getter
@Setter
@NoArgsConstructor
public class Specialisation {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "specialisation_id")
    private Long specialisationId;

    @Column (name = "name", nullable = false, length = 100)
    private String name;

    @Column (name = "description", columnDefinition = "TEXT")
    private String description;

    @Column (name = "is_active", nullable = false)
    private boolean active = true;

    @Column (name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column (name = "updated_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime updatedAt;
}
