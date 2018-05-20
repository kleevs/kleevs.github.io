INSERT INTO person (first, last, age) VALUES ('bob', 'last', 34);
INSERT INTO person (first, last, age) VALUES ('john', 'doe', 33);
INSERT INTO person (first, last, age) VALUES ('chris', 'newman', 14);

INSERT INTO compte (personid, login, password, actif) VALUES (1, 'bob', '1234', 1);

INSERT INTO conversation (objet, createdBy) VALUES ('Bienvenue', 1);
INSERT INTO conversation (objet, createdBy) VALUES ('RDV', 3);

INSERT INTO participant (conversation, person) VALUES (1, 1);
INSERT INTO participant (conversation, person) VALUES (1, 2);
INSERT INTO participant (conversation, person) VALUES (2, 1);
INSERT INTO participant (conversation, person) VALUES (2, 3);

INSERT INTO inbox (writtenBy, conversation, message, date) VALUES (1, 1, 'hello, ca va ?', 1519293811692);
INSERT INTO inbox (writtenBy, conversation, message, date) VALUES (3, 2, 'Rendez-vous à quelle heure ?', 1519293811692);

INSERT INTO friend (person1, person2) VALUES (1, 2);
INSERT INTO friend (person1, person2) VALUES (1, 3);
INSERT INTO friend (person1, person2) VALUES (2, 1);