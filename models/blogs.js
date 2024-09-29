const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5
  },
  url: {
    type: String,
    required: true,
    minlength: 5
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Note', blogSchema)
