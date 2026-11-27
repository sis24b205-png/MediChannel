package com.medichannel.backend.service;

import com.medichannel.backend.util.KeyMaterial;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;

import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.security.SecureRandom;
import java.util.Base64;

@Service
public class EncryptionService {

    private final SecretKeySpec key;
    private final SecureRandom random = new SecureRandom();

    public EncryptionService(
        @Value("${medichannel.security.aes-key}") String secret) {

        key = new SecretKeySpec(KeyMaterial.decode(secret), "AES");
    }

    public String encrypt(String value) {

        if (value == null) return null;

        try {
            byte[] iv = new byte[12];
            random.nextBytes(iv);

            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");

            cipher.init(Cipher.ENCRYPT_MODE, key,
                new GCMParameterSpec(128, iv));

            byte[] encrypted = cipher.doFinal(
                value.getBytes(StandardCharsets.UTF_8));

            byte[] packed = ByteBuffer.allocate(12 + encrypted.length)
                .put(iv).put(encrypted).array();

            return "v1:" + Base64.getEncoder().encodeToString(packed);

        } catch (Exception ex) {
            throw new IllegalStateException("Encryption failed");
        }
    }

    public String decrypt(String value) {

        if (value == null) return null;

        try {
            if (!value.startsWith("v1:"))
                throw new IllegalArgumentException();

            byte[] packed = Base64.getDecoder()
                .decode(value.substring(3));

            if (packed.length < 28)
                throw new IllegalArgumentException();

            ByteBuffer buffer = ByteBuffer.wrap(packed);

            byte[] iv = new byte[12];
            buffer.get(iv);

            byte[] data = new byte[buffer.remaining()];
            buffer.get(data);

            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");

            cipher.init(Cipher.DECRYPT_MODE, key,
                new GCMParameterSpec(128, iv));

            return new String(
                cipher.doFinal(data), StandardCharsets.UTF_8);

        } catch (Exception ex) {
            throw new IllegalStateException("Decryption failed");
        }
    }
}
