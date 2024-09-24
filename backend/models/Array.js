const mongoose = require('mongoose');
const arraySchema = new mongoose.Schema({
    unsorted_array: { type: Array, required: true },
    sorted_array: { type: Array, required: true },
    delay: { type: Number, required: true },
    time_taken: { type: Number, required: true }
  });
  
module.exports = mongoose.model('Array', arraySchema);