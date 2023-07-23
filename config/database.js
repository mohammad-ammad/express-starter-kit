const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        if (connection) {
            return connection;
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectToDatabase;