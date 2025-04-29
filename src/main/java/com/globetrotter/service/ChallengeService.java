package com.globetrotter.service;

import com.globetrotter.model.*;
import com.globetrotter.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Collections;

@Service
public class ChallengeService {
    
    @Autowired
    private ChallengeRepository challengeRepository;
    
    @Autowired
    private DestinationRepository destinationRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private GameSessionRepository gameSessionRepository;
    
    @Transactional
    public Challenge createChallenge(User challenger) {
        Destination destination = destinationRepository.findRandomDestination();
        
        Challenge challenge = new Challenge();
        challenge.setChallenger(challenger);
        challenge.setDestination(destination);
        
        return challengeRepository.save(challenge);
    }
    
    public Challenge getChallengeByCode(String inviteCode) {
        return challengeRepository.findByInviteCode(inviteCode)
            .orElseThrow(() -> new RuntimeException("Challenge not found"));
    }
    
    @Transactional
    public GameSession acceptChallenge(String inviteCode, User user) {
        Challenge challenge = getChallengeByCode(inviteCode);
        
        if (challenge.isCompleted()) {
            throw new RuntimeException("Challenge has already been completed");
        }
        
        if (challenge.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Challenge has expired");
        }
        
        GameSession gameSession = new GameSession();
        gameSession.setUser(user);
        gameSession.setCurrentDestination(challenge.getDestination());
        
        // Get 3 random destinations for options
        List<Destination> options = destinationRepository.findRandomDestinations(3);
        options.add(challenge.getDestination());
        Collections.shuffle(options);
        gameSession.setOptions(options.stream().map(Destination::getName).toList());
        
        challenge.setCompleted(true);
        challengeRepository.save(challenge);
        
        return gameSessionRepository.save(gameSession);
    }
} 