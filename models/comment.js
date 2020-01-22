const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const commentSchema = mongoose.Schema({
  comments: [
    {
      type: String
    }
  ],
  anecdoteId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true
  }
})

commentSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

commentSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Comment', commentSchema)