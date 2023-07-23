const express = require('express');

const app = express();

const dotenv = require('dotenv');
dotenv.config();

const bootstrap = async () => {
    try {
        // * connect to database
        const connectToDatabase = require('../config/database');
        const connection = await connectToDatabase();
        if (connection) {
            console.log('Connected to database');
        }

        // * configure express
        app.use(express.json());
        app.use(express.urlencoded({ extended: false }));

        // * configure morgan
        if(process.env.NODE_ENV === 'development') {
            app.use(require('morgan')('dev'));
        }

        // * configure cors
        app.use(require('cors')(
            {
                origin: process.env.CLIENT_URL || '*'
            }
        ));

        // * configure routes
        app.use('/api', require('../routes/api'));

        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server running on port ${process.env.PORT || 8000}`);
        });

    } catch (error) {
        console.log(error);
    }
}

module.exports = bootstrap;