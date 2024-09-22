// Import dependencies at the top if not already imported
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const ArrayModel = require('./models/Array');
require('dotenv').config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors(
    {origin: '*',}
));
app.use(bodyParser.json());

// MongoDB connection string
const mongoURI = process.env.mongoURI

// Connect to MongoDB
mongoose.connect(mongoURI)
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Define the schema and model


// Routes
app.post('/save-array', async (req, res) => {
  const { unsorted_array, sorted_array, delay, time_taken } = req.body;
  try {
    const newArray = new ArrayModel({
      unsorted_array,
      sorted_array,
      delay,
      time_taken
    });
    await newArray.save();
    res.status(201).json(newArray);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// New Route to Fetch All Arrays
app.get('/get-arrays', async (req, res) => {
  try {
    const arrays = await ArrayModel.find();
    res.json(arrays);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
