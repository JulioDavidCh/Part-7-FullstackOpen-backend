const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/:id', async (req, res, next) => {
  const anecdoteId = req.params.id
  const ourComments = await Comment.findOne({ anecdoteId })

  res.json(ourComments)
})

module.exports = commentsRouter