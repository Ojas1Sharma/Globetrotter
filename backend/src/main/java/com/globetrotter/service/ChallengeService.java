package com.globetrotter.service;

import com.globetrotter.dto.ChallengeResponse;
import com.globetrotter.dto.ChallengeDetailDTO;

public interface ChallengeService {
    ChallengeResponse createChallenge(String username);
    ChallengeDetailDTO getChallengeByInviteCode(String inviteCode);
    boolean isValidInviteCode(String inviteCode);
} 