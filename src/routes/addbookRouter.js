const express = require("express");
const addbookRouter = express.Router();
const bookdata = require('../model/bookdata');
const fileUpload = require('express-fileupload');
// const upload = multer({ dest: '/public/images' });

function addbook(newnav) {

  addbookRouter.get('/', (req, res) => {
    res.render('addbook', {
      newnav,
      title: 'Library',
      head: 'ADD BOOK',
      action: "add"

    });
  });

  addbookRouter.post('/admin', (req, res) => {
    var item = {
      title: req.body.title.trim(),
      author: req.body.author.trim(),
      genre: req.body.genre.trim(),
      img: req.files.img.name
    }
    let img =req.files.img;
    let uploadPath='.//public/images/'+img.name;
    img.mv(uploadPath, function(err) {
      if (err){

        return res.status(500).send(err);
      }
      else{
        console.log("file uploaded");
      }
    });
    
    var book = bookdata(item);
    book.save();
    res.redirect('/books');
  })
  return addbookRouter;
}
module.exports = addbook;