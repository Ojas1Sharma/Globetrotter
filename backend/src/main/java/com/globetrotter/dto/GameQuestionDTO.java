package com.globetrotter.dto;

import lombok.Data;
import java.util.List;

@Data
public class GameQuestionDTO {
    private Long sessionId;
    private List<String> clues;
    private List<DestinationOptionDTO> options;
    private String difficulty;
} 