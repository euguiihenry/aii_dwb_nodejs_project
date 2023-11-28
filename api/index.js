/* import express from "express"
import fetch from "node-fetch"
const app = express();

app.get("/", (req, res) => {
    try {
        console.log("Hello world!");
        res.send(<p>Hello World</p>)
    } catch (error) {
        console.error(error);
        res.status(500).send("Something went wrong. Server Error.");
    }
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
});
 */

require('dotenv').config()

const mysql = require('mysql2')

// Create the connection to the database
const connection = mysql.createConnection(process.env.DATABASE_LINK)

// simple query
connection.query('show tables', function (err, results, fields) {
  console.log(results) // results contains rows returned by server
  console.log(fields) // fields contains extra metadata about results, if available
})

// Example with placeholders
connection.query('select 1 from dual where ? = ?', [1, 1], function (err, results) {
  console.log(results)
})

connection.end()
