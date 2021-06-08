const express = require("express");
const authordata=require('../model/authordata');
const addauthorRouter = express.Router();
const currentUserData = require('../model/currentuser');
const fileUpload = require('express-fileupload');
function addauthor(newnav) {

  addauthorRouter.get('/', (req, res) => {
    currentUserData.find()
          .then(function (data) {
            if (data == "") {
              // var userrole = "guest"
              // res.render('books',
              //   {
              //     nav,
              //     title: 'Library',
              //     books,
              //     role: userrole
              //   });
              res.redirect('/');
            }
            else {
              var userrole = data[0].role;
              res.render('addauthor', {
                newnav,
                title: 'Library',
                head: 'ADD AUTHOR',
                action:""
              });
            }
          }).catch()
    
  });
  addauthorRouter.post('/admin', (req, res) => {
    var item = {
      name: req.body.name.trim(),
      language: req.body.language.trim(),
      dob: req.body.dob.trim(),
      img: req.files.img.name,
      content: req.body.content.trim()
    }
    let img =req.files.img;
    let uploadPath='.//public/images/'+img.name;
    img.mv(uploadPath, function(err) {
      if (err){
        console.log("file uploaded");
      }
      else{
        console.log("file uploaded");
      }
    });
    var author =authordata(item);
    author.save();
    
    res.redirect('/authors');
  });
  return addauthorRouter;
}
module.exports = addauthor;