package com.medichannel.backend.service;

import com.medichannel.backend.entity.AuditLog;
import com.medichannel.backend.repository.AuditLogRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.annotation.Propagation;

import java.net.InetAddress;
import java.util.Set;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(
            AuditLogRepository auditLogRepository) {

        this.auditLogRepository = auditLogRepository;
    }

    @Transactional(propagation = Propagation.MANDATORY)
    public void record(
            Long actorUserId,
            String action,
            String targetType,
            Long targetId,
            String outcome,
            InetAddress ipAddress) {

        if (action == null || action.isBlank()
                || action.length() > 50) {

            throw new IllegalArgumentException(
                    "Invalid audit action");
        }

        if (outcome == null ||
                !Set.of("SUCCESS", "FAILURE")
                    .contains(outcome)) {

            throw new IllegalArgumentException(
                    "Invalid audit outcome");
        }

        if ((targetType == null) != (targetId == null)) {

            throw new IllegalArgumentException(
                    "Invalid audit target");
        }

        if (targetType != null &&
                (targetType.isBlank()
                || targetType.length() > 30)) {

            throw new IllegalArgumentException(
                    "Invalid audit target type");
        }

        if (ipAddress == null) {

            throw new IllegalArgumentException(
                    "IP address is required");
        }

        AuditLog auditLog = new AuditLog();

        auditLog.setActorUserId(actorUserId);
        auditLog.setAction(action);
        auditLog.setTargetType(targetType);
        auditLog.setTargetId(targetId);
        auditLog.setOutcome(outcome);
        auditLog.setIpAddress(ipAddress);

        auditLogRepository.save(auditLog);
    }
}
