const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const usersDataFile = './data/users.json';

router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    let usersData;
    try {
      usersData = JSON.parse(fs.readFileSync(usersDataFile, 'utf8'));
    } catch (error) {
      usersData = {};
    }

    if (usersData[username]) {
      return res.status(400).json({ error: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    usersData[username] = { username, password: hashedPassword };
    fs.writeFileSync(usersDataFile, JSON.stringify(usersData));

    res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    let usersData;
    try {
      usersData = JSON.parse(fs.readFileSync(usersDataFile, 'utf8'));
    } catch (error) {
      usersData = {};
    }

    const user = usersData[username];

    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ username }, 'secretkey');
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
