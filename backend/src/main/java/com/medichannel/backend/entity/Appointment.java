package com.medichannel.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.time.OffsetDateTime;
import java.math.BigDecimal;

@Entity
@Table(name = "appointments")
@Getter
@Setter
@NoArgsConstructor
public class Appointment {
    @Id 
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column (name = "appointment_id")
    private Long appointmentId;

    @Column (name = "session_id", nullable = false)
    private Long sessionId;

    @Column (name = "patient_id", nullable = false)
    private Long patientId;

    @Column (name = "appointment_number", nullable = false)
    private Integer appointmentNumber;

    @Column (name = "booking_reference", nullable = false, unique = true, length = 40)
    private String bookingReference;

    @Column (name = "reason_encrypted", nullable = false, columnDefinition = "TEXT")
    private String reasonEncrypted;

    @Column (name = "status", nullable = false, length = 20)
    private String status = "BOOKED";

    @Column (name = "payment_status", nullable = false, length = 10)
    private String paymentStatus = "PENDING";

    @Column (name = "payment_method", length = 10)
    private String paymentMethod;

    @Column (name = "booked_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal bookedFee;

    @Column (name = "paid_at")
    private OffsetDateTime paidAt;

    @Column (name = "arrived_at")
    private OffsetDateTime arrivedAt;

    @Column (name = "cancelled_at")
    private OffsetDateTime cancelledAt;

    @Column (name = "created_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime createdAt;

    @Column (name = "updated_at", nullable = false, insertable = false, updatable = false)
    private OffsetDateTime updatedAt;    
}
