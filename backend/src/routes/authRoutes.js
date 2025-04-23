const express = require('express');
const router = express.Router();
const db = require('../config/db');

// ! REGISTER 
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const [existing] = await db.query('SELECT * FROM users WHERE email=?', [email]);
        if (existing.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});

// ! LOGIN
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email=?', [email]);
        if (rows.length === 0) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = rows[0];
        if (password !== user.password) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.json({
            message: 'Login successful',
            user: {
                id: user.user_id,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Something went wrong while login' });
    }
});






module.exports = router;
