const mongoose = require('mongoose');
const Product = require('./models/Product');
const User = require('./models/User');
const Comment = require('./models/Comment');
const Cart = require('./models/Cart');
const Order = require('./models/Order');

const productData = {
    description: "Wireless Bluetooth Headphones",
    image: "https://example.com/images/headphones.jpg",
    pricing: 99.99,
    shippingCost: 5.99
};

const userData = {
    email: "john.doe@example.com",
    password: "password123",
    username: "john_doe",
    purchase_history: [],
    shippingAddress: "123 Main St, Anytown, USA"
};

const insertData = async () => {
    await mongoose.connect(`mongodb+srv://Test123:Test123@cluster0.ffh2s.mongodb.net/MyDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true })

    const product = new Product(productData);
    const savedProduct = await product.save();

    const user = new User(userData);
    const savedUser = await user.save();

    const commentData = {
        product: savedProduct._id,
        user: savedUser._id,
        rating: 5,
        images: ["https://example.com/images/comment1.jpg"],
        text: "Great product, highly recommend!"
    };

    const comment = new Comment(commentData);
    await comment.save();

    const cartData = {
        products: [
            {
                product_id: savedProduct._id,
                quantity: 2
            }
        ],
        user: savedUser._id
    };

    const cart = new Cart(cartData);
    await cart.save();

    const orderData = {
        products: [
            {
                product_id: savedProduct._id,
                quantity: 1
            }
        ],
        user: savedUser._id,
        total_cost: 105.98,
        shipping_address: "123 Main St, Anytown, USA",
        order_date: new Date()
    };

    const order = new Order(orderData);
    await order.save();

    console.log('Database seeded!');
    mongoose.connection.close();
};

insertData().catch(err => {
    console.error(err);
});
