-- Active: 1722343119220@@127.0.0.1@3306@work_diary
CREATE TABLE user (
  id VARCHAR(155) PRIMARY KEY NOT NULL,
  name VARCHAR(155) NOT NULL,
  email VARCHAR(155) not NULL,
  password VARCHAR(255) not NULL
);

CREATE TABLE task (
  id int unsigned PRIMARY KEY AUTO_INCREMENT NOT NULL,
  task VARCHAR(255) not NULL,
  client VARCHAR(255) not NULL,
  description VARCHAR(855),
  short_term VARCHAR(255),
  estimated_day DECIMAL(4, 1) NOT NULL,
  deadline DATE NOT NULL
);

INSERT INTO user (id, name, email, password)
VALUES("lolilol", "Laurent LE Fou", "lololeciboulot@wanadoux.rf", "31.03"),
("beast","Cyriac", "cyriac@fake.com", "fake");

INSERT INTO task (task, client, description, short_term, estimated_day, deadline)
VALUES ("Diagnostic de site", "GAEC Les capucines", NULL ,"Devis", 1.5, '2024/10/24'),
("PC", "CONDEVAUX Loïc", "A prévoir avec Paola", "Retrouver coordonnées client", 1.5, '2024/12/31');