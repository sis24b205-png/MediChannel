package com.medichannel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "sessions")
@Getter
@Setter
@NoArgsConstructor
public class Session {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "session_id")
    private Long sessionId;

    @Column (name = "doctor_id", nullable = false)
    private Long doctorId;

    @Column (name = "room_id")
    private Long roomId;

    @Column (name = "starts_at", nullable = false)
    private OffsetDateTime startsAt;

    @Column (name = "ends_at", nullable = false)
    private OffsetDateTime endsAt;

    @Column (name = "session_type", nullable = false, length = 10)
    private String sessionType;

    @Column (name = "max_patients", nullable = false)
    private Integer maxPatients;

    @Column (name = "minutes_per_patient", nullable = false)
    private Integer minutesPerPatient;

    @Column (name = "fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal fee;

    @Column (name = "status", nullable = false, length = 20)
    private String status = "SCHEDULED";

    @Column (name = "delay_minutes", nullable = false)
    private Integer delayMinutes = 0;

    @Column (name = "last_issued_number", nullable = false)
    private Integer lastIssuedNumber = 0;

    @Column (name = "now_serving_number", nullable = false)
    private Integer nowServingNumber;

    @Column (name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column (name = "updated_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime updatedAt;
}
