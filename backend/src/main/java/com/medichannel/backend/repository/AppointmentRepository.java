package com.medichannel.backend.repository;

import com.medichannel.backend.entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByPatientId (Long patientId);
    List<Appointment> findBySessionIdOrderByAppointmentNumber (Long sessionId);
    boolean existsBySessionIdAndPatientIdAndStatusIn(
        Long sessionId, Long patientId, List<String> statuses);
}
