-- USERS
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- EVENTS
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    event_date DATETIME NOT NULL,
    location VARCHAR(255) NOT NULL,
    organizer_id INT,
    tickets_available INT DEFAULT 0,
    price DECIMAL(10,2) DEFAULT 0.00,
    FOREIGN KEY (organizer_id) REFERENCES users(id)
);

-- TICKETS
CREATE TABLE tickets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    event_id INT,
    user_id INT,
    quantity INT DEFAULT 1,
    status VARCHAR(20) DEFAULT 'pending',
    FOREIGN KEY (event_id) REFERENCES events(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- MEETUPS
CREATE TABLE meetups (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    meetup_date DATETIME NOT NULL,
    creator_id INT,
    FOREIGN KEY (creator_id) REFERENCES users(id)
);

-- EXPENSES
CREATE TABLE expenses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    meetup_id INT,
    description VARCHAR(255),
    amount DECIMAL(10,2),
    paid_by INT,
    FOREIGN KEY (meetup_id) REFERENCES meetups(id),
    FOREIGN KEY (paid_by) REFERENCES users(id)
);
