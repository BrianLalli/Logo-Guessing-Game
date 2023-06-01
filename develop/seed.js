const connection = require('./db');

const logos = [
  { name: 'McDonalds', image_path: './assets/images/McDonalds.png' },
  { name: 'Apple', image_path: './assets/images/Apple.png' },
  // Add more logo data as needed
];

connection.query('INSERT INTO logos (name, image_path) VALUES ?', [logos.map(logo => [logo.name, logo.image_path])], (err, result) => {
  if (err) {
    console.error('Error seeding logo data:', err);
    return;
  }
  console.log('Logo data seeded successfully!');
  connection.end();
});
