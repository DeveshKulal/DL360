const express = require('express')
const router = express.Router()
const db = require('../config/db')

router.get('/get-users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ message: 'Error while fetching the user Data'});
    }
})

router.get('/get-vehicles', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                v.vehicle_id AS id,
                v.vehicle_number AS number,
                u.name AS owner,
                f.fuel_type AS type,
                v.color,
                v.rfid_tag,
                e.Date_of_Emission_test AS emission
            FROM vehicles v
            JOIN users u ON v.owner_id = u.user_id
            LEFT JOIN fir_details f ON f.vehicle_number = v.vehicle_number
            LEFT JOIN emission_test e ON e.Vehicle_no = v.vehicle_number
        `);

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching vehicle data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.get('/get-complaints', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                f.fir_id AS id,
                f.fir_no AS subject,
                u.name AS user,
                u.role AS role,
                f.status AS status,
                'Medium' AS priority,
                DATE(f.lost_date) AS date
            FROM fir_details f
            JOIN users u ON f.vehicle_number = (
                SELECT vehicle_number FROM vehicles WHERE owner_id = u.user_id LIMIT 1
            )
        `);
        
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;