const express = require('express')
const router = express.Router()
const db = require('../config/db')

// !LLR number generation
const generateLLRNumber = async (stateCode) => {
    const year = new Date().getFullYear();
    const prefix = `LLR${year}${stateCode}`

    const countQuery = `SELECT COUNT(*) AS count FROM llr WHERE llr_no LIKE '${prefix}%'`
    const [result] = await db.query(countQuery);
    // console.log('Result: ',result[0].count);
    
    const serial = parseInt(result[0].count) +1;
    const serialPart = String(serial).padStart(4,'0')
    
    return `${prefix}${serialPart}`
}


//! Apply-LLR
router.post('/apply-llr', async (req, res) => {
    try {
        // const user_id = req.session.user_id
        // if(!user_id) return res.status(401).send('User not logged in');

        const {email,mobile_number, date_of_birth, gender, street, city, state, pin_code} = req.body;

        if(!email) return res.status(400).send('Email is required');
        const userIdQuery = `SELECT user_id FROM users WHERE email = ?`
        const [results] = await db.query(userIdQuery, [email])

        if(results.length === 0) return res.status(404).send('User not found');  
        const user_id = results[0].user_id
        // console.log(user_id);
        

        const stateCode = state.substring(0,2).toUpperCase();
        // console.log('State Code: ',stateCode);
        
        const llr_no = await generateLLRNumber(stateCode);
        // console.log('Generated LLR Number: ',llr_no);
        
        const llr_issue_date = new Date().toISOString().slice(0,10);

        const updateUserQuery = `UPDATE users SET mobile_number = ?, date_of_birth = ?, gender = ?, street = ?, city = ?, state = ?, pin_code = ? WHERE user_id = ?`;

        await db.query(updateUserQuery, [mobile_number, date_of_birth, gender, street, city, state, pin_code, user_id]);

        const insertLLRQuery = `INSERT INTO llr(llr_no, llr_issue_date, user_id) VALUES (?, ?, ?)`;
        await db.query(insertLLRQuery,[llr_no, llr_issue_date, user_id]);

        res.status(200).send({message : 'LLR application successful',LLR_Number:llr_no})
    } catch (error) {
        console.log('LLR application error: ',error);
        res.status(500).send('An error occured while applying for LLR')        
    }
})



//! fetching user_id and returning required fields
router.get('/apply-dl-renewal', async (req, res) => {
    const { user_id } = req.query;  

    if (!user_id) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    const fetchLlrQuery =  'SELECT * FROM llr WHERE user_id = ?';
    const [llrResults] = await db.query(fetchLlrQuery, [user_id])

    const fetchUserQuery = 'SELECT * FROM users WHERE user_id = ?';
    const [userResults] = await db.query(fetchUserQuery,[user_id])

    if (llrResults.length === 0 || userResults.length === 0 ) {
        return res.status(404).json({ message: 'No records found for this user' });
    }

    // console.log('LLR Results:', llrResults[0]);
    // console.log('User Results:', userResults[0]);

    res.json({
        llr: llrResults[0],
        user: userResults[0]
    })
});

//! Generating DL number for requested user and storing in DB
const generateDLNumber = async (stateCode,year) => {
    // const year = new Date().getFullYear();
    const prefix = `DL${year}${stateCode}`;

    const serial = Math.floor(Math.random() * 900000) + 1000; // Generates a 4-digit random number
    const serialPart = String(serial).padStart(6, '0');
    
    return `${prefix}${serialPart}`;
}

// generateDLNumber('KA',2024).then(dlNumber => console.log(dlNumber));

router.post('/apply-dl-renewal', async (req, res) => {
    try {
        const {llr_no, name, phone_no, dob, address, valid_from, valid_to, variants, street,city,state,pin_code} = req.body;
        const year = new Date(valid_from).getFullYear();
        const stateCode = state.substring(0,2).toUpperCase()
        const dl_no = await generateDLNumber(stateCode,year);
        // console.log(dl_no);
        
        const [response] = await db.query('SELECT user_id FROM llr WHERE llr_no = ?',[llr_no])
        const user_id = response[0].user_id;
        // console.log(response[0].user_id);
        const [llr_idResponse] = await db.query('SELECT llr_id FROM llr where llr_no = ?',[llr_no])
        const llr_id = llr_idResponse[0].llr_id

        
        
        const drivingLicenceInsertQuery = `INSERT INTO driving_license (dl_no, user_id, llr_id, issue_date, expiry_date, variants, amount, payment_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        await db.query(drivingLicenceInsertQuery ,[
            dl_no, user_id, llr_id,
            valid_from, valid_to,
            variants, 450 , 'pending'
        ]);

        const dlRenewalInsertQuery = `
            INSERT INTO dl_renewal (dl_no, name, phone_no, dob, valid_from, valid_to, amount, status, user_id, street, city, state, pin_code)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        await db.query(dlRenewalInsertQuery, [
            dl_no, name, phone_no, dob,
            valid_from, valid_to, 450 , 'pending', user_id,
            street,city,state,pin_code
        ]);

        res.status(201).json({ message: 'DL Renewal Applied Successfully', dl_no });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server Error' });
    }
})

router.get("/get-emission-test/:userId", async (req, res) => {
    const userId = Number(req.params.userId);  
    try {
      const [rows] = await db.query(
        `
            SELECT et.* 
            FROM Emission_Test et
            JOIN Vehicles v ON et.Vehicle_no = v.vehicle_number
            WHERE v.owner_id = ?
        `,
        [userId]);
      res.json(rows[0]);
    } catch (err) {
      console.error("Error fetching emission test:", err);
      res.status(500).json({ error: "Failed to fetch emission test" });
    }
  });


// GET driving license by user ID
router.get('/driving-license/:userId', async (req, res) => {
    const userId = parseInt(req.params.userId);
    try {
        const [result] = await db.execute(
            `SELECT 
               u.name, u.email, u.gender, u.street, u.city, u.state, u.pin_code,
               dl.dl_no, dl.issue_date, dl.expiry_date
             FROM driving_license dl
             JOIN users u ON u.user_id = dl.user_id
             WHERE dl.user_id = ?`,
            [userId]
          );

      if (result.length === 0) {
        return res.status(404).json({ message: "Driving License not found" });
      }
  
      res.json(result[0]);
    } catch (err) {
      console.error('DB error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
module.exports = router;