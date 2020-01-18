const anecdoteRouter = require('express').Router()
const Anecdote = require('../models/anecdote')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')

const initialStateAnecdotes = [
  {
    content: 'If it hurts, do it more often',
    author: 'Jez Humble',
    info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
    votes: 0,
    id: '1'
  },
  {
    content: 'Premature optimization is the root of all evil',
    author: 'Donald Knuth',
    info: 'http://wiki.c2.com/?PrematureOptimization',
    votes: 0,
    id: '2'
  }
]

anecdoteRouter.get('/', async (req, res) => {
  res.json(initialStateAnecdotes)
})

anecdoteRouter.post('/', async (req, res, next) => {
  const body = req.body

  const token = req.token

  try{

    const decodedToken = jwt.verify(token, config.jwtPassword)

    const userInDb = await User.findById(decodedToken.id)

    const newAnecdoteToAdd = {
      content: body.content,
      author: body.author,
      info: body.info,
      votes: 0,
      user: userInDb._id
    }

    const anecdoteToAdd = new Anecdote(newAnecdoteToAdd)
    const addedAnecdote = await anecdoteToAdd.save(newAnecdoteToAdd)

    userInDb.anecdotes = userInDb.anecdotes.concat(addedAnecdote.id)

    await userInDb.save()

    res.status(201).json(addedAnecdote)

  }catch(exception){
    next(exception)
  }
})

module.exports = anecdoteRouter