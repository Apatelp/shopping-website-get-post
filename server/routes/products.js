const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Getting all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Getting one product
router.get('/:id', getProduct, (req, res) => {
    res.json(res.product);
});

// Creating one product
router.post('/', async (req, res) => {
    const product = new Product({
        description: req.body.description,
        image: req.body.image,
        pricing: req.body.pricing,
        shipping_cost: req.body.shipping_cost
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Updating one product
router.patch('/:id', getProduct, async (req, res) => {
    if (req.body.description != null) {
        res.product.description = req.body.description;
    }
    if (req.body.image != null) {
        res.product.image = req.body.image;
    }
    if (req.body.pricing != null) {
        res.product.pricing = req.body.pricing;
    }
    if (req.body.shipping_cost != null) {
        res.product.shipping_cost = req.body.shipping_cost;
    }
    try {
        const updatedProduct = await res.product.save();
        res.json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Deleting one product
router.delete('/:id', getProduct, async (req, res) => {
    try {
        await res.product.remove();
        res.json({ message: 'Deleted product' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.product = product;
    next();
}

module.exports = router;
