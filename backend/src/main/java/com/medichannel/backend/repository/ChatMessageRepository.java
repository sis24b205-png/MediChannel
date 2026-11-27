package com.medichannel.backend.repository;

import com.medichannel.backend.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByConsultationIdOrderBySentAtAscMessageIdAsc (Long consultationId);
}
