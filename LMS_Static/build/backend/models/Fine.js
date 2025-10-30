const mongoose = require('mongoose');
const FineSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  reason: String,
  status: String,
  paidDate: String,
  paidBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  acknowledgedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
module.exports = mongoose.model('Fine', FineSchema);
