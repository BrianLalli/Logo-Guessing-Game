const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'logo_game_db'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database');
    return;
  }
  console.log('Connected to the database');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files
app.use(express.static('public'));

// API Routes
app.get('/api/logos', (req, res) => {
  connection.query('SELECT * FROM logos', (err, results) => {
    if (err) {
      console.error('Error fetching logos:', err);
      res.status(500).json({ error: 'Failed to fetch logos' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/scores', (req, res) => {
  const { score } = req.body;
  connection.query('INSERT INTO scores (score) VALUES (?)', [score], (err, result) => {
    if (err) {
      console.error('Error saving score:', err);
      res.status(500).json({ error: 'Failed to save score' });
      return;
    }
    res.sendStatus(200);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
