const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const LoginModel = require('../models/LoginModel');

router.post('/register', async (request, response) => {
  try {
    const { username, password } = request.body;

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new LoginModel({ username, password: hashedPassword });

    // Save the user to the database
    await user.save();

    response.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (request, response) => {
  try {
    const { username, password } = request.body;

    const user = await LoginModel.findOne({ username });

    // If a user is found and the password matches, authentication is successful
    if (user && await bcrypt.compare(password, user.password)) {
      response.json({ message: 'Login successful' });
    } else {
      response.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;