const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const  todolists = require('../contllorer/todolist');

router.route('/')
  .get(catchAsync(todolists.index))
  .post(catchAsync(todolists.new));
router.get('/add',catchAsync(todolists.newCard));
router.get('/:id/add',catchAsync(todolists.newTodo));
router.patch('/:id',catchAsync(todolists.editDonetodo));
router.get('/:listId/:cardId',catchAsync(todolists.doneTodo));
router.patch('/listedit/:listId',catchAsync(todolists.editTitle));
router.patch('/cardedit/:listId/:cardId',catchAsync(todolists.editTodo));
router.delete('/listdelete/:id',catchAsync(todolists.deleteCard));
router.delete('/carddelete/:id',catchAsync(todolists.deleteTodo));

module.exports = router;
// 不要になった戻すボタンapp.get('/:id/return',async(req,res)=>{
//   const {id} = (req.params)
//   const returntodo = await Donetodo.findByIdAndDelete(id)
//   const newtodo = new Todolist ({content : returntodo.content})
//  await newtodo.save();
//  res.redirect('/show')
// })
