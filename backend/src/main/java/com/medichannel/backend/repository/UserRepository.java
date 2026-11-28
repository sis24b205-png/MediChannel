package com.medichannel.backend.repository;

import com.medichannel.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import jakarta.persistence.LockModeType;
import java.util.Optional;

public interface UserRepository
        extends JpaRepository<User, Long> {

    Optional<User> findByEmailHash(String emailHash);

    boolean existsByEmailHash(String emailHash);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<User> findOneByEmailHash(String emailHash);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    Optional<User> findOneByUserId(Long userId);
}