const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
  description: [
    {
      content: String
    }
  ]
});

module.exports = mongoose.model('about', aboutSchema);
