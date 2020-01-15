const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const anecdoteRouter = require('./controllers/anecdotes')
const middleware = require('./utils/middleware')

app.use(bodyParser.json())
app.use(middleware.morganMiddleware)

app.use('/api/anecdotes', anecdoteRouter)

module.exports = app