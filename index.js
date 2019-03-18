const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hello from Express')
})

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});