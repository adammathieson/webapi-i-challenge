const express = require('express');

const db = require('./data/db.js');

const server = express();

server.use(express.json());


//Post
server.post('/api/users', (req, res) => {
    const { name, bio, created_at, updated_at } = req.body;
    if (!name || !bio) {
        return res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
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
        .catch(() => {
            res.status(500).json({ error: 'There was an error while saving the user to the database.' })
        })
})

//Get
server.get('/api/users', (req, res) => {
    db
        .find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            res.status(500).json({ error: 'The users information could not be retrieved.' });
        });
});

//Get (user)
server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
        db
            .findById(id)
            .then(users => {
                if(!user.id) {
                    res.status(404).json({ message: 'The user with the specified id does not exist.' })
                }
                res.status(202).json(users);
            })
            .catch(error => {
                res.status(500).json({ error: 'The user information could not be retrieved.' })
            })
})

//Delete
server.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    db
        .remove(id)
        .then(deleted => {
            if(deleted === 0) {
                return res.status(404).json({ message: 'The user with the specified ID does not exist.' });
            }
            res.json({ success: `User ${id} successfully removed.`})
            
        })
        .catch(error => {
            res.status(500).json({ error: 'The user could not be removed.' })
        })
})

//Update
server.put('/user/:id', (req, res) => {
    const id = req.params;
    const { name, bio, changes} = req.body;
    if (!name || !bio) {
        return res.status(400).json({ errorMessage: 'Please provide name and bio for the user.' })
    }
    db
        .update(id, changes)
        .then(updated => {
            if (updated) {
                res.status(200).json(updated);
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'user information could not be modified.' })
        })
})

server.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});