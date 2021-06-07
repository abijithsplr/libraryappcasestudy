const express = require("express");
const loginRouter = express.Router();
const userdata = require('../model/userData');
const currentUserData = require('../model/currentuser');
function login(nav) {

  loginRouter.get('/', (req, res) => {
    // var item ={
    //   username:req.body.username.trim(),
    //   password:req.body.password.trim()
    // }
    // var user =userdata(item);
    // user.save();
    res.render('login', {
      nav,
      title: 'Library',
      head: 'Login',
      newlink: '/signup',
      role: 'guest',
      error:false
    });
  });
  loginRouter.post('/getin', (req, res) => {
    var userlogin = req.body.username.trim();
    var userpassword = req.body.password.trim();
    userdata.findOne({ username: userlogin })
      .then(function (user) {
        if (user.password === userpassword) {

          var item = {
            username: user.username,
            password: user.password,
            role: user.role
          }
          var currentuser = currentUserData(item);
          currentuser.save();
          res.redirect('/')
        }
        else {
          
          res.redirect('/login');
        }
      }).catch(function () {
        res.render('login', {
          nav,
          title: 'Library',
          head: 'Login',
          newlink: '/signup',
          role: 'guest',
          error:true
        });
        // res.redirect('/login');
      })
  });

  loginRouter.get('/signup', (req, res) => {
    res.render('signup', {
      nav,
      title: 'Library',
      head: 'Signup',
      role: 'guest',
      error:false
    });
  });
  loginRouter.post('/signup/getin', (req, res) => {
    var roleofuser = "normaluser";
    var item = {
      username: req.body.username.trim(),
      password: req.body.password.trim(),
      role: roleofuser
    }
    userdata.findOne({ username: req.body.username.trim() } || { password: req.body.password.trim() })
      .then(function (data) {
        if (data === null) {
          var user = userdata(item);
          user.save();
          res.redirect('/login');
        }
        else {
          // res.redirect('/login/signup');
          username =data.username
          res.render('signup', {
            nav,
            title: 'Library',
            head: 'Signup',
            role: 'guest',
            error:true,
            username
          });
          
        }
      })
      .catch()

  });
  return loginRouter;
}
module.exports = login;