package com.medichannel.backend.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class RoleTestController {

    @GetMapping("/customer/test")
    public Map<String, String> customerTest() {
        return Map.of(
            "message", "Customer access granted"
        );
    }

    @GetMapping("/doctor/test")
    public Map<String, String> doctorTest() {
        return Map.of(
            "message", "Doctor access granted"
        );
    }

    @GetMapping("/manager/test")
    public Map<String, String> managerTest() {
        return Map.of(
            "message", "Manager access granted"
        );
    }

    @GetMapping("/admin/test")
    public Map<String, String> adminTest() {
        return Map.of(
            "message", "Admin access granted"
        );
    }
}
