package com.globetrotter.service.impl;

import com.globetrotter.dto.ChallengeResponse;
import com.globetrotter.dto.ChallengeDetailDTO;
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
    public ChallengeDetailDTO getChallengeByInviteCode(String inviteCode) {
        Challenge challenge = challengeRepository.findByInviteCode(inviteCode)
                .orElseThrow(() -> new RuntimeException("Challenge not found"));
        return convertToDTO(challenge);
    }

    @Override
    public boolean isValidInviteCode(String inviteCode) {
        return challengeRepository.existsByInviteCode(inviteCode);
    }

    private ChallengeDetailDTO convertToDTO(Challenge challenge) {
        ChallengeDetailDTO dto = new ChallengeDetailDTO();
        dto.setId(challenge.getId());
        dto.setInviteCode(challenge.getInviteCode());
        dto.setChallengerScore(challenge.getChallengerScore());
        dto.setChallengerCorrectAnswers(challenge.getChallengerCorrectAnswers());
        dto.setChallengerIncorrectAnswers(challenge.getChallengerIncorrectAnswers());
        dto.setOpponentScore(challenge.getOpponentScore());
        dto.setOpponentCorrectAnswers(challenge.getOpponentCorrectAnswers());
        dto.setOpponentIncorrectAnswers(challenge.getOpponentIncorrectAnswers());
        dto.setActive(challenge.isActive());
        dto.setCreatedAt(challenge.getCreatedAt());
        dto.setCompleted(challenge.isCompleted());
        dto.setExpiresAt(challenge.getExpiresAt());

        if (challenge.getChallenger() != null) {
            UserDTO challengerDTO = new UserDTO();
            challengerDTO.setId(challenge.getChallenger().getId());
            challengerDTO.setUsername(challenge.getChallenger().getUsername());
            challengerDTO.setEmail(challenge.getChallenger().getEmail());
            challengerDTO.setInviteCode(challenge.getChallenger().getInviteCode());
            challengerDTO.setTotalScore(challenge.getChallenger().getTotalScore());
            challengerDTO.setGamesPlayed(challenge.getChallenger().getGamesPlayed());
            challengerDTO.setCorrectAnswers(challenge.getChallenger().getCorrectAnswers());
            challengerDTO.setIncorrectAnswers(challenge.getChallenger().getIncorrectAnswers());
            challengerDTO.setCreatedAt(challenge.getChallenger().getCreatedAt());
            dto.setChallenger(challengerDTO);
        }

        if (challenge.getOpponent() != null) {
            UserDTO opponentDTO = new UserDTO();
            opponentDTO.setId(challenge.getOpponent().getId());
            opponentDTO.setUsername(challenge.getOpponent().getUsername());
            opponentDTO.setEmail(challenge.getOpponent().getEmail());
            opponentDTO.setInviteCode(challenge.getOpponent().getInviteCode());
            opponentDTO.setTotalScore(challenge.getOpponent().getTotalScore());
            opponentDTO.setGamesPlayed(challenge.getOpponent().getGamesPlayed());
            opponentDTO.setCorrectAnswers(challenge.getOpponent().getCorrectAnswers());
            opponentDTO.setIncorrectAnswers(challenge.getOpponent().getIncorrectAnswers());
            opponentDTO.setCreatedAt(challenge.getOpponent().getCreatedAt());
            dto.setOpponent(opponentDTO);
        }

        return dto;
    }
}