COPY characteristic_reviews
FROM '/home/ubuntu/data/characteristic_reviews.csv'
DELIMITER ',' CSV Header;

COPY reviews
FROM '/home/ubuntu/data/reviews.csv'
DELIMITER ',' CSV Header;

COPY characteristics
FROM '/home/ubuntu/data/characteristics.csv'
DELIMITER ',' CSV Header;

COPY photos
FROM '/home/ubuntu/data/reviews_photos.csv'
DELIMITER ',' CSV Header;

update Reviews set date = date/1000;
alter TABLE Reviews
alter column date type timestamp using to_timestamp(date);