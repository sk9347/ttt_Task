const express = require('express');
const { createUser, getUsers, updateUserById, deleteUserById } = require('../Controllers/user.Controller');
const router = express.Router();

router.post('/api/createUser', async (req, res) => {
    try {
        console.log(req.body);
        const result = await createUser(req.body); 
        res.send(result);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/api/users', async (req, res) => {
    try {
       const users=await getUsers()
       console.log(users)
       res.send(users)
    } catch (err) {
        res.status(500).send(err);
    }
});


router.put('/api/users/:id', async (req, res) => {
    try {
        console.log(req.params.id)
        const updatedUser = await updateUserById(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});



router.delete('/api/users/:id', async (req, res) => {
    try {
        const deletedUser = await deleteUserById(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
