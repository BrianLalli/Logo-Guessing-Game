const mysql = require("mysql");
const fs = require("fs");

// Create a connection to the MySQL database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ProRight50!",
  database: "logo_game_db",
  authPlugin: "mysql_native_password",
});

// Connect to the database
connection.connect();

// Read the directory containing the logo images
const logoDirectory = "./public/assets/Images";
fs.readdir(logoDirectory, (err, files) => {
  if (err) {
    console.error("Error reading logo directory:", err);
    connection.end(); // Close the database connection
    return;
  }

  // Track the number of completed queries
  let completedQueries = 0;

  // Iterate over the logo files
  files.forEach((file) => {
    // Assuming the file name corresponds to the logo name in the database
    const logoName = file.substring(0, file.lastIndexOf("."));
    const logoFilePath = `${logoDirectory}/${file}`;

    // Read the image file
    fs.readFile(logoFilePath, (err, data) => {
      if (err) {
        console.error("Error reading logo file:", err);
        return;
      }

      // Insert the logo data into the database
      const sql = "INSERT INTO logos (name, image) VALUES (?, ?)";
      connection.query(sql, [logoName, data], (err, results) => {
        if (err) {
          console.error("Error inserting logo data:", err);
          return;
        }
        console.log(`Logo "${logoName}" inserted successfully.`);

        // Increase the count of completed queries
        completedQueries++;

        // Check if all queries have completed
        if (completedQueries === files.length) {
          connection.end(); // Close the database connection
        }
      });
    });
  });
});
