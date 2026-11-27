package com.medichannel.backend.repository;

import com.medichannel.backend.entity.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
    Optional<Feedback> findByAppointmentId (Long appointmentId);
}

