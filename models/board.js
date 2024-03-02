const mongoose = require('mongoose');
const { Schema } = mongoose;

const boardSchema = new Schema({
  listTitle: String,
  card: [{
    content : String
  }],
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
    }
 });
 const Board = mongoose.model('Board', boardSchema);

 module.exports = Board;