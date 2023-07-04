const express = require('express');
// const AWS = require('aws-sdk');
const fetch = require("node-fetch")
const app = express();
const port = 3000;
var axios = require('axios');

app.get('/', (req, res) => {
  var config = {
    method: 'get',
    url: 'https://oogl.s3.amazonaws.com/images/Accenture.png',
    headers: { }
  };
  
  axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
})


// // Configure AWS SDK with your credentials
// AWS.config.update({
//   accessKeyId: 'AKIA4VNGJFDZ2D2FFYYK',
//   secretAccessKey: 'mIsP+7F4eZNaODXIvbLS/9vo3RLsUjZpppDcX0La'
// });

// // Create an instance of the S3 service
// const s3 = new AWS.S3();

// // Define a route to retrieve an image from the S3 bucket
// app.get('s3://oogl/images/', (req, res) => {
//   const { key } = req.params;

//   // Specify the bucket name and key of the image file
//   const params = {
//     Bucket: 'oogl',
//     Key: `images/Accenture.png`
//   };

//   console.log(`Retrieving image with key: ${key}`);

//   // Retrieve the image from the S3 bucket
//   s3.getObject(params, (err, data) => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send('Error retrieving image from S3');
//     }

//     console.log(`Image retrieved successfully with key: ${key}`);

//     // Set the appropriate content type for the response
//     res.setHeader('Content-Type', data.ContentType);

//     // Return the image data
//     res.send(data.Body);
//   });
// });

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
