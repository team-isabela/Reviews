const { Client } = require('pg');

const db = new Client({
  database: 'SDC',
  user: 'ubuntu',
  password: 'something',
  host: 'ec2-3-80-117-127.compute-1.amazonaws.com',
  port: 5432,
});

module.exports = db;
