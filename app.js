const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bfhlRoute = require('./api/bfhl');
const conn=require('../server/models/db')
const cors = require('cors');
const app = express();
app.use(cors());
app.use(
    cors({
      origin: "http://localhost:3000",
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      // <-- location of the react app were connecting to
      credentials: true,
    })
  );
app.use(cors());

// Middleware
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

 
// Routes
app.use('/bfhl', bfhlRoute);

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
