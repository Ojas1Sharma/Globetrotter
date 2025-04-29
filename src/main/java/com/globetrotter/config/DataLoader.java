package com.globetrotter.config;

import com.globetrotter.model.Destination;
import com.globetrotter.repository.DestinationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final DestinationRepository destinationRepository;

    @Autowired
    public DataLoader(DestinationRepository destinationRepository) {
        this.destinationRepository = destinationRepository;
    }

    @Override
    public void run(String... args) {
        if (destinationRepository.count() == 0) {
            loadInitialDestinations();
        }
    }

    private void loadInitialDestinations() {
        List<Destination> destinations = Arrays.asList(
            createDestination(
                "Eiffel Tower",
                "France",
                Arrays.asList(
                    "I am an iron lady standing tall in a city of love.",
                    "Built in 1889, I was once the world's tallest structure.",
                    "My nighttime sparkle is protected by copyright law."
                ),
                Arrays.asList(
                    "The tower was originally intended to be a temporary structure.",
                    "It takes 60 tons of paint to protect the tower from rust.",
                    "The tower grows up to 6 inches taller in summer due to thermal expansion."
                ),
                "MEDIUM",
                "https://example.com/eiffel.jpg",
                "This iconic wrought-iron lattice tower is located on the Champ de Mars in Paris."
            ),
            createDestination(
                "Taj Mahal",
                "India",
                Arrays.asList(
                    "I am a testament to eternal love, built in white marble.",
                    "My reflection in water is as famous as my structure.",
                    "It took 22 years and 22,000 workers to complete me."
                ),
                Arrays.asList(
                    "The minarets are slightly tilted outwards to prevent damage in case they fall.",
                    "The marble dome changes color throughout the day.",
                    "The entire structure was built without using steel or concrete."
                ),
                "EASY",
                "https://example.com/taj.jpg",
                "An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra."
            ),
            createDestination(
                "Machu Picchu",
                "Peru",
                Arrays.asList(
                    "I am a city in the clouds, hidden for centuries.",
                    "My stone walls were built without mortar.",
                    "I was built in the 15th century and abandoned during the Spanish conquest."
                ),
                Arrays.asList(
                    "The site was built without the use of wheels.",
                    "The stones are cut so precisely that a knife blade cannot fit between them.",
                    "It was named a UNESCO World Heritage Site in 1983."
                ),
                "HARD",
                "https://example.com/machu.jpg",
                "This ancient Inca city sits high in the Andes Mountains, above the Sacred Valley."
            )
        );

        destinationRepository.saveAll(destinations);
    }

    private Destination createDestination(
            String name,
            String country,
            List<String> clues,
            List<String> funFacts,
            String difficulty,
            String imageUrl,
            String description) {
        Destination destination = new Destination();
        destination.setName(name);
        destination.setCountry(country);
        destination.setClues(clues);
        destination.setFunFacts(funFacts);
        destination.setDifficulty(difficulty);
        destination.setImageUrl(imageUrl);
        destination.setDescription(description);
        destination.setActive(true);
        return destination;
    }
} 