CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        pass VARCHAR(255) NOT NULL,
        salt VARCHAR(255),
        session_token VARCHAR(255)
    );