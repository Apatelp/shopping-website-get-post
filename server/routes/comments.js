const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');

// Getting all
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().populate('user').populate('product');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get('/:id', getComment, (req, res) => {
    res.json(res.comment);
});

// Creating One
router.post('/', async (req, res) => {
    const comment = new Comment({
        product: req.body.product,
        user: req.body.user,
        rating: req.body.rating,
        images: req.body.images,
        text: req.body.text
    });
    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One
router.patch('/:id', getComment, async (req, res) => {
    if (req.body.rating != null) {
        res.comment.rating = req.body.rating;
    }
    if (req.body.images != null) {
        res.comment.images = req.body.images;
    }
    if (req.body.text != null) {
        res.comment.text = req.body.text;
    }
    try {
        const updatedComment = await res.comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One
router.delete('/:id', getComment, async (req, res) => {
    try {
        await res.comment.remove();
        res.json({ message: 'Deleted comment' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getComment(req, res, next) {
    let comment;
    try {
        comment = await Comment.findById(req.params.id).populate('user').populate('product');
        if (comment == null) {
            return res.status(404).json({ message: 'Cannot find comment' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.comment = comment;
    next();
}

module.exports = router;
