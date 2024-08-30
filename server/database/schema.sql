CREATE TABLE clients (
  id int unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(155) not NULL,
  password VARCHAR(255) not NULL,
  name VARCHAR(155) NOT NULL
);

INSERT INTO clients (email, password, name)
VALUES("lololeciboulot@wanadoux.rf", "31.03", "Laurent LE Fou");