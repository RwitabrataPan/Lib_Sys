const mongoose = require('mongoose');
const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  subject: String,
  copies: Number,
  available: Number
});
module.exports = mongoose.model('Book', BookSchema);
