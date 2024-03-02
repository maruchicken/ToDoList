const Donetodo = require('../models/donetodo');
const Board = require('../models/board');

module.exports.index = async(req,res)=>{
  const alllists = await Board.find({}).populate('author');
  const donetodos = await Donetodo.find({}).populate('author');
  res.render('show',{alllists,donetodos});
};
module.exports.new = async(req,res)=>{
  const newtodo = new Board(req.body);
  await newtodo.save();
  res.redirect('/show');
}
module.exports.newCard = async(req,res)=>{
  const newList = new Board({listTitle:'新規'});
  newList.author = req.user._id;
  await newList.save();
  res.redirect('/show');
};
module.exports.newTodo = async(req,res)=>{
  const {id} = (req.params);
  const board = await Board.findById(id);
  board.card.push({content:'新規'});
  await board.save();
  res.redirect('/show');
};
module.exports.doneTodo = async(req,res)=>{
  const {listId} = (req.params);
  const {cardId} = (req.params);
  const donecards = await Board.findByIdAndUpdate(listId,{$pull:{card:{_id : cardId}}});
  await donecards.save();
  const donecard = donecards.card.find((item)=>item._id.toHexString() === cardId);
  const newdonetodo = new Donetodo({content : donecard.content,author : req.user._id});
  await newdonetodo.save();
  res.redirect('/show');
};
module.exports.editTitle = async(req,res)=>{
  const {listId} = (req.params);
  const newtitle = await Board.findByIdAndUpdate(listId,{listTitle:req.body.listTitle});
  await newtitle.save();
  res.redirect('/show');
};
module.exports.editTodo = async(req,res)=>{
  const {listId} = (req.params);
  const {cardId} = (req.params);
  const currentlist  = await Board.findById(listId);
  const currentcard = currentlist.card.find((item)=>item._id.toHexString() === cardId);
  currentcard['content'] = req.body.content;
  await currentlist.save();
  res.redirect('/show');
};
module.exports.deleteCard = async(req,res)=>{
  const {id} = (req.params);
  const donelist = await Board.findByIdAndDelete(id,{});
  res.redirect('/show');
};
module.exports.editDonetodo = async(req,res)=>{
  const {id} = (req.params);
  const newtodo = await Donetodo.findByIdAndUpdate(id,{content:req.body.content});
  await newtodo.save();
  res.redirect('/show');
};
module.exports.deleteTodo = async(req,res)=>{
  const {id} = (req.params);
  await Donetodo.findByIdAndDelete(id);
  res.redirect('/show');
};