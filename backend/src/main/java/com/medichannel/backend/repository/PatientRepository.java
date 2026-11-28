package com.medichannel.backend.repository;

import com.medichannel.backend.entity.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface PatientRepository extends JpaRepository<Patient, Long> {

    Optional<Patient> findByUserId(Long userId);

    boolean existsByNicHash(String nicHash);
}
