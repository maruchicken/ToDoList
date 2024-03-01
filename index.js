const mongoose = require('mongoose');
const express = require('express');
const path = require('path');
const override = require('method-override');
const ejsMate = require('ejs-mate')
const session = require('express-session');
const User = require('./models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require ('connect-flash');
const toDoRoutes = require('./routes/todolist');
const userRoutes = require('./routes/user');
mongoose.connect('mongodb://localhost:27017/todolistDB', {
useNewUrlParser: true,
useUnifiedTopology: true})
.then(() => {
  console.log('MongoDBコネクションOK！！');
})
.catch(err => {
  console.log('MongoDBコネクションエラー！！！');
  console.log(err);
});

const app = express();
app.engine('ejs',ejsMate);
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(override('_method'));
app.use(express.static(path.join(__dirname,'public')));
const sessionConfig = {
  secret: 'secret',
  resave : false,
  saveUninitialized:false,
  cookie:{
    httpOnly:true,
    maxAge:1000*60*60*24*7
    }
};
app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  next();
});
app.get('/',(req,res)=>{
  res.render('home');
});
app.use('/show',toDoRoutes);
app.use('/',userRoutes);
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
      err.message = '問題が起きました'
  }
  console.log(err.message)
  res.status(statusCode).render('error', { err });
});
app.listen(2000,()=>{
  console.log(`ポート2000で待受中`);
});
