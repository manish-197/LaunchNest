const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database')
const authRouter = require('./routes/auth.routes')
const startupRouter = require('./routes/startup.routes')
const cookieParser = require("cookie-parser");
// const path = require('path');


connectDB()

const app = express()
app.use(express.json())
app.use(cors(
  {
    origin: 'https://launch-nest.netlify.app', 
    credentials: true,               
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
  }
));
app.use(cookieParser());
app.use('/api/auth', authRouter)
app.use('/api/startup', startupRouter)




app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  next();
});




module.exports = app;