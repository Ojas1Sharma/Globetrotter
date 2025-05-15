package com.globetrotter.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ChallengeDetailDTO {
    private Long id;
    private UserDTO challenger;
    private UserDTO opponent;
    private String inviteCode;
    private int challengerScore;
    private int challengerCorrectAnswers;
    private int challengerIncorrectAnswers;
    private int opponentScore;
    private int opponentCorrectAnswers;
    private int opponentIncorrectAnswers;
    private boolean active;
    private LocalDateTime createdAt;
    private boolean completed;
    private LocalDateTime expiresAt;
}

@Data
class UserDTO {
    private Long id;
    private String username;
    private String email;
    private String inviteCode;
    private int totalScore;
    private int gamesPlayed;
    private int correctAnswers;
    private int incorrectAnswers;
    private LocalDateTime createdAt;
}
