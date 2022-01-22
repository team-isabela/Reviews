const { Client } = require('pg');

const db = new Client({
  database: 'SDC',
  user: 'ubuntu',
  password: 'something',
  host: '',
  port: 5432,
});

module.exports = db;
