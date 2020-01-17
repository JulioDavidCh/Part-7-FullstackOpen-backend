const brcrypt = require('bcryptjs')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/', async (req, res, next) => {
  try{
    const body = req.body
    const saltedRound = 10

    if(!body.password){
      let error = Error('Validation error: password field missing')
      error.name = 'ValidationError'
      throw error
    }
    if(body.password.length < 3){
      let error = Error('Validation error: Your password is too short, it must 3 or more characters long')
      error.name = 'ValidationError'
      throw error
    }

    const passwordHash = await brcrypt.hash(body.password, saltedRound)

    const newUser = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })

    const savedUsed = await newUser.save()

    res.json(savedUsed)

  }catch(exception){
    next(exception)
  }
})

module.exports = userRouter