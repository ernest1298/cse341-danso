const express = require('express');
const router = express.Router();
const { MongoClient, ObjectId } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
    await client.connect();
    const db = client.db('contactsDB');  // Ensure the database name is correct
    return db.collection('contacts');
}

// GET all contacts
router.get('/', async (req, res) => {
    try {
        const contactsCollection = await connectToDatabase();
        const contacts = await contactsCollection.find({}).toArray();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch contacts', error });
    }
});

// GET a single contact by ID
router.get('/:id', async (req, res) => {
    try {
        const contactsCollection = await connectToDatabase();
        const contact = await contactsCollection.findOne({ _id: ObjectId(req.params.id) });
        if (!contact) {
            res.status(404).json({ message: 'Contact not found' });
        } else {
            res.status(200).json(contact);
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch contact', error });
    }
});

// Export the router object so it can be used in server.js
module.exports = router;
