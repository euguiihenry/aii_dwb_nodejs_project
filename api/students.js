/* Imports:
=================================================================================*/
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

/* Config for dotenv:
=================================================================================*/
const envFilePath = '../.env';
dotenv.config({ path: envFilePath });

/* Main Function:
=================================================================================*/
/* Global Variables:
==============================================================================*/
const app = express();

/* Config for CORS:
==============================================================================*/
app.use(cors({
    allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin']
}));

/* Connection to PlanetScale Function:
==============================================================================*/
function connectFunc() {
    /* Create the connection to the database
    =========================================================================*/
    const connection = mysql.createConnection(process.env.DATABASE_URL);

    /* Return the connection
    =========================================================================*/
    return connection;
}

/* GET Methods:
==============================================================================*/
/* GET Method for Get All Students:
============================================================================*/
app.get('/api/students/get/students', async (req, res, next) => {
    try {
        /* Getting the connection from connectFunc:
        =========================================================================*/
        const connection = connectFunc();

        /* Connecting and executing the query:
        =========================================================================*/
        connection.connect(function (err) {
            /* Checking for errors before continuing:
            =====================================================================*/
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }

            /* Execute the query
            =====================================================================*/
            connection.query('SELECT * FROM alunos;', function (err, results, fields) {
                /* Checking for errors before continuing:
                =================================================================*/
                if (err) {
                    console.error('Error executing query: ' + err.message);
                    return;
                }

                /* Sending a response back after the query is executed
                =================================================================*/
                res.send(JSON.stringify(results));

                /* Close the connection when done
                =================================================================*/
                connection.end();
            });
        });

    } catch (error) {
        next(error);
    }
});

/* GET Method for Get One Student:
==============================================================================*/
app.get('/api/students/get/student/:id', async (req, res, next) => {
    /* Getting the id from the request:
    ===========================================================================*/
    const id = req.params.id;

    /* Performing the query:
    ===========================================================================*/
    try {
        /* Getting the connection from connectFunc:
        =========================================================================*/
        const connection = connectFunc();

        /* Connecting and executing the query:
        =========================================================================*/
        connection.connect(function (err) {
            /* Checking for errors before continuing:
            =====================================================================*/
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }

            /* Execute the query:
            =====================================================================*/
            connection.query('SELECT * FROM alunos WHERE id = ?', [id], function (err, results, fields) {
                /* Checking for errors before continuing:
                =================================================================*/
                if (err) {
                    console.error('Error executing query: ' + err.message);
                    return;
                }

                /* Sending a response back after the query is executed
                =================================================================*/
                res.send(JSON.stringify(results));

                /* Close the connection when done
                =================================================================*/
                connection.end();
            });
        });
    } catch (error) {
        next(error);
    }
});

/* POST Method:
==============================================================================*/
app.post('/api/students/add/student', async (req, res) => {
    /* Getting the body data from the request:
    ===========================================================================*/
    const { id, nome, curso } = req.body;

    /* Performing the POST request into the database:
    ===========================================================================*/
    try {
        /* Getting the connection from connectFunc:
        ========================================================================*/
        const connection = connectFunc();

        /* Connecting and executing the query:
        ========================================================================*/
        connection.connect(function (err) {
            /* Checking for errors before continuing:
            ====================================================================*/
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        });

        /* Execute the query
        ========================================================================*/
        connection.query('INSERT INTO alunos (id, nome, curso) VALUES (?, ?, ?)', [id, nome, curso], function (err, results, fields) {
            /* Checking for errors before continuing:
            ====================================================================*/
            if (err) {
                console.error('Error executing query: ' + err.message);
                return;
            }

            /* Sending a response back after the query is executed
            ====================================================================*/
            res.send(JSON.stringify(results));

            /* Close the connection when done
            ====================================================================*/
            connection.end();
        });

    } catch (error) {
        next(error);
    }
});

/* PATCH Method:
==============================================================================*/
app.patch('/api/students/update/student/:id', async (req, res, next) => {
    /* Getting body data from the request:
    ===========================================================================*/
    const { id } = req.params;
    const body = req.body;

    /* Performing the PATCH request into the database:
    ===========================================================================*/
    try {
        /* Getting the connection from connectFunc:
        ========================================================================*/
        const connection = connectFunc();

        /* Connecting and executing the query:
        ========================================================================*/
        connection.connect(function (err) {
            /* Checking for errors before continuing:
            ====================================================================*/
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }

            /* Execute the query:
            ====================================================================*/
            connection.query('UPDATE alunos SET ? WHERE id = ?', [body, id], function (err, results, fields) {
                /* Checking for errors before continuing:
                ====================================================================*/
                if (err) {
                    console.error('Error executing query: ' + err.message);
                    return;
                }

                /* Sending a response back after the query is executed:
                ====================================================================*/
                res.send(JSON.stringify(results));

                /* Close the connection when done
                ====================================================================*/
                connection.end();
            });
        });
    } catch (error) {
        next(error);
    }
});

/* DELETE Method:
==============================================================================*/
app.delete('/api/students/delete/student/:id', async (req, res, next) => {
    /* Getting the ID from the request:
    ===========================================================================*/
    const { id } = req.params;

    /* Performing the DELETE request into the database:
    ===========================================================================*/
    try {
        /* Getting the connection from connectFunc:
        ========================================================================*/
        const connection = connectFunc();

        /* Connecting and executing the query:
        ========================================================================*/
        connection.connect(function (err) {
            /* Checking for errors before continuing:
            ====================================================================*/
            if (err) {
                console.error('Error connecting: ' + err.stack);
                return;
            }
        });

        /* Execute the query:
        ========================================================================*/
        connection.query('DELETE FROM alunos WHERE id = ?', [id], function (err, results, fields) {
            /* Checking for errors before continuing:
            ====================================================================*/
            if (err) {
                console.error('Error executing query: ' + err.message);
                return;
            }

            /* Sending a response back after the query is executed:
            ====================================================================*/
            res.send(JSON.stringify(results));

            /* Close the connection when done:
            ====================================================================*/
            connection.end();
        });

    } catch (error) {
        next(error);
    }
});

/* General Error Handling:
==============================================================================*/
app.use((error, req, res, next) => {
    console.error(error.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: 'Error retrieving data. Something went wrong.',
        details: error.message  // Include the specific error message for debugging
    });
});

/* Exports:
==============================================================================*/
module.exports = app;
