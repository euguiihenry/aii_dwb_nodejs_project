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

/* require('dotenv').config()

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

connection.end() */

/* Imports:
=================================================================================*/
  const dotenv = require('dotenv');
  const express = require('express');
  const cors = require('cors');
  const mysql = require('mysql2')

/* Config for dotenv:
=================================================================================*/
  dotenv.config({ path: '../.env' });

/* Main Function:
=================================================================================*/
  /* Global Variables:
  ===============================================================================*/
    const app = express();

  /* Config for CORS:
  ===============================================================================*/
    app.use(cors({
      allowedHeaders: ['Content-Type','Access-Control-Allow-Origin']
    }));

  /* GET Method:
  ===============================================================================*/
    app.get('/api/index', async (req, res, next) => {
      try {
        res.send('Hello GET World');
      } catch (error) {
        next(error);
      }
    });
  
  /* POST Method:
  ===============================================================================*/
    app.post('/api/index', async (req, res) => {
      try {
        res.send('Hello POST World');
      } catch (error) {
        next(error);
      }
    });
  
  /* PATCH Method:
  ===============================================================================*/
    app.patch('/api/index', async (req, res, next) => {
      try {
        res.send('Hello PATCH World');
      } catch (error) {
        next(error);
      }
    });

  /* DELETE Method:
  ===============================================================================*/
    app.delete('/api/index', async (req, res, next) => {
      try {
        res.send('Hello DELETE World');
      } catch (error) {
        next(error);
      }
    });

  /* General Error Handling:
  ===============================================================================*/
    app.use((error, req, res, next) => {
      console.error(error.stack);
      res.status(500).send('Error retrieving data! Something went wrong!');
    });

  /* Connection to PlanetScale Function:
  ===============================================================================*/
    function connectFunc() {
      /* Create the connection to the database
      ===========================================================================*/
        const connection = mysql.createConnection(process.env.DATABASE_LINK);
    }
  
  /* Exports:
  ===============================================================================*/
    module.exports = app;
