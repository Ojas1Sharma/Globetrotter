package com.globetrotter.controller;

import com.globetrotter.dto.ChallengeResponse;
import com.globetrotter.model.Challenge;
import com.globetrotter.service.ChallengeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/challenges")
@Tag(name = "Challenge", description = "Challenge management APIs")
@CrossOrigin(origins = "${app.cors.allowed-origins}")
public class ChallengeController {

    private static final Logger logger = LoggerFactory.getLogger(ChallengeController.class);

    @Autowired
    private ChallengeService challengeService;

    @PostMapping
    @Operation(summary = "Create a new challenge")
    public ResponseEntity<ChallengeResponse> createChallenge(@AuthenticationPrincipal UserDetails userDetails) {
        logger.info("Creating challenge for user: {}", userDetails.getUsername());
        ChallengeResponse response = challengeService.createChallenge(userDetails.getUsername());
        logger.info("Challenge created successfully: {}", response);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{inviteCode}")
    @Operation(summary = "Get challenge by invite code")
    public ResponseEntity<Challenge> getChallenge(@PathVariable String inviteCode) {
        logger.info("Fetching challenge for invite code: {}", inviteCode);
        Challenge challenge = challengeService.getChallengeByInviteCode(inviteCode);
        logger.info("Challenge found: {}", challenge);
        return ResponseEntity.ok(challenge);
    }

    @GetMapping("/validate/{inviteCode}")
    @Operation(summary = "Validate invite code")
    public ResponseEntity<Boolean> validateInviteCode(@PathVariable String inviteCode) {
        logger.info("Validating invite code: {}", inviteCode);
        boolean isValid = challengeService.isValidInviteCode(inviteCode);
        logger.info("Invite code validation result: {}", isValid);
        return ResponseEntity.ok(isValid);
    }
} 