package com.globetrotter.controller;

import com.globetrotter.model.*;
import com.globetrotter.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/challenge")
public class ChallengeController {
    
    @Autowired
    private ChallengeService challengeService;
    
    @PostMapping("/create")
    public ResponseEntity<Challenge> createChallenge(@AuthenticationPrincipal User user) {
        Challenge challenge = challengeService.createChallenge(user);
        return ResponseEntity.ok(challenge);
    }
    
    @GetMapping("/{inviteCode}")
    public ResponseEntity<Challenge> getChallenge(@PathVariable String inviteCode) {
        Challenge challenge = challengeService.getChallengeByCode(inviteCode);
        return ResponseEntity.ok(challenge);
    }
    
    @PostMapping("/{inviteCode}/accept")
    public ResponseEntity<GameSession> acceptChallenge(
            @PathVariable String inviteCode,
            @AuthenticationPrincipal User user) {
        
        GameSession gameSession = challengeService.acceptChallenge(inviteCode, user);
        return ResponseEntity.ok(gameSession);
    }
} 