const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bfhlRoute = require('./routes/bfhl');
const conn=require('./models/db')

const app = express();

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

 
// Routes
app.use('/bfhl', bfhlRoute);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
