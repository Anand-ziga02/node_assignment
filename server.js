const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require("dotenv").config()  
const cors=require('cors')
const PORT=process.env.PORT || 5005

const server = express()

// view engine setup
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'jade')

server.use(cors())
server.use(logger('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(express.static(path.join(__dirname, 'public')));

server.use('/api', require('./routes/index'))

// catch 404 and forward to error handler
server.use(function(req, res, next) {
  next(createError(404));
})

server.listen(PORT,()=>{
  console.log(`🚀 Server running on port ${PORT}...`)
})
