package com.medichannel.backend.repository;

import com.medichannel.backend.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
}


