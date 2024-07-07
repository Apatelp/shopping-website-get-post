const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    images: [String],
    text: { type: String, required: true }
});

module.exports = mongoose.model('Comment', commentSchema);
