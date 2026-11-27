package com.medichannel.backend.service;

import com.medichannel.backend.util.KeyMaterial;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import java.nio.charset.StandardCharsets;
import java.util.HexFormat;
import java.util.Locale;

@Service
public class LookupHashService {

    private final SecretKeySpec key;

    public LookupHashService(
        @Value("${medichannel.security.hmac-key}") String secret) {

        key = new SecretKeySpec(
            KeyMaterial.decode(secret), "HmacSHA256");
    }

    public String hashEmail(String email) {

        if (email == null) return null;

        return hash(email.trim().toLowerCase(Locale.ROOT));
    }

    public String hashNic(String nic) {

        if (nic == null) return null;

        return hash(nic.trim().toUpperCase(Locale.ROOT));
    }

    private String hash(String value) {

        try {
            Mac mac = Mac.getInstance("HmacSHA256");

            mac.init(key);

            byte[] result = mac.doFinal(
                value.getBytes(StandardCharsets.UTF_8));

            return HexFormat.of().formatHex(result);

        } catch (Exception ex) {
            throw new IllegalStateException("HMAC hashing failed");
        }
    }
}
