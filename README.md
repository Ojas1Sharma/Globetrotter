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