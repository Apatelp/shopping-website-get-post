require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(`mongodb+srv://Test123:Test123@cluster0.ffh2s.mongodb.net/MyDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())

const userRoutes = require('./routes/users');
const productRoutes = require('./routes/products');
const commentRoutes = require('./routes/comments');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/orders');

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/comments', commentRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);

app.listen(3000, () => console.log('Server Started'))