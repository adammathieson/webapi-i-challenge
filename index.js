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


//Get (user)
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
    const { name, bio, created_at, updated_at } = req.body;
    if (!name || !bio) {
        return res.status(400).json({ errorMessage: 'Please provide name and bio for the user' })
    }
    db
        .insert({
            name,
            bio,
            created_at,
            updated_at
        })
        .then(res => {
            res.status(201).json(res);   
        })
        .catch(error => {
            res.status(400).json({ error: error })
        })
})

//Delete
server.delete('/user/:id', (req, res) => {
    const id = req.params.id;

    db
        .remove(id)
        .then(deleted => {
            res.status(204).end();
        })
        .catch(error => {
            res.status(500).json({ message: 'error deleting user' })
        })
})

//Update
server.put('/user/:id', (req, res) => {
    const id = req.body.id;
    const changes = req.body;

    db
        .update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({ message: 'user not found' });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'error updating the user' })
        })
})

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});