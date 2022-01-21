const { Client } = require('pg');

const db = new Client({
  database: 'SDC',
});

module.exports = db;
