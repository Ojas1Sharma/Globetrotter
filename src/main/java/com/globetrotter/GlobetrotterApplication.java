package com.globetrotter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;

@SpringBootApplication
@OpenAPIDefinition(
    info = @Info(
        title = "Globetrotter API",
        version = "1.0",
        description = "API endpoints for the Globetrotter travel guessing game"
    )
)
public class GlobetrotterApplication {
    public static void main(String[] args) {
        SpringApplication.run(GlobetrotterApplication.class, args);
    }
} 


