package com.globetrotter.controller;

import com.globetrotter.model.User;
import com.globetrotter.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(
            @RequestParam String username,
            @RequestParam String password) {
        String token = authService.login(username, password);
        User user = authService.getUserByUsername(username);
        return ResponseEntity.ok(Map.of("token", token, "user", user));
    }
} 