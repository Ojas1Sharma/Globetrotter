package com.globetrotter.repository;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.globetrotter.model.Destination;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class JsonDataStore {
    private static final String DATA_FILE = "data/destinations.json";
    private final ObjectMapper objectMapper;
    private final Random random;

    public JsonDataStore() {
        this.objectMapper = new ObjectMapper();
        this.random = new Random();
        initializeDataFile();
    }

    private void initializeDataFile() {
        File file = new File(DATA_FILE);
        if (!file.exists()) {
            try {
                file.getParentFile().mkdirs();
                objectMapper.writeValue(file, new ArrayList<Destination>());
            } catch (IOException e) {
                throw new RuntimeException("Failed to initialize data file", e);
            }
        }
    }

    public List<Destination> loadDestinations() {
        try {
            return objectMapper.readValue(new File(DATA_FILE), 
                objectMapper.getTypeFactory().constructCollectionType(List.class, Destination.class));
        } catch (IOException e) {
            throw new RuntimeException("Failed to load destinations", e);
        }
    }

    public void saveDestinations(List<Destination> destinations) {
        try {
            objectMapper.writeValue(new File(DATA_FILE), destinations);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save destinations", e);
        }
    }

    public Destination findRandomDestination() {
        List<Destination> destinations = loadDestinations();
        if (destinations.isEmpty()) {
            return null;
        }
        return destinations.get(random.nextInt(destinations.size()));
    }

    public List<Destination> findRandomDestinations(int count) {
        List<Destination> destinations = loadDestinations();
        if (destinations.isEmpty()) {
            return new ArrayList<>();
        }
        
        List<Destination> result = new ArrayList<>();
        List<Destination> temp = new ArrayList<>(destinations);
        
        for (int i = 0; i < Math.min(count, temp.size()); i++) {
            int index = random.nextInt(temp.size());
            result.add(temp.remove(index));
        }
        
        return result;
    }

    public List<Destination> findByContinent(String continent) {
        List<Destination> destinations = loadDestinations();
        return destinations.stream()
            .filter(d -> d.getContinent().equalsIgnoreCase(continent))
            .toList();
    }
} 