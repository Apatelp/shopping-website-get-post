const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Getting all
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get('/:id', getUser, (req, res) => {
    res.json(res.user);
});

// Creating One
router.post('/', async (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        shippingAddress: req.body.shippingAddress
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One
router.patch('/:id', getUser, async (req, res) => {
    if (req.body.email != null) {
        res.user.email = req.body.email;
    }
    if (req.body.password != null) {
        res.user.password = req.body.password;
    }
    if (req.body.username != null) {
        res.user.username = req.body.username;
    }
    if (req.body.shippingAddress != null) {
        res.user.shippingAddress = req.body.shippingAddress;
    }
    try {
        const updatedUser = await res.user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.remove();
        res.json({ message: 'Deleted user' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getUser(req, res, next) {
    let user;
    try {
        user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.user = user;
    next();
}

module.exports = router;
