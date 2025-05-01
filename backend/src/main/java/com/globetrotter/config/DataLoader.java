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
            ),
            createDestination(
                "Petra",
                "Jordan",
                "Asia",
                Arrays.asList(
                    "I am a city carved entirely from rose-red rock.",
                    "My most famous structure is a temple with a Greek-style facade.",
                    "I was lost to the Western world for centuries until 1812."
                ),
                Arrays.asList(
                    "Petra was the capital of the Nabataean Kingdom.",
                    "The city's water system was so advanced it could support 30,000 people.",
                    "The Treasury building was used as a set in Indiana Jones and the Last Crusade."
                ),
                "HARD",
                "https://example.com/petra.jpg",
                "An ancient city carved into red sandstone cliffs in southern Jordan.",
                30.3285,
                35.4444
            ),
            createDestination(
                "Christ the Redeemer",
                "Brazil",
                "South America",
                Arrays.asList(
                    "I am one of the New Seven Wonders of the World.",
                    "I stand 98 feet tall on a mountain overlooking a famous city.",
                    "My arms stretch 92 feet wide, welcoming visitors."
                ),
                Arrays.asList(
                    "The statue was built in pieces in France and shipped to Brazil.",
                    "It's struck by lightning about 4 times per year.",
                    "The original design included Jesus holding a globe."
                ),
                "MEDIUM",
                "https://example.com/redeemer.jpg",
                "A massive Art Deco statue of Jesus Christ in Rio de Janeiro.",
                -22.9519,
                -43.2105
            ),
            createDestination(
                "Angkor Wat",
                "Cambodia",
                "Asia",
                Arrays.asList(
                    "I am the largest religious monument in the world.",
                    "My design represents Mount Meru, home of the Hindu gods.",
                    "I face west, which is unusual for a temple of my time."
                ),
                Arrays.asList(
                    "The temple was originally Hindu but later became Buddhist.",
                    "It took an estimated 300,000 workers to build.",
                    "The complex is so large it can be seen from space."
                ),
                "HARD",
                "https://example.com/angkor.jpg",
                "A massive temple complex in Cambodia, originally built as a Hindu temple.",
                13.4125,
                103.8667
            ),
            createDestination(
                "Santorini",
                "Greece",
                "Europe",
                Arrays.asList(
                    "I am a crescent-shaped island formed by a massive volcanic eruption.",
                    "My white-washed buildings with blue domes are world-famous.",
                    "I am said to be the inspiration for the lost city of Atlantis."
                ),
                Arrays.asList(
                    "The island's caldera is one of the largest in the world.",
                    "The 1967 BC eruption was one of the largest in human history.",
                    "The island's unique architecture helps keep buildings cool in summer."
                ),
                "MEDIUM",
                "https://example.com/santorini.jpg",
                "A volcanic island in the Aegean Sea, known for its stunning sunsets and architecture.",
                36.3932,
                25.4615
            ),
            createDestination(
                "Victoria Falls",
                "Zambia/Zimbabwe",
                "Africa",
                Arrays.asList(
                    "I am known as 'The Smoke That Thunders'.",
                    "I am twice the height of Niagara Falls.",
                    "My mist can be seen from 30 miles away."
                ),
                Arrays.asList(
                    "The falls are 1.7 kilometers wide and 108 meters high.",
                    "The spray from the falls creates a rainforest ecosystem.",
                    "David Livingstone was the first European to see the falls in 1855."
                ),
                "MEDIUM",
                "https://example.com/victoria-falls.jpg",
                "The largest waterfall in the world, located on the Zambezi River.",
                -17.9243,
                25.8572
            ),
            createDestination(
                "Venice",
                "Italy",
                "Europe",
                Arrays.asList(
                    "I am a city built on 118 small islands connected by canals.",
                    "My main transportation is by boat, not car.",
                    "I am slowly sinking into the sea."
                ),
                Arrays.asList(
                    "Venice has over 400 bridges and 150 canals.",
                    "The city's foundation is made of wooden piles driven into the mud.",
                    "The first public opera house opened in Venice in 1637."
                ),
                "EASY",
                "https://example.com/venice.jpg",
                "A city in northeastern Italy built on a group of 118 small islands.",
                45.4408,
                12.3155
            ),
            createDestination(
                "Great Barrier Reef",
                "Australia",
                "Oceania",
                Arrays.asList(
                    "I am the world's largest coral reef system.",
                    "I am visible from outer space.",
                    "I am home to thousands of marine species."
                ),
                Arrays.asList(
                    "The reef is made up of over 2,900 individual reefs.",
                    "It's the only living thing on Earth visible from space.",
                    "The reef is older than the Amazon rainforest."
                ),
                "HARD",
                "https://example.com/barrier-reef.jpg",
                "The world's largest coral reef system, located off the coast of Australia.",
                -18.2871,
                147.6992
            ),
            createDestination(
                "Mount Everest",
                "Nepal/China",
                "Asia",
                Arrays.asList(
                    "I am the highest point on Earth above sea level.",
                    "I grow about 4mm taller every year.",
                    "I am known as 'Sagarmatha' in Nepal and 'Chomolungma' in Tibet."
                ),
                Arrays.asList(
                    "The mountain is still growing due to tectonic plate movement.",
                    "Over 300 people have died attempting to climb it.",
                    "The first successful summit was in 1953 by Edmund Hillary and Tenzing Norgay."
                ),
                "HARD",
                "https://example.com/everest.jpg",
                "The Earth's highest mountain above sea level, located in the Mahalangur Himal sub-range.",
                27.9881,
                86.9250
            ),
            createDestination(
                "Sahara Desert",
                "Multiple Countries",
                "Africa",
                Arrays.asList(
                    "I am the largest hot desert in the world.",
                    "I cover about 31% of the African continent.",
                    "I am home to the world's largest sand dunes."
                ),
                Arrays.asList(
                    "The desert is expanding southward by about 30 miles per year.",
                    "Some sand dunes can reach heights of 590 feet.",
                    "The desert was once a lush grassland with lakes and rivers."
                ),
                "MEDIUM",
                "https://example.com/sahara.jpg",
                "The world's largest hot desert, covering most of North Africa.",
                23.8067,
                11.2887
            ),
            createDestination(
                "Yellowstone National Park",
                "United States",
                "North America",
                Arrays.asList(
                    "I am home to the world's largest active geyser.",
                    "I sit atop a supervolcano.",
                    "I was the first national park in the world."
                ),
                Arrays.asList(
                    "The park contains about half of the world's geysers.",
                    "Yellowstone's supervolcano last erupted 640,000 years ago.",
                    "The park is larger than the states of Rhode Island and Delaware combined."
                ),
                "MEDIUM",
                "https://example.com/yellowstone.jpg",
                "America's first national park, known for its geothermal features and wildlife.",
                44.4280,
                -110.5885
            ),
            createDestination(
                "Kyoto",
                "Japan",
                "Asia",
                Arrays.asList(
                    "I was Japan's capital for over 1,000 years.",
                    "I am home to over 1,600 Buddhist temples.",
                    "My traditional wooden townhouses are called 'machiya'."
                ),
                Arrays.asList(
                    "Kyoto has 17 UNESCO World Heritage sites.",
                    "The city was spared from bombing during World War II.",
                    "The first geisha appeared in Kyoto in the 18th century."
                ),
                "MEDIUM",
                "https://example.com/kyoto.jpg",
                "A city in Japan known for its numerous classical Buddhist temples and gardens.",
                35.0116,
                135.7681
            ),
            createDestination(
                "Amazon Rainforest",
                "Brazil",
                "South America",
                Arrays.asList(
                    "I am the largest rainforest in the world.",
                    "I produce 20% of the world's oxygen.",
                    "I am home to the world's largest river by volume."
                ),
                Arrays.asList(
                    "The forest is home to 390 billion individual trees.",
                    "New species are discovered every two days on average.",
                    "The Amazon River flows at a rate of 209,000 cubic meters per second."
                ),
                "HARD",
                "https://example.com/amazon.jpg",
                "The world's largest tropical rainforest, spanning nine countries.",
                -3.4653,
                -62.2159
            ),
            createDestination(
                "Dubai",
                "United Arab Emirates",
                "Asia",
                Arrays.asList(
                    "I am home to the world's tallest building.",
                    "I have the world's largest shopping mall.",
                    "I am building the world's largest airport."
                ),
                Arrays.asList(
                    "Dubai's Burj Khalifa is 828 meters tall.",
                    "The city has the world's largest indoor ski slope.",
                    "Dubai's artificial islands are visible from space."
                ),
                "EASY",
                "https://example.com/dubai.jpg",
                "A city in the United Arab Emirates known for luxury shopping and ultramodern architecture.",
                25.2048,
                55.2708
            ),
            createDestination(
                "Antarctica",
                "Antarctica",
                "Antarctica",
                Arrays.asList(
                    "I am the coldest, driest, and windiest continent.",
                    "I contain 90% of the world's ice.",
                    "I have no permanent human residents."
                ),
                Arrays.asList(
                    "Antarctica is the only continent without a time zone.",
                    "The continent has the world's largest desert.",
                    "The lowest temperature ever recorded was -128.6°F in Antarctica."
                ),
                "HARD",
                "https://example.com/antarctica.jpg",
                "Earth's southernmost continent, covered by a permanent ice sheet.",
                -82.8628,
                135.0000
            ),
            createDestination(
                "Maldives",
                "Maldives",
                "Asia",
                Arrays.asList(
                    "I am the lowest-lying country in the world.",
                    "I am made up of 1,192 coral islands.",
                    "I am known for my overwater bungalows."
                ),
                Arrays.asList(
                    "The Maldives is the world's most dispersed country.",
                    "The islands are formed from coral reefs on top of underwater volcanoes.",
                    "The country is at risk of being completely underwater by 2100."
                ),
                "MEDIUM",
                "https://example.com/maldives.jpg",
                "A tropical nation in the Indian Ocean composed of 26 ring-shaped atolls.",
                3.2028,
                73.2207
            ),
            createDestination(
                "Iceland",
                "Iceland",
                "Europe",
                Arrays.asList(
                    "I am known as the Land of Fire and Ice.",
                    "I have more than 130 active volcanoes.",
                    "I am home to the world's oldest parliament."
                ),
                Arrays.asList(
                    "Iceland has no mosquitoes.",
                    "The country runs almost entirely on renewable energy.",
                    "Icelanders believe in elves and have special roads built to avoid their homes."
                ),
                "MEDIUM",
                "https://example.com/iceland.jpg",
                "A Nordic island country in the North Atlantic Ocean.",
                64.9631,
                -19.0208
            ),
            createDestination(
                "Marrakech",
                "Morocco",
                "Africa",
                Arrays.asList(
                    "I am known as the Red City.",
                    "My main square is the busiest in Africa.",
                    "I am home to the world's largest traditional market."
                ),
                Arrays.asList(
                    "The city's medina is a UNESCO World Heritage site.",
                    "Marrakech has the world's largest traditional market (souk).",
                    "The city's red walls are made from local clay and lime."
                ),
                "MEDIUM",
                "https://example.com/marrakech.jpg",
                "A major city in Morocco known for its medieval architecture and vibrant markets.",
                31.6295,
                -7.9811
            ),
            createDestination(
                "Bali",
                "Indonesia",
                "Asia",
                Arrays.asList(
                    "I am known as the Island of the Gods.",
                    "I have over 20,000 temples.",
                    "I am home to the world's most expensive coffee."
                ),
                Arrays.asList(
                    "Bali has a unique calendar system with 210 days per year.",
                    "The island has its own form of Hinduism.",
                    "Bali's rice terraces are a UNESCO World Heritage site."
                ),
                "MEDIUM",
                "https://example.com/bali.jpg",
                "An Indonesian island known for its forested volcanic mountains and rice paddies.",
                -8.3405,
                115.0920
            ),
            createDestination(
                "New Zealand",
                "New Zealand",
                "Oceania",
                Arrays.asList(
                    "I am the first country to see the sunrise each day.",
                    "I have more sheep than people.",
                    "I was the last major landmass to be settled by humans."
                ),
                Arrays.asList(
                    "New Zealand has no native land mammals except bats.",
                    "The country has the world's only flightless parrot.",
                    "New Zealand was the first country to give women the right to vote."
                ),
                "MEDIUM",
                "https://example.com/newzealand.jpg",
                "An island country in the southwestern Pacific Ocean.",
                -40.9006,
                174.8860
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