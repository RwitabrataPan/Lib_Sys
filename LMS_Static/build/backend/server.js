require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => res.send('Library Management System API'));

const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const fineRoutes = require('./routes/fines');

app.use('/api/books', bookRoutes);
app.use('/api/users', userRoutes);
app.use('/api/fines', fineRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
