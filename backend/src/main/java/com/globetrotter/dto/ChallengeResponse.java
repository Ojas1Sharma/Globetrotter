package com.globetrotter.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChallengeResponse {
    private String inviteCode;
    private String shareUrl;
    private int challengerScore;
    private int challengerCorrectAnswers;
    private int challengerIncorrectAnswers;
} 