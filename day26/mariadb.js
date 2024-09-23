// Get the client
const mysql = require("mysql2/promise");

async function main() {
  // Create the connection to database
  const connection = await mysql.createConnection({
    host: "127,0.0.1",
    user: "root",
    password: "root",
    database: "Youtube",
    dateStrings: true,
  });

  // A simple SELECT query
  try {
    const [results, fields] = await connection.query("SELECT * FROM users");

    console.log(results); // results contains rows returned by server
    console.log(fields); // fields contains extra meta data about results, if available
  } catch (err) {
    console.log(err);
  } finally {
    await connection.end();
  }
}

// Call the main function
main();

module.exports = connection;
