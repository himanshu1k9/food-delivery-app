const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');


/**
 * Definig App
 */
const app = express();


/**
 * Middlewares
 */
app.use(helmet()); // For security headers
app.use(cors());  // Enabling CORS
app.use(morgan('dev')); // For logging in develoment environment
app.use(express.json()); // for parsing the body


app.get('/', (req, res) => {
    res.json({ message: 'Food Delivery API is running...' });
});

module.exports = app;