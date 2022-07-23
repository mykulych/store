const { Schema, model } = require('mongoose')

const schema = new Schema({
  name: String,
  category: String,
  images: [String],
  description: String,
  price: String,
  publisher: { type: Schema.Types.ObjectId, ref: 'User' }
}, {
  timestamps: true
})

module.exports = model('Ad', schema)