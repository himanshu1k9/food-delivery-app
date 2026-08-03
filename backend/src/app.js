const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const menuRoutes = require('./routes/menu.routes');
const orderRoutes = require('./routes/order.routes');

/**
 * Handeling errors globly
 */
const createError = require('http-errors');
const AppError = require('./utils/ApiError');


/**
 * Definig App
 */
const app = express();


/**
 * Middlewares
 */
app.use(helmet()); // For security headers
app.use(cors({
    origin: ['http://localhost:5173', /\.vercel\.app$/],
    credentials: true
}));  // Enabling CORS
app.use(morgan('dev')); // For logging in develoment environment
app.use(express.json()); // for parsing the body

// API Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404, 'Route not found'));
});


// Global Error Handler Middleware 
app.use((err, req, res, next) => {
    let { statusCode, message } = err;

    if (process.env.NODE_ENV === 'production' && !err.isOperational) {
        statusCode = 500;
        message = 'Something went wrong';
    }

    res.status(statusCode || 500).json({
        status: err.status || 'error',
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
});


app.get('/', (req, res) => {
    res.json({ message: 'Food Delivery API is running...' });
});

module.exports = app;