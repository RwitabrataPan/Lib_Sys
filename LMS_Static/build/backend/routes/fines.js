const express = require('express');
const router = express.Router();
const Fine = require('../models/Fine');

// Get all fines
router.get('/', async (req, res) => {
  const fines = await Fine.find().populate('userId paidBy acknowledgedBy');
  res.json(fines);
});

// Add a new fine
router.post('/', async (req, res) => {
  const fine = new Fine(req.body);
  await fine.save();
  res.json(fine);
});

// Update a fine
router.put('/:id', async (req, res) => {
  const fine = await Fine.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(fine);
});

// Delete a fine
router.delete('/:id', async (req, res) => {
  await Fine.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

module.exports = router;
