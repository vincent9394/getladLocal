CREATE DATABASE getlad;

\c getlad;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    login_name VARCHAR(255),
    password VARCHAR(),
    isAdmin BOOL,
    created_at TIMESTAMP,
    last_login TIMESTAMP
);

CREATE TABLE event_types (
    id SERIAL PRIMARY KEY,
    type VARCHAR(255)
);

CREATE TABLE events (
    id SERIAL PRIMARY KEY,
    creator_id INTEGER,
    FOREIGN KEY (creator_id) REFERENCES users(id),
    description TEXT,
    date TIMESTAMP,
    location VARCHAR(255),
    topic VARCHAR(255),
    prerequisite INTEGER,
    event_type_id INTEGER,
    FOREIGN KEY (event_type_id) REFERENCES event_types (id),
    created_at TIMESTAMP,
    updated_at TIMESTAMP    
);

CREATE TABLE bookmark (
    id SERIAL PRIMARY KEY,
    event_id INTEGER,
    FOREIGN KEY (event_id) REFERENCES events(id),
    user_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE join_group (
    id SERIAL PRIMARY KEY,
    event_id INTEGER,
    FOREIGN KEY (event_id) REFERENCES events(id),
    participant_id INTEGER,
    FOREIGN KEY (participant_id) REFERENCES users(id)
);