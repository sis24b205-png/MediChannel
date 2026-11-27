package com.medichannel.backend.repository;

import com.medichannel.backend.entity.Specialisation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface SpecialisationRepository extends JpaRepository<Specialisation, Long> {
}
