COPY characteristic_reviews
FROM '/Users/johnrazi/HackReactor/data/characteristic_reviews.csv'
DELIMITER ',' CSV Header;

COPY reviews
FROM '/Users/johnrazi/HackReactor/data/reviews.csv'
DELIMITER ',' CSV Header;

COPY characteristics
FROM '/Users/johnrazi/HackReactor/data/characteristics.csv'
DELIMITER ',' CSV Header;

COPY photos
FROM '/Users/johnrazi/HackReactor/data/reviews_photos.csv'
DELIMITER ',' CSV Header;

update Reviews set date = date/1000;
alter TABLE Reviews
alter column date type timestamp using to_timestamp(date);