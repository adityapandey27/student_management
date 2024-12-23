-- create admin table
CREATE TABLE admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP DEFAULT NULL,
    INDEX(email)
);

-- insert value in admin
INSERT INTO admins (name, email, password, createdAt, updatedAt)
VALUES ('Aditya Pandey', 'aditya@gmail.com', '$2b$12$/7BDEUQCTWDi4dh4w7ozRexOFTFZcLcNqr.6A5Vhc0mgl.V6MCdky', NOW(), NOW());

--create student table
CREATE TABLE students (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE DEFAULT NULL,
    dob DATE NOT NULL,
    name VARCHAR(255) DEFAULT NULL,
    branch ENUM('CSE', 'IT', 'ME', 'CE', 'AE', 'BT', 'Other') DEFAULT 'CSE',
    semester ENUM('first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eighth') NOT NULL DEFAULT 'first',
    photo VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deletedAt TIMESTAMP DEFAULT NULL,
    INDEX(email)
);

