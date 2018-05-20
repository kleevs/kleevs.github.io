CREATE TABLE person (id INTEGER PRIMARY KEY, first text, last text, age integer);
CREATE TABLE compte (id INTEGER PRIMARY KEY, personid integer, login text, password text, actif integer);
CREATE TABLE inbox (id INTEGER PRIMARY KEY, writtenBy integer, conversation integer, message text, date integer);
CREATE TABLE conversation (id INTEGER PRIMARY KEY, objet integer, createdBy integer);
CREATE TABLE participant (id INTEGER PRIMARY KEY, conversation integer, person integer);
CREATE TABLE friend (id INTEGER PRIMARY KEY, person1 integer, person2 integer);