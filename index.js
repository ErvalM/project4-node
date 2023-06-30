const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const dbUrl = process.env.DB_URL;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

mongoose.connect(dbUrl, connectionParams)
  .then(() => {
    console.info('Connected to the DB');
  })
  .catch((error) => {
    console.log('Error:', error);
  });

const server = express();
const port = 8000;

server.use(express.json());
server.use(cors());
server.use(helmet());

// Import lead routes from leads.js
const leadRoutes = require('./routes/leads');
server.use('/leads', leadRoutes);

// Import expense routes from expenses.js
const expenseRoutes = require('./routes/expenses');
server.use('/expenses', expenseRoutes);

// Import goal routes from goals.js
const goalRoutes = require('./routes/goals');
server.use('/goals', goalRoutes);

// Import auth routes 
const authRoutes = require('./routes/auth');
server.use('/auth', authRoutes);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});