const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser'); 
app.use(bodyParser.json()); // req.body
const PORT = process.env.PORT || 3000;
// Import the router files
const userRoutes = require('./routers/users.routers');
const candidateRoutes = require('./routers/candidate.routers');

// Use the routers
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);


app.listen(PORT, ()=>{
    console.log('listening on port 3000');
})