CREATE TABLE game_sessions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    current_destination_id BIGINT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    score INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    started_at TIMESTAMP,
    ended_at TIMESTAMP,
    invite_code VARCHAR(255) UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (current_destination_id) REFERENCES destinations(id)
); 