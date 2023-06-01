const express = require('express');
const connection = require('./db');

const app = express();

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

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
