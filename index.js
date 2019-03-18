const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());


//Get
server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ message: 'error retrieving users' });
        });
});

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
        db
            .findById(id)
            .then(users => {
                res.status(200).json(users);
            })
            .catch(error => {
                res.status(404).json({message: 'The user with the specified id does not exist' })
            })
})

//Post
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    console.log('user information', userInfo)

    db
        .insert(userInfo)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(error => {
            res.status(400).json({ errorMessage: 'Please provide name and bio for the user' })
        })
})

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});