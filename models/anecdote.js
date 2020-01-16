const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

const anecdoteSchema = mongoose.Schema({
  content: {type: String, required: true, unique: true},
  author: {type: String},
  info: {type: String, required: true, unique: true},
  votes: Number
})

anecdoteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

anecdoteSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Anecdote', anecdoteSchema)