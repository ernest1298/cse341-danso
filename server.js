require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Contact = require('./models/Contact'); // Import the Contact model
const app = express();

// MongoDB connection using Mongoose
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware to parse JSON bodies
app.use(express.json());

// GET route to retrieve all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all contacts from MongoDB
    res.status(200).json(contacts); // Return the contacts as JSON
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
});

// POST route to create a new contact
app.post('/api/contacts', async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Ensure all fields are provided
    if (!name || !email || !phone || !address) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new contact
    const newContact = new Contact({ name, email, phone, address });
    await newContact.save(); // Save contact to database

    // Return the new contact ID
    res.status(201).json({ id: newContact._id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create contact' });
  }
});

// PUT route to update an existing contact
app.put('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { name, email, phone, address },
      { new: true, runValidators: true } // Return the updated contact
    );

    if (!updatedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// DELETE route to delete a contact
app.delete('/api/contacts/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Start the server
const PORT = process.env.PORT || 3002; // Use environment variable or default to 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
