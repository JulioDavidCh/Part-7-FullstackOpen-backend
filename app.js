const config = require('./utils/config')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const anecdoteRouter = require('./controllers/anecdotes')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(bodyParser.json())
app.use(middleware.morganMiddleware)

app.use('/api/anecdotes', anecdoteRouter)

module.exports = app