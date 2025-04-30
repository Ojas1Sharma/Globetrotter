CREATE TABLE IF NOT EXISTS challenges (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    challenger_id BIGINT NOT NULL,
    invite_code VARCHAR(255) NOT NULL UNIQUE,
    challenger_score INT NOT NULL,
    challenger_correct_answers INT NOT NULL,
    challenger_incorrect_answers INT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (challenger_id) REFERENCES users(id)
); 