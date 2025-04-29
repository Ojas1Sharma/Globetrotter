package com.globetrotter.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String country;
    private String continent;
    
    @ElementCollection
    @CollectionTable(name = "destination_clues", joinColumns = @JoinColumn(name = "destination_id"))
    @Column(name = "clue")
    private List<String> clues;
    
    @ElementCollection
    @CollectionTable(name = "destination_facts", joinColumns = @JoinColumn(name = "destination_id"))
    @Column(name = "fact")
    private List<String> funFacts;
    
    private String imageUrl;
    private double latitude;
    private double longitude;
    private String difficulty;
    private String description;
    private boolean active;
} 