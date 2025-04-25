const express = require('express')
const router = express.Router()
const db = require('../config/db')
// const util = require('util');

// const dbQuery = util.promisify(db.query).bind(db);
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


module.exports = router;