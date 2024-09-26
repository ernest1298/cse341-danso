require('dotenv').config();
var express = require('express');
const { MongoClient } = require('mongodb');
var app = express();

// MongoDB connection URI from the .env file
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

// Call the function to connect to MongoDB
connectToMongoDB();

// Use routes (index route for '/')
app.use('/', require('./routes/index'));

// Use the contacts route for '/contacts'
const contactsRouter = require('./routes/contacts');
app.use('/contacts', contactsRouter);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
