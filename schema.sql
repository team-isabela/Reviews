--Postgres Schema

CREATE TABLE Reviews (
 review_id BIGSERIAL NOT NULL AUTOINCREMENT,
 product_id INTEGER,
 rating INTEGER,
 date BIGINT,
 summary VARCHAR(500),
 body VARCHAR(3000),
 recommend BOOLEAN NOT NULL DEFAULT 'false',
 reported BOOLEAN DEFAULT 'false',
 reviewer_name VARCHAR(255),
 reviewer_email VARCHAR(255),
 response VARCHAR(3000),
 helpfulness INTEGER DEFAULT 0
);

CREATE INDEX pro_id ON Reviews (product_id);
ALTER TABLE Reviews ADD CONSTRAINT Reviews_pkey PRIMARY KEY (review_id);

CREATE TABLE Photos (
 photo_id BIGSERIAL NOT NULL AUTOINCREMENT,
 review_id INTEGER,
 url VARCHAR(1000)
);

CREATE INDEX rev_id ON Photos (review_id);
ALTER TABLE Photos ADD CONSTRAINT Photos_pkey PRIMARY KEY (photo_id);

CREATE TABLE Characteristic_Reviews (
 char_rev_id BIGSERIAL NOT NULL AUTOINCREMENT,
 characteristic_id INTEGER,
 review_id INTEGER,
 value INTEGER
);

CREATE INDEX char_rev_id ON Characteristic_Reviews (review_id);
ALTER TABLE Characteristic_Reviews ADD CONSTRAINT Characteristic_Reviews_pkey PRIMARY KEY (char_rev_id);

CREATE TABLE Characteristics (
 char_id BIGSERIAL NOT NULL AUTOINCREMENT,
 product_id INTEGER,
 name VARCHAR(30)
);

CREATE INDEX char_pro_id ON Characteristics (product_id);
ALTER TABLE Characteristics ADD CONSTRAINT Characteristics_pkey PRIMARY KEY (char_id);


