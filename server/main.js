const express = require('express');

// Adding Mongoose module
const mongoose = require('mongoose');

// Retrieveing Schema Constructor from Mongoose
let Schema = mongoose.Schema;

// Connect to the MongoDB Atlas
mongoose.connect('mongodb+srv://<DBUSER>:<DBPASS>@cluster0.ffh2s.mongodb.net/MyDatabase?retryWrites=true&w=majority')

// Instantiate the object
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    purchaseHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    shippingAddress: { type: String, required: true }
});

// Creates a model named "Person", using the "personSchema"
// This will interact with the collection called "person" in MongoDB
// If the collection doesn't exist then it will create it for us
let User = mongoose.model('User', userSchema);


person.save().then(() => {
    console.log("A new person data object has been added to the database");
    // mongoose.disconnect();
    // process.exit();
});


