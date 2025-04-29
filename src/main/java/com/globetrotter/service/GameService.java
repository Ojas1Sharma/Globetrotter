package com.globetrotter.service;

import com.globetrotter.dto.GameQuestionDTO;
import com.globetrotter.dto.GameResultDTO;
import com.globetrotter.model.User;

public interface GameService {
    GameQuestionDTO startNewGame(User user);
    GameResultDTO submitAnswer(Long sessionId, Long destinationId, User user);
    GameQuestionDTO getGameByInviteCode(String inviteCode);
    String generateInviteLink(Long sessionId, User user);
    GameQuestionDTO getGameQuestion(Long sessionId);
} 