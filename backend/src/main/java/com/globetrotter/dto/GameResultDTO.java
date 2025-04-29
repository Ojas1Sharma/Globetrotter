package com.globetrotter.dto;

import lombok.Data;
import java.util.List;

@Data
public class GameResultDTO {
    private boolean correct;
    private List<String> funFacts;
    private String destinationName;
    private String destinationCountry;
    private String imageUrl;
    private Integer userScore;
    private Integer totalGamesPlayed;
    private String description;
} 