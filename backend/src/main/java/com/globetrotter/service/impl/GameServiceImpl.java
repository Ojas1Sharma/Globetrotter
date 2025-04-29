package com.globetrotter.service.impl;

import com.globetrotter.dto.DestinationOptionDTO;
import com.globetrotter.dto.GameQuestionDTO;
import com.globetrotter.dto.GameResultDTO;
import com.globetrotter.model.*;
import com.globetrotter.repository.*;
import com.globetrotter.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class GameServiceImpl implements GameService {
    
    @Autowired
    private DestinationRepository destinationRepository;
    
    @Autowired
    private GameSessionRepository gameSessionRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Value("${game.options.count:4}")
    private int optionsCount;

    @Override
    @Transactional
    public GameQuestionDTO startNewGame(User user) {
        Destination destination = destinationRepository.findRandomDestination();
        List<Destination> options = destinationRepository.findRandomDestinations(destination.getId(), optionsCount - 1);
        options.add(destination);
        Collections.shuffle(options);
        
        GameSession gameSession = new GameSession();
        gameSession.setUser(user);
        gameSession.setCurrentDestination(destination);
        gameSession.setOptions(options.stream().map(Destination::getName).toList());
        gameSession.setStartedAt(LocalDateTime.now());
        gameSession = gameSessionRepository.save(gameSession);
        
        return convertToGameQuestionDTO(gameSession, options);
    }

    @Override
    @Transactional
    public GameResultDTO submitAnswer(Long sessionId, Long destinationId, User user) {
        GameSession gameSession = gameSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Game session not found"));
            
        boolean isCorrect = gameSession.getCurrentDestination().getId().equals(destinationId);
        
        user.updateScore(isCorrect);
        userRepository.save(user);
        
        gameSession.setCompleted(true);
        gameSession.setEndedAt(LocalDateTime.now());
        gameSession.setSubmittedDestinationId(destinationId);
        gameSessionRepository.save(gameSession);
        
        return convertToGameResultDTO(gameSession, user);
    }

    @Override
    public GameQuestionDTO getGameByInviteCode(String inviteCode) {
        GameSession gameSession = gameSessionRepository.findByInviteCode(inviteCode)
            .orElseThrow(() -> new RuntimeException("Game session not found"));
            
        List<Destination> options = destinationRepository.findRandomDestinations(gameSession.getCurrentDestination().getId(), optionsCount - 1);
        options.add(gameSession.getCurrentDestination());
        Collections.shuffle(options);
        
        return convertToGameQuestionDTO(gameSession, options);
    }

    @Override
    @Transactional
    public String generateInviteLink(Long sessionId, User user) {
        GameSession gameSession = gameSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Game session not found"));
            
        String inviteCode = UUID.randomUUID().toString();
        gameSession.setInviteCode(inviteCode);
        gameSessionRepository.save(gameSession);
        
        return inviteCode;
    }

    @Override
    public GameQuestionDTO getGameQuestion(Long sessionId) {
        GameSession gameSession = gameSessionRepository.findById(sessionId)
            .orElseThrow(() -> new RuntimeException("Game session not found"));
            
        List<Destination> options = destinationRepository.findRandomDestinations(gameSession.getCurrentDestination().getId(), optionsCount - 1);
        options.add(gameSession.getCurrentDestination());
        Collections.shuffle(options);
        
        return convertToGameQuestionDTO(gameSession, options);
    }

    private GameQuestionDTO convertToGameQuestionDTO(GameSession gameSession, List<Destination> options) {
        GameQuestionDTO dto = new GameQuestionDTO();
        dto.setSessionId(gameSession.getId());
        dto.setClues(gameSession.getCurrentDestination().getClues());
        dto.setOptions(options.stream()
            .map(d -> {
                DestinationOptionDTO option = new DestinationOptionDTO();
                option.setId(d.getId());
                option.setName(d.getName());
                option.setCountry(d.getCountry());
                return option;
            })
            .toList());
        dto.setDifficulty(gameSession.getCurrentDestination().getDifficulty());
        return dto;
    }

    private GameResultDTO convertToGameResultDTO(GameSession gameSession, User user) {
        GameResultDTO dto = new GameResultDTO();
        dto.setCorrect(gameSession.getCurrentDestination().getId().equals(gameSession.getSubmittedDestinationId()));
        dto.setFunFacts(gameSession.getCurrentDestination().getFunFacts());
        dto.setDestinationName(gameSession.getCurrentDestination().getName());
        dto.setDestinationCountry(gameSession.getCurrentDestination().getCountry());
        dto.setImageUrl(gameSession.getCurrentDestination().getImageUrl());
        dto.setUserScore(user.getTotalScore());
        dto.setTotalGamesPlayed(user.getGamesPlayed());
        dto.setDescription(gameSession.getCurrentDestination().getDescription());
        return dto;
    }
} 