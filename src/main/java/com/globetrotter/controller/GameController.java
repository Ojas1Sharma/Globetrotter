package com.globetrotter.controller;

import com.globetrotter.dto.GameQuestionDTO;
import com.globetrotter.dto.GameResultDTO;
import com.globetrotter.model.*;
import com.globetrotter.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/game")
public class GameController {
    
    @Autowired
    private GameService gameService;
    
    @PostMapping("/start")
    public ResponseEntity<GameQuestionDTO> startNewGame(@AuthenticationPrincipal User user) {
        GameQuestionDTO gameQuestion = gameService.startNewGame(user);
        return ResponseEntity.ok(gameQuestion);
    }
    
    @PostMapping("/{gameSessionId}/submit")
    public ResponseEntity<GameResultDTO> submitAnswer(
            @PathVariable Long gameSessionId,
            @RequestBody Map<String, Long> request,
            @AuthenticationPrincipal User user) {
        
        Long destinationId = request.get("destinationId");
        GameResultDTO result = gameService.submitAnswer(gameSessionId, destinationId, user);
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/{gameSessionId}")
    public ResponseEntity<GameQuestionDTO> getGameQuestion(@PathVariable Long gameSessionId) {
        GameQuestionDTO gameQuestion = gameService.getGameQuestion(gameSessionId);
        return ResponseEntity.ok(gameQuestion);
    }
} 