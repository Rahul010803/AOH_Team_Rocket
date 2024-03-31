// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'land_registration'
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL database');
});

// Middleware
app.use(bodyParser.json());

// User Registration
app.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, result) => {
      if (err) {
        console.error('Registration error:', err.message);
        res.status(500).json({ message: 'Registration failed' });
      } else {
        console.log('User registered successfully');
        res.status(201).json({ message: 'User registered successfully' });
      }
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// User Login
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
      if (err) {
        console.error('Login error:', err.message);
        res.status(500).json({ message: 'Login failed' });
      } else if (result.length === 0) {
        res.status(401).json({ message: 'Invalid email or password' });
      } else {
        const user = result[0];

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          res.status(401).json({ message: 'Invalid email or password' });
        } else {
          // Generate JWT token
          const token = jwt.sign({ userId: user.id, email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });
          res.status(200).json({ token });
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Login failed' });
  }
});

// Add Land
app.post('/add-land', (req, res) => {
  try {
    const { location, area } = req.body;

    // Insert land details into database
    db.query('INSERT INTO lands (location, area) VALUES (?, ?)', [location, area], (err, result) => {
      if (err) {
        console.error('Add land error:', err.message);
        res.status(500).json({ message: 'Failed to add land' });
      } else {
        console.log('Land added successfully');
        res.status(201).json({ message: 'Land added successfully' });
      }
    });
  } catch (error) {
    console.error('Add land error:', error.message);
    res.status(500).json({ message: 'Failed to add land' });
  }
});

// Get All Lands
app.get('/lands', (req, res) => {
  try {
    // Fetch all land data from database
    db.query('SELECT * FROM lands', (err, result) => {
      if (err) {
        console.error('Fetch lands error:', err.message);
        res.status(500).json({ message: 'Failed to fetch lands' });
      } else {
        console.log('Lands fetched successfully');
        res.status(200).json(result);
      }
    });
  } catch (error) {
    console.error('Fetch lands error:', error.message);
    res.status(500).json({ message: 'Failed to fetch lands' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
