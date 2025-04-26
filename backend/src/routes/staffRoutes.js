const express = require('express')
const router = express.Router()
const db = require('../config/db')

router.get('/llr-requests', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT llr.*, users.name 
            FROM llr
            JOIN users ON llr.user_id = users.user_id
        `);
        res.json(rows)
    } catch (error) {
        console.error('Error fetching LLR requests:', error);
        res.status(500).json({ message: 'Server error fetching LLR requests' });
    }
})


router.get('/dl-requests', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT name, dl_no, valid_to, valid_from, status FROM dl_renewal 
        `);
        res.json(rows)
    } catch (error) {
        console.error('Error fetching DL requests:', error);
        res.status(500).json({ message: 'Server error fetching DL requests' });
    }
})
module.exports = router;