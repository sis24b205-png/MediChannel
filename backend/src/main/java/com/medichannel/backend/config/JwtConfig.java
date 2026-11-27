package com.medichannel.backend.config;

import com.medichannel.backend.util.KeyMaterial;
import com.nimbusds.jose.jwk.source.ImmutableSecret;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;

import javax.crypto.spec.SecretKeySpec;

@Configuration
public class JwtConfig {

    @Bean
    JwtEncoder jwtEncoder(
        @Value("${medichannel.security.jwt-key}") String secret) {

        return new NimbusJwtEncoder(new ImmutableSecret<>(
            KeyMaterial.decode(secret)));
    }

    @Bean
    JwtDecoder jwtDecoder(
        @Value("${medichannel.security.jwt-key}") String secret,
        @Value("${medichannel.security.jwt-issuer}") String issuer) {

        var key = new SecretKeySpec(
            KeyMaterial.decode(secret), "HmacSHA256");

        var decoder = NimbusJwtDecoder.withSecretKey(key)
            .macAlgorithm(MacAlgorithm.HS256).build();

        decoder.setJwtValidator(
            JwtValidators.createDefaultWithIssuer(issuer));

        return decoder;
    }
}
