const express = require("express");
const bookdata = require('../model/bookdata');
const currentUserData = require('../model/currentuser');
const bookRouter = express.Router();
const fs = require('fs');
const fileUpload = require('express-fileupload');

function router(newnav) {

  // {
  //   "books": [
  //     {
  //       "title": "Tom and jerry",
  //       "author": "Joseph Barbera",
  //       "genre": "Cartoon",
  //       "img": "tom and jerry.jpg"
  //     },
  //     {
  //       "title": " Harry Potter",
  //       "author": "J K Rowling",
  //       "genre": "Fantasy",
  //       "img": "harry.jpg"
  //     },
  //     {
  //       "title": "Pathumayude addu",
  //       "author": "Basheer",
  //       "genre": "Drama",
  //       "img": "basheer.jpg"
  //     }
  //   ]
  // }


  bookRouter.get('/', function (req, res) {

    bookdata.find()
      .then(function (books) {
        // res.sendFile(__dirname+"/src/views/index.html");

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
              res.render('books',
                {
                  newnav,
                  title: 'Library',
                  books,
                  role: userrole
                });
            }
          }).catch()

      });
  });
  bookRouter.get('/:i', function (req, res) {
    const id = req.params.i;
    bookdata.findOne({ _id: id })
      .then(function (book) {
        currentUserData.find()
          .then(function (data) {
            if (data == "") {
              // var userrole = "guest"
              // res.render('book',
              //   {
              //     nav,
              //     title: 'Library',
              //     book,
              //     role: userrole
              //   });
              res.redirect('/');
            }
            else {
              var userrole = data[0].role;
              res.render('book',
                {
                  newnav,
                  title: 'Library',
                  book,
                  role: userrole
                });
            }
          }).catch()

      });
  });
  bookRouter.get('/delete/:i', function (req, res) {
    const id = req.params.i;
    bookdata.findOne({ _id: id }).then(function (data) {
      fs.unlink('.//public/images/' + data.img, (err) => {
        if (err) {
          throw err;
        }

        console.log("File is deleted.");
      });
    })
    bookdata.deleteOne({ _id: id }).then(function (data) {

      res.redirect('/books');
    })

  });
  bookRouter.get('/update/:i', function (req, res) {
    const id = req.params.i;
    bookdata.findOne({ _id: id }).then(function (data) {
      console.log(data);
      res.render('addbook', {
        newnav,
        title: 'Library',
        head: 'ADD BOOK',
        book: data,
        action: 'update'
      })
      bookRouter.post('/update/:i', function (req, res) {
        const id = req.params.i;
        // var item = {
        //   title: req.body.title.trim(),
        //   author: req.body.author.trim(),
        //   genre: req.body.genre.trim(),
        //   img: req.files.img.name
        // }
        let img = req.files.img;
        let uploadPath = './/public/images/' + img.name;
        bookdata.findOne({ _id: id }).then(function (data) {
          if (data.img != req.files.img.name) {
            fs.unlink('.//public/images/' + data.img, (err) => {
              if (err) {
                throw err;
              }
              console.log("File is deleted.");
            });
          }
        })
        img.mv(uploadPath, function (err) {
          if (err) {

            return res.status(500).send(err);
          }
          else {
            console.log("file uploaded");
          }
        });
        bookdata.updateMany({ _id: id }, {
          title: req.body.title.trim(),
          author: req.body.author.trim(),
          genre: req.body.genre.trim(),
          img: req.files.img.name
        }).then(function () {
          res.redirect('/books');
        })

      })
    })

  });

  return bookRouter;
}
module.exports = router;