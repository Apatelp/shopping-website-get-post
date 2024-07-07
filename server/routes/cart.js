const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Getting all
router.get('/', async (req, res) => {
    try {
        const carts = await Cart.find().populate('user').populate('products.product');
        res.json(carts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting One
router.get('/:id', getCart, (req, res) => {
    res.json(res.cart);
});

// Creating One
router.post('/', async (req, res) => {
    const cart = new Cart({
        products: req.body.products,
        user: req.body.user
    });
    try {
        const newCart = await cart.save();
        res.status(201).json(newCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating One
router.patch('/:id', getCart, async (req, res) => {
    if (req.body.products != null) {
        res.cart.products = req.body.products;
    }
    try {
        const updatedCart = await res.cart.save();
        res.json(updatedCart);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting One
router.delete('/:id', getCart, async (req, res) => {
    try {
        await res.cart.remove();
        res.json({ message: 'Deleted cart' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getCart(req, res, next) {
    let cart;
    try {
        cart = await Cart.findById(req.params.id).populate('user').populate('products.product');
        if (cart == null) {
            return res.status(404).json({ message: 'Cannot find cart' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.cart = cart;
    next();
}

module.exports = router;
