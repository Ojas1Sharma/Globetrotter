# Globetrotter - The Ultimate Travel Guessing Game

A full-stack web application where users get cryptic clues about famous places and must guess which destination it refers to. Built with Spring Boot, React, and MySQL.

## Features

- 🌍 Guess famous destinations from cryptic clues
- 🎮 Multiple choice answers for each destination
- 🎯 Score tracking and game statistics
- 🤝 Challenge friends with unique invite links
- 🎉 Animated feedback and fun facts
- 📱 Responsive design for all devices

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.3
- Spring Security
- Spring Data JPA
- MySQL Database
- Swagger/OpenAPI Documentation

### Frontend (To be implemented)
- React with TypeScript
- Tailwind CSS
- React Router
- Axios for API calls
- React Query for state management

## Getting Started

### Prerequisites
- Java 17 or higher
- MySQL 8.0 or higher
- Maven
- Node.js and npm (for frontend)

### Database Setup
1. Create a MySQL database named `globetrotter`
2. Update database credentials in `application.properties` if needed

### Backend Setup
1. Clone the repository
2. Navigate to the project directory
3. Run the following commands:
```bash
mvn clean install
mvn spring-boot:run
```

The backend server will start at `http://localhost:8080`

### API Documentation
Once the application is running, you can access the Swagger UI at:
- `http://localhost:8080/swagger-ui.html`

## API Endpoints

### User Management
- POST `/api/users/register` - Register a new user
- GET `/api/users/{username}` - Get user details
- GET `/api/users/check-username` - Check username availability

### Game Management
- POST `/api/game/start` - Start a new game
- POST `/api/game/submit` - Submit an answer
- GET `/api/game/invite/{inviteCode}` - Get game by invite code
- POST `/api/game/invite` - Generate invite link
- GET `/api/game/{sessionId}` - Get game question

## Database Schema

### Users Table
- id (Long, PK)
- username (String, Unique)
- totalScore (Integer)
- correctAnswers (Integer)
- incorrectAnswers (Integer)
- gamesPlayed (Integer)
- inviteCode (String)
- active (Boolean)

### Destinations Table
- id (Long, PK)
- name (String)
- country (String)
- clues (List<String>)
- funFacts (List<String>)
- description (String)
- imageUrl (String)
- difficulty (String)
- active (Boolean)

### Game Sessions Table
- id (Long, PK)
- user_id (Long, FK)
- destination_id (Long, FK)
- startTime (DateTime)
- endTime (DateTime)
- correct (Boolean)
- completed (Boolean)
- inviteCode (String)

## Contributing
Feel free to submit issues and enhancement requests!

## API Documentation

### Authentication

All API endpoints (except registration) require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### Game Endpoints

#### Start a New Game
```bash
curl --location 'http://localhost:8080/api/game/start' \
--header 'Authorization: Bearer <your_jwt_token>'
```

Response:
```json
{
    "sessionId": 1,
    "clues": [
        "I am an iron lady standing tall in a city of love.",
        "Built in 1889, I was once the world's tallest structure.",
        "My nighttime sparkle is protected by copyright law."
    ],
    "options": [
        {
            "id": 1,
            "name": "Eiffel Tower",
            "country": "France"
        },
        {
            "id": 2,
            "name": "Taj Mahal",
            "country": "India"
        },
        {
            "id": 3,
            "name": "Great Wall of China",
            "country": "China"
        },
        {
            "id": 4,
            "name": "Statue of Liberty",
            "country": "United States"
        }
    ],
    "difficulty": "MEDIUM"
}
```

#### Submit Answer
```bash
curl --location 'http://localhost:8080/api/game/1/submit' \
--header 'Authorization: Bearer <your_jwt_token>' \
--header 'Content-Type: application/json' \
--data '{
    "destinationId": 1
}'
```

Response:
```json
{
    "correct": true,
    "funFacts": [
        "The tower was originally intended to be a temporary structure.",
        "It takes 60 tons of paint to protect the tower from rust.",
        "The tower grows up to 6 inches taller in summer due to thermal expansion."
    ],
    "destinationName": "Eiffel Tower",
    "destinationCountry": "France",
    "imageUrl": "https://example.com/eiffel.jpg",
    "userScore": 10,
    "totalGamesPlayed": 1,
    "description": "This iconic wrought-iron lattice tower is located on the Champ de Mars in Paris."
}
```

#### Get Game Question
```bash
curl --location 'http://localhost:8080/api/game/1' \
--header 'Authorization: Bearer <your_jwt_token>'
```

Response: Same as start game response

### User Endpoints

#### Register User
```bash
curl --location 'http://localhost:8080/api/users/register' \
--header 'Content-Type: application/json' \
--data '{
    "username": "john",
    "email": "john@example.com"
}'
```

Response:
```json
{
    "id": 1,
    "username": "john",
    "email": "john@example.com",
    "totalScore": 0,
    "gamesPlayed": 0,
    "correctAnswers": 0,
    "incorrectAnswers": 0
}
```

#### Get User Details
```bash
curl --location 'http://localhost:8080/api/users/john' \
--header 'Authorization: Bearer <your_jwt_token>'
```

Response: Same as registration response

## Game Rules

1. Each game presents a random destination with multiple clues
2. Players must guess the correct destination from 4 options
3. Points are awarded for correct answers
4. The game tracks user statistics including:
   - Total score
   - Games played
   - Correct/incorrect answers

## Setup

1. Clone the repository
2. Configure database in `application.properties`
3. Run the application
4. The database will be automatically initialized with sample destinations

## Technologies Used

- Spring Boot
- Spring Security
- JWT Authentication
- MySQL
- Flyway (Database Migrations)
- Lombok 