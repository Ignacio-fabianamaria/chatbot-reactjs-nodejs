DROP DATABASE IF EXISTS chatbotDB;

CREATE DATABASE chatbotDB;

USE chatbotDB;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE conversations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  conversation_file LONGBLOB NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO users (username, password) VALUES
  ('user1', '$2b$10$tFehfkIC/l.ZJy38ZKGOvOhjXykPlMIP90FrYonm539Mxgh3mDTiy'),
  ('user2', '$2b$10$MygSGEs9BYgAp5bu3r10RO2XgU8cZUZQJkSz/h3glgAQN2C11Kbpu'),
  ('user3', '$2b$10$WsADEdE3TUo2YlcyxxS2F.bSkZzG8IIPrMaEBQl66G.virLPHmPPe');
