const express = require('express')
const router = express.Router()
const db = require('../config/db')

router.get('/get-fir-no', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT COUNT(*) AS count FROM fir_details');
    const firCount = rows[0].count + 1;
    const fir_no = `FIR${String(firCount).padStart(4, '0')}`;
    res.json({ fir_no });
  } catch (error) {
    console.error('Error generating FIR number:', error);
    res.status(500).json({ error: 'Failed to generate FIR number' });
  }
});


router.post('/add-fir', async (req, res) => {
  try {
    const {
      fir_no,
      vehicle_number,
      chase_no,
      model,
      brand,
      color,
      varient,
      fuel_type,
      owner_name,
      phone_no,
      lost_place,
      lost_date,
      status,
      email,
      police_email
    } = req.body;

    const query = `
      INSERT INTO fir_details (
        fir_no, vehicle_number, chase_no, model, brand, color,
        varient, fuel_type, owner_name, phone_no, lost_place,
        lost_date, status, email, police_email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      fir_no, vehicle_number, chase_no, model, brand, color,
      varient, fuel_type, owner_name, phone_no, lost_place,
      lost_date, status, email, police_email
    ];

    const [result] = await db.query(query, values);
    res.status(201).json({ message: 'FIR added successfully', fir_id: result.insertId });

  } catch (error) {
    console.error('Error adding FIR:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

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

router.post('/apply-emission-test', async(req, res) => {
    try {
        const {Vehicle_no,Date_of_Emission_test} = req.body;
        const emission_testQuery = `INSERT INTO emission_test (Vehicle_no, Date_of_Emission_test) VALUES (?, ?)`
        await db.query(emission_testQuery, [Vehicle_no,Date_of_Emission_test]);
        return res.status(200).json({message:'Application sent for the emission test'})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
})


// Update status of an LLR request by llr_no
router.put('/update-status-llr/:llr_no', async (req, res) => {
    const { llr_no } = req.params;
    const { status } = req.body;
  
    try {
      // Make sure to specify the correct table name here (assumed 'llr')
      await db.query('UPDATE llr SET status = ? WHERE llr_no = ?', [status, llr_no]);
  
      res.status(200).json({ message: "LLR Status updated successfully" });
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ error: "Failed to update status of LLR" });
    }
  });

// Update status of an DL request by dl_no
router.put('/update-status-dl/:dl_no', async (req, res) => {
    const { dl_no } = req.params;
    const { status } = req.body;
  
    try {
      await db.query('UPDATE dl_renewal SET status = ? WHERE dl_no = ?', [status, dl_no]);
  
      res.status(200).json({ message: "DL Renewal Status updated successfully" });
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ error: "Failed to update status of DL renewal" });
    }
  });



module.exports = router;