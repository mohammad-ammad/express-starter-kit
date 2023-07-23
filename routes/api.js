const { Router } = require('express');

const Route = Router();

Route.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = Route;