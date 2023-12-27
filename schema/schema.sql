CREATE DATABASE IF NOT EXISTS try_express;

USE try_express;

CREATE TABLE roles (
  id int(11) NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
email varchar(255) NOT NULL UNIQUE,
  role_id int(11) NOT NULL,
  token varchar(255) DEFAULT NULL,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY role_id (role_id),
  CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (id)
);

CREATE TABLE books (
  id int(11) NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  author varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  image varchar(255) NOT NULL,
  created_at datetime NOT NULL,
  updated_at datetime NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO roles (name) VALUES ('admin'),('user');
INSERT INTO users (username, password, email, role_id) VALUES ('admin', 'admin', 'admin@email.com', 1);
INSERT INTO users (username, password, email, role_id) VALUES ('user', 'user', 'user@email.com', 2);
INSERT INTO books (title, author, description, image, created_at, updated_at) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.', 'https://images-na.ssl-images-amazon.com/images/I/51UWbWqGQlL._SX331_BO1,204,203,200_.jpg', '2019-01-01 00:00:00', '2019-01-01 00:00:00');
INSERT INTO books (title, author, description, image, created_at, updated_at) VALUES ('The Catcher in the Rye', 'J. D. Salinger', 'The Catcher in the Rye is a story by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.', 'https://images-na.ssl-images-amazon.com/images/I/51ZQ7YjGQNL._SX322_BO1,204,203,200_.jpg', '2019-01-01 00:00:00', '2019-01-01 00:00:00');
INSERT INTO books (title, author, description, image, created_at, updated_at) VALUES ('To Kill a Mockingbird', 'Harper Lee', 'To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature.', 'https://images-na.ssl-images-amazon.com/images/I/51f7Zm7xYCL._SX322_BO1,204,203,200_.jpg', '2019-01-01 00:00:00', '2019-01-01 00:00:00');
INSERT INTO books (title, author, description, image, created_at, updated_at) VALUES ('The Grapes of Wrath', 'John Steinbeck', 'The Grapes of Wrath is an American realist novel written by John Steinbeck and published in 1939. The book won the National Book Award and Pulitzer Prize for fiction, and it was cited prominently when Steinbeck was awarded the Nobel Prize in 1962.', 'https://images-na.ssl-images-amazon.com/images/I/51ZQ7YjGQNL._SX322_BO1,204,203,200_.jpg', '2019-01-01 00:00:00', '2019-01-01 00:00:00');
INSERT INTO books (title, author, description, image, created_at, updated_at) VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'The Great Gatsby is a 1925 novel written by American author F. Scott Fitzgerald that follows a cast of characters living in the fictional towns of West Egg and East Egg on prosperous Long Island in the summer of 1922.', 'https://images-na.ssl-images-amazon.com/images/I/51UWbWqGQlL._SX331_BO1,204,203,200_.jpg', '2019-01-01 00:00:00', '2019-01-01 00:00:00');
INSERT INTO books (title, author, description, image, created_at, updated_at) VALUES ('The Catcher in the Rye', 'J. D. Salinger', 'The Catcher in the Rye is a story by J. D. Salinger, partially published in serial form in 1945–1946 and as a novel in 1951.', 'https://images-na.ssl-images-amazon.com/images/I/51ZQ7YjGQNL._SX322_BO1,204,203,200_.jpg', '2019-01-01 00:00:00', '2019-01-01 00:00:00');

-- update column command for users to change email to unique
ALTER TABLE users MODIFY COLUMN email varchar(255) NOT NULL UNIQUE;