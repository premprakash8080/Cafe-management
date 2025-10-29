CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    contactNumber VARCHAR(250),
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    status VARCHAR(20) DEFAULT 'false',
    role VARCHAR(20) DEFAULT 'user'
);

INSERT INTO user (name, contactNumber, email, password, status, role)
VALUES ('Admin', '1234567890', 'cafe@gmail.com', 'admin', 'true', 'admin');

create table category(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    primary key(id)
);

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    categoryId INT NOT NULL,
    description VARCHAR(255),
    price INT,
    status VARCHAR(20),
    PRIMARY KEY (id),
    FOREIGN KEY (categoryId) REFERENCES category(id)
);
