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
                "Europe",
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
                "This iconic wrought-iron lattice tower is located on the Champ de Mars in Paris.",
                48.8584,
                2.2945
            ),
            createDestination(
                "Taj Mahal",
                "India",
                "Asia",
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
                "An ivory-white marble mausoleum on the right bank of the river Yamuna in Agra.",
                27.1751,
                78.0421
            ),
            createDestination(
                "Machu Picchu",
                "Peru",
                "South America",
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
                "This ancient Inca city sits high in the Andes Mountains, above the Sacred Valley.",
                -13.1631,
                -72.5450
            ),
            createDestination(
                "Great Wall of China",
                "China",
                "Asia",
                Arrays.asList(
                    "I am the longest wall in the world",
                    "I was built to protect against invasions",
                    "I am visible from space"
                ),
                Arrays.asList(
                    "The Great Wall is not a single continuous wall but a series of walls and fortifications",
                    "It took over 2,000 years to build the entire wall",
                    "The wall is made of various materials including stone, brick, tamped earth, and wood"
                ),
                "HARD",
                "https://example.com/great-wall.jpg",
                "The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials.",
                40.4319,
                116.5704
            ),
            createDestination(
                "Statue of Liberty",
                "United States",
                "North America",
                Arrays.asList(
                    "I was a gift from France to the United States",
                    "I stand on Liberty Island in New York Harbor",
                    "I hold a torch in my right hand and a tablet in my left"
                ),
                Arrays.asList(
                    "The statue was designed by French sculptor Frédéric Auguste Bartholdi",
                    "The statue's full name is 'Liberty Enlightening the World'",
                    "The seven spikes on the crown represent the seven continents"
                ),
                "MEDIUM",
                "https://example.com/liberty.jpg",
                "A colossal neoclassical sculpture on Liberty Island in New York Harbor.",
                40.6892,
                -74.0445
            )
        );

        destinationRepository.saveAll(destinations);
    }

    private Destination createDestination(
            String name,
            String country,
            String continent,
            List<String> clues,
            List<String> funFacts,
            String difficulty,
            String imageUrl,
            String description,
            Double latitude,
            Double longitude) {
        Destination destination = new Destination();
        destination.setName(name);
        destination.setCountry(country);
        destination.setContinent(continent);
        destination.setClues(clues);
        destination.setFunFacts(funFacts);
        destination.setDifficulty(difficulty);
        destination.setImageUrl(imageUrl);
        destination.setDescription(description);
        destination.setLatitude(latitude);
        destination.setLongitude(longitude);
        destination.setActive(true);
        return destination;
    }
} 