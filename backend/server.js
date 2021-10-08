require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const {request} = require("express");
const errorHandler = require('./middleware/errorHandler');

connectDB();

const  app = express();

//Middleware
app.use(express.json());

//Routes
app.use('/api/v1/tz', require('./routes/Routes'));

//Error Handler
app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, ()=> console.log(`Serv work on ${PORT}`));