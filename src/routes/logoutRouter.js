const express = require("express");
const logoutRouter = express.Router();
// const userdata = require('../model/userdata');
const currentUserData = require('../model/currentuser');
function logout() {
  logoutRouter.get('/',(req,res)=>{
    currentUserData.deleteOne().then(function(){
      res.redirect('/');
    })
    
  });
  return logoutRouter;
}
module.exports=logout;