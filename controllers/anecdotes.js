const anecdoteRouter = require('express').Router()
const Anecdote = require('../models/anecdote')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const User = require('../models/user')

anecdoteRouter.get('/', async (req, res) => {
  const anecdotes = await Anecdote.find({}).populate('user', {username: 1})
  res.json(anecdotes)
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

anecdoteRouter.post('/:id/comments', async (req, res, next) => {
  try{
    const { comment } = req.body
    const anecdoteId = req.params.id

    const anecdoteExist = await Anecdote.findById(anecdoteId)

    if(!anecdoteExist) return res.json({error: `anecdote doesn't exist`})

    const ourComment = await Comment.find({ anecdoteId })
    if(ourComment.length != 0){
      const ourCommentId = ourComment[0]._id
      const { comments } = ourComment[0]
      const ourCommentToUpdate = {
        comments: [...comments, comment],
      }
      await Comment.findByIdAndUpdate(ourCommentId, ourCommentToUpdate)
    }else{
      const ourNewComment = {
        comments: [comment],
        anecdoteId
      }
      const commentToAdd = new Comment(ourNewComment)
      await commentToAdd.save(ourNewComment)

    }

    const updatedComments = await Comment.find({ anecdoteId })

    res.json(updatedComments)

  }catch(exception){
    next(exception)
  }
})


module.exports = anecdoteRouter