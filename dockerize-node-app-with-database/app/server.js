const express = require('express');
const mysql = require('mysql');

const app = express();
const PORT = process.env.NODE_DOCKER_PORT;

// Create a connection to the MySQL database
const retryTimeout = 5000;  // Retry every 5 seconds
let db;

function connectToDatabase() {
  db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_ROOT_PASSWORD,
    database: process.env.MYSQLDB_DATABASE
  });

  db.connect((err) => {
    if (err) {
      console.error('Error connecting to the database, retrying in 5 seconds...', err.message);
      //setTimeout(connectToDatabase, retryTimeout);
    } else {
      console.log('Connected to the MySQL database!');
    }
  });
}

// Attempt to connect initially
connectToDatabase();

// API endpoint
app.get('/', (req, res) => {
  res.send('Hello, Node.js with MySQL!');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
