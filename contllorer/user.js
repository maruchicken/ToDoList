const User = require('../models/user');

module.exports.renderRegister = async(req,res)=>{
  res.render('user/register');
};
module.exports.register = async(req,res)=>{
  try{
    const {username,email,password} = req.body;
  const user = new User({username,email});
  const registeredUser = await User.register(user, password);
  req.login(registeredUser, err => {
    if (err) return next(err);
    res.redirect('/show');
  })
  }catch(e){
    if(e.message === 'E11000 duplicate key error collection: todolistDB.users index: email_1 dup key: { email: "asoasjkdo@ada" }'){
      e.message = 'メールアドレスが既に使われています'
    }
    req.flash('error', e.message);
    console.log(e.message);
    res.redirect('/register');
  } 
};
module.exports.renderLogin = (req,res)=>{
  res.render('user/login');
};
module.exports.login = (req, res) => {
  res.redirect('/show');
};
module.exports.logout = function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/show');
  })
};