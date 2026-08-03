const app = require('./src/app'); // importing app
const { connectDB } = require('./src/config/db.config');
const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || 5000;

// function to start server after DB Connection
const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
    });
}

startServer();