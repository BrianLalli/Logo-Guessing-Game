const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3307;

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'ProRight50!',
    database: 'logo_game_db',
    authPlugin: 'mysql_native_password'
  });
  

// Attempt to connect to the database
connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database:', error);
      return;
    }
    console.log('Connected to the database!');
  });
  
  // Handle connection errors
  connection.on('error', (error) => {
    console.error('Database error:', error);
  });
  
  // Close the database connection on server shutdown
  process.on('SIGINT', () => {
    connection.end();
    process.exit();
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
