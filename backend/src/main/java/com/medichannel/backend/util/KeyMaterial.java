package com.medichannel.backend.util;

import java.util.Base64;

public final class KeyMaterial {

    private KeyMaterial() {}

    public static byte[] decode(String value) {
        byte[] bytes;

        try {
            bytes = Base64.getDecoder().decode(value);
        } catch (IllegalArgumentException ex) {
            throw new IllegalStateException("Invalid security key");
        }

        if (bytes.length != 32) {
            throw new IllegalStateException("Key must be 32 bytes");
        }

        return bytes;
    }
}