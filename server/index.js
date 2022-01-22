const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
const API = require('../config.js');

const db = require('../database/index.js');
const exp = require('constants');

const cache = {};
const meta = {};

const headers = {
  Authorization: API.TOKEN,
  'Content-Type': 'application/json',
};

db.connect();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}`);
});

app.get(/meta/, (req, res) => {
  if (meta[req.query.product_id]) {
    res.send(meta[req.query.product_id]);
  } else {
    const query = `SELECT
    TO_CHAR(R.product_id, 'FM9999999') product_id,
    json_build_object(
    '1', TO_CHAR(COUNT(R.rating) FILTER (Where R.rating=1), 'FM99999'),
    '2', TO_CHAR(COUNT(R.rating) FILTER (Where R.rating=2), 'FM99999'),
    '3', TO_CHAR(COUNT(R.rating) FILTER (Where R.rating=3), 'FM99999'),
    '4', TO_CHAR(COUNT(R.rating) FILTER (Where R.rating=4), 'FM99999'),
    '5', TO_CHAR(COUNT(R.rating) FILTER (Where R.rating=5), 'FM99999')
    ) ratings,
    json_build_object(
      'false', TO_CHAR(COUNT(R.recommend) FILTER (Where R.recommend=false), 'FM99999'),
      'true', TO_CHAR(COUNT(R.recommend) FILTER (Where R.recommend=true), 'FM99999')
    ) recommended,
    json_build_object(
      C.name, json_build_object(
        'id', Crev.characteristic_id,
        'value', AVG(Crev.value)
      )
    ) characteristics
    FROM Reviews R
    JOIN Characteristic_Reviews Crev
    ON R.review_id = Crev.review_id
    JOIN Characteristics C
    ON R.product_id = C.product_id
    WHERE R.product_id=${req.query.product_id} GROUP BY R.product_id, C.name, Crev.characteristic_id;`;
    db.query(query, (err, data) => {
      if (err) {
        console.error(err);
        return;
      } else {
        meta[req.query.product_id] = data.rows[0];
        res.send(data.rows[0]);
      }
    });
  }
});

app.get(/reviews/, (req, res) => {
  if (cache[req.query.product_id]) {
    res.send(cache[req.query.product_id]);
  } else {
    const query = `SELECT
  R.review_id review_id,
  R.rating,
  R.summary,
  R.recommend,
  R.response,
  R.body,
  R.date,
  R.reviewer_name,
  R.helpfulness,
  json_agg(
    CASE WHEN Photos.photo_id IS NOT NULL THEN
    json_build_object(
      'id', Photos.photo_id,
      'url', Photos.url
    )
    END
  ) photos
   FROM Reviews R
   LEFT JOIN
   Photos ON
   R.review_id = Photos.review_id
   WHERE product_id=${req.query.product_id}
   GROUP BY R.review_id
   ORDER BY R.review_id;`;
    db.query(query, (err, data) => {
      if (err) {
        console.error(err);
        return;
      } else {
        for (let i in data.rows) {
          if (data.rows[i].photos[0] === null) {
            data.rows[i].photos = [];
          }
        }
        cache[req.query.product_id] = {
          product: req.query.product_id,
          page: 0,
          count: 5,
          results: data.rows,
        };
        res.status(200).send({
          product: req.query.product_id,
          page: 0,
          count: 5,
          results: data.rows,
        });
      }
    });
  }
});
