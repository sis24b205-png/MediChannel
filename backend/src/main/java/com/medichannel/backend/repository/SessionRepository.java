package com.medichannel.backend.repository;

import com.medichannel.backend.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SessionRepository extends JpaRepository<Session, Long> {
    @Lock (LockModeType.PESSIMISTIC_WRITE)
    @Query ("select s from Session s where s.sessionId = :id")
    Optional<Session> lockById (@Param("id") Long id);
    List<Session> findByDoctorId(Long doctorId);
}
