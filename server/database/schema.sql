-- Active: 1722343119220@@127.0.0.1@3306@work_diary
CREATE TABLE user (
  id VARCHAR(155) PRIMARY KEY NOT NULL,
  name VARCHAR(155) NOT NULL,
  email VARCHAR(155) not NULL,
  password VARCHAR(255) not NULL
);

CREATE TABLE task (
 id VARCHAR(155) PRIMARY KEY NOT NULL,
  task VARCHAR(255) not NULL,
  client VARCHAR(255) not NULL,
  estimation VARCHAR(55) NOT NULL,
  description VARCHAR(855),
  short_term VARCHAR(255),
  estimated_day DECIMAL(4, 1) NOT NULL,
  deadline DATE NOT NULL,
  user_id VARCHAR(55) not NULL
);

INSERT INTO user (id, name, email, password)
VALUES('f9b6b242-235a-4c8d-9700-72264dce24aa',"Cyriac", "cyriac@fake.com", "$argon2id$v=19$m=19456,t=2,p=1$bq30KlpiMDDA0w8v9zrWSQ$C1qsiru2nm+Ww0ZPFku/oNC1uFxLkzBeoxIBtLPm7wM");
-- Milo44@bg

INSERT INTO task (id, task, client, estimation, description, short_term, estimated_day, deadline, user_id)
VALUES ("f9b6b242-235a-4c8d-9700-72264","Diagnostic de site", "GAEC Les capucines", "to_do" , NULL ,"Devis", 1.5, '2024/10/24',"f9b6b242-235a-4c8d-9700-72264dce24aa"),
("f9b6b242-235a-4c8d-970012-722642","PC", "CONDEVAUX Loïc", "send" ,"A prévoir avec Paola", "Retrouver coordonnées client", 1.5, '2024/12/31',"f9b6b242-235a-4c8d-9700-72264dce24aa");