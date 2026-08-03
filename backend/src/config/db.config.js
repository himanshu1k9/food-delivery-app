const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // Initializing config file for the config variables

const sequelize = new Sequelize(
    process.env.DB_NAME, // DB Name
    process.env.DB_USER, // DB Username
    process.env.DB_PASSWORD, // DB Password
    {
        host: process.env.DB_HOST, // DB Host
        port: process.env.DB_PORT, // DB Port
        dialect: 'postgres',
        logging: process.env.NODE_ENV === 'development' ? console.log : false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
    }
)

// Function to connect with DB
const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('PostgreSQL Connected via Sequelize.');

        // In production, use migrations. For assessment, sync is okay.
        if (process.env.NODE_ENV === 'development') {
            await sequelize.sync({ alter: true }); // Automatically updates schema
            console.log('Database synced.');
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1); // Exit process with failure
    }
}

module.exports = { sequelize, connectDB };