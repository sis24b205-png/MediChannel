package com.medichannel.backend.repository;

import com.medichannel.backend.entity.Consultation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface ConsultationRepository extends JpaRepository<Consultation, Long> {
    Optional<Consultation> findByAppointmentId (Long appointmentId);
}
