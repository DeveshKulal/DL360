const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const db = require('./config/db'); 

//! Routes
const authRoutes = require('./routes/authRoutes');
const userActionsRoutes = require('./routes/userActionsRoutes');
const staffRoutes = require('./routes/staffRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

//! Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//! Routes are used Here
app.use('/api/auth', authRoutes);
app.use('/api/user', userActionsRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/admin', adminRoutes);

// ✅ DB connection test
(async () => {
  try {
    const connection = await db.getConnection();
    console.log('DB connected successfully!');
    connection.release();
  } catch (err) {
    console.error('DB connection failed:', err.message);
  }
})();

// ! Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
