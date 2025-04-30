package com.globetrotter.service;

import com.globetrotter.dto.ChallengeResponse;
import com.globetrotter.model.Challenge;

public interface ChallengeService {
    ChallengeResponse createChallenge(String username);
    Challenge getChallengeByInviteCode(String inviteCode);
    boolean isValidInviteCode(String inviteCode);
} 