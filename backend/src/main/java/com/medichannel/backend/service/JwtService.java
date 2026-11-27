package com.medichannel.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.Set;

@Service
public class JwtService {

    private final JwtEncoder encoder;
    private final String issuer;
    private final long ttl;

    public JwtService(JwtEncoder encoder,
        @Value("${medichannel.security.jwt-issuer}") String issuer,
        @Value("${medichannel.security.jwt-ttl-seconds}") long ttl) {

        this.encoder = encoder;
        this.issuer = issuer;

        if (ttl < 1 || ttl > 3600)
            throw new IllegalArgumentException("TTL");

        this.ttl = ttl;
    }

    public String issue(long userId, String role) {

        if (!Set.of("CUSTOMER", "DOCTOR", "MANAGER", "ADMIN").contains(role))
            throw new IllegalArgumentException("Invalid role");

        Instant now = Instant.now();

        var claims = JwtClaimsSet.builder()
            .issuer(issuer)
            .subject(Long.toString(userId))
            .issuedAt(now)
            .expiresAt(now.plusSeconds(ttl))
            .claim("roles", List.of(role))
            .build();

        var header = JwsHeader.with(MacAlgorithm.HS256).build();

        return encoder.encode(
            JwtEncoderParameters.from(header, claims))
            .getTokenValue();
    }

    public long expiresIn() {
        return ttl;
    }
}
