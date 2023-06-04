const express = require('express');
const cors = require('cors');
const connection = require('./db');

const app = express();

app.use(cors()); // Enable CORS for all routes

app.get('/logos', (req, res) => {
  connection.query('SELECT * FROM logos', (err, result) => {
    if (err) {
      console.error('Error fetching logos:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json(result);
  });
});

app.listen(3307, () => {
  console.log('Server is running on http://localhost:3307');
});
