const mongoose = require('mongoose');
const { Schema } = mongoose;


const donetodoSchema = new Schema({
  content: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
 });
const Donetodo = mongoose.model('Donetodo', donetodoSchema);

module.exports = Donetodo;