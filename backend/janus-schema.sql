CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName TEXT NOT NULL
    lastName TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    isTeacher BOOLEAN DEFAULT FALSE
)

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    user_id INT REFERENCES users ON DELETE CASCADE
)