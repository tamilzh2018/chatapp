const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const config = require('./config/config');

mongoose.connect(config.mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err.message));

const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);

// Add this route
app.get('/', (req, res) => {
  res.send('User Service is running');
});

app.listen(3000, () => console.log('User service running on port 3000'));

