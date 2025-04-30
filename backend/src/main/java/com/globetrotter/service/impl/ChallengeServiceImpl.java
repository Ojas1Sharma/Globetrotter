package com.globetrotter.service.impl;

import com.globetrotter.dto.ChallengeResponse;
import com.globetrotter.model.Challenge;
import com.globetrotter.model.User;
import com.globetrotter.repository.ChallengeRepository;
import com.globetrotter.repository.UserRepository;
import com.globetrotter.service.ChallengeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class ChallengeServiceImpl implements ChallengeService {

    @Autowired
    private ChallengeRepository challengeRepository;

    @Autowired
    private UserRepository userRepository;

    @Value("${app.base-url}")
    private String baseUrl;

    @Override
    @Transactional
    public ChallengeResponse createChallenge(String username) {
        User challenger = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Challenge challenge = new Challenge();
        challenge.setChallenger(challenger);
        challenge.setInviteCode(UUID.randomUUID().toString());
        challenge.setChallengerScore(challenger.getTotalScore());
        challenge.setChallengerCorrectAnswers(challenger.getCorrectAnswers());
        challenge.setChallengerIncorrectAnswers(challenger.getIncorrectAnswers());
        challenge.setActive(true);

        challenge = challengeRepository.save(challenge);

        String shareUrl = baseUrl + "/api/challenges/" + challenge.getInviteCode();
        
        return new ChallengeResponse(
            challenge.getInviteCode(),
            shareUrl,
            challenge.getChallengerScore(),
            challenge.getChallengerCorrectAnswers(),
            challenge.getChallengerIncorrectAnswers()
        );
    }

    @Override
    public Challenge getChallengeByInviteCode(String inviteCode) {
        return challengeRepository.findByInviteCode(inviteCode)
                .orElseThrow(() -> new RuntimeException("Challenge not found"));
    }

    @Override
    public boolean isValidInviteCode(String inviteCode) {
        return challengeRepository.existsByInviteCode(inviteCode);
    }
} 