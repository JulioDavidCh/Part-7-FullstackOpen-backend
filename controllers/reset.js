const resetRouter = require('express').Router()
const User = require('../models/user')
const Anecdote = require('../models/anecdote')
const Comment = require('../models/comment')

resetRouter.post('/', async (req, res, next) => {
  if(process.env.NODE_ENV !== 'test'){
    return res.status(400).json({error: 'Endpoint only accessible for tests'})
  }
  try{
    await User.deleteMany({})
    await Anecdote.deleteMany({})
    await Comment.deleteMany({})

    res.status(204).end()
  }catch(exception){
    next(exception)
  }
})

module.exports = resetRouter