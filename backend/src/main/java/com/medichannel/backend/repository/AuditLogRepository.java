package com.medichannel.backend.repository;

import com.medichannel.backend.entity.AuditLog;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
}
