require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const {request} = require("express");

connectDB();

const  app = express();

//Middleware
app.use(express.json());

//Routes
app.use('/api/v1/tz', require('./routes/Routes'));

const PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Serv work on ${PORT}`));