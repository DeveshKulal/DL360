const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

//! Routes
const authRoutes = require('./routes/authRoutes')
const userActionsRoutes = require('./routes/userActionsRoutes')

const app = express()

//! Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());



//! Routes are used Here
app.use('/api/auth',authRoutes)
app.use('/api/user',userActionsRoutes)

// ! Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is runing on port ${PORT}...`);
})