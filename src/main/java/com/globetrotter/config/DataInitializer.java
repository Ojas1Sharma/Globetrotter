package com.globetrotter.config;

import com.globetrotter.model.Destination;
import com.globetrotter.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.Arrays;

@Configuration
public class DataInitializer {
    
    @Autowired
    private DestinationRepository destinationRepository;
    
    @Bean
    public CommandLineRunner initData() {
        return args -> {
            // Only initialize if database is empty
            if (destinationRepository.count() == 0) {
                // Sample destinations
                Destination eiffelTower = new Destination();
                eiffelTower.setName("Eiffel Tower");
                eiffelTower.setCountry("France");
                eiffelTower.setContinent("Europe");
                eiffelTower.setClues(Arrays.asList(
                    "I was built for the 1889 World's Fair",
                    "I am made of iron and stand 324 meters tall",
                    "I am located in the 'City of Light'"
                ));
                eiffelTower.setFunFacts(Arrays.asList(
                    "The Eiffel Tower was initially criticized by some of France's leading artists and intellectuals",
                    "During World War II, when Hitler visited Paris, the French cut the lift cables so Hitler would have to climb the steps",
                    "The tower was originally intended to be dismantled after 20 years"
                ));
                eiffelTower.setImageUrl("https://example.com/eiffel-tower.jpg");
                eiffelTower.setLatitude(48.8584);
                eiffelTower.setLongitude(2.2945);
                
                Destination greatWall = new Destination();
                greatWall.setName("Great Wall of China");
                greatWall.setCountry("China");
                greatWall.setContinent("Asia");
                greatWall.setClues(Arrays.asList(
                    "I am the longest wall in the world",
                    "I was built to protect against invasions",
                    "I am visible from space"
                ));
                greatWall.setFunFacts(Arrays.asList(
                    "The Great Wall is not a single continuous wall but a series of walls and fortifications",
                    "It took over 2,000 years to build the entire wall",
                    "The wall is made of various materials including stone, brick, tamped earth, and wood"
                ));
                greatWall.setImageUrl("https://example.com/great-wall.jpg");
                greatWall.setLatitude(40.4319);
                greatWall.setLongitude(116.5704);
                
                destinationRepository.saveAll(Arrays.asList(eiffelTower, greatWall));
            }
        };
    }
} 