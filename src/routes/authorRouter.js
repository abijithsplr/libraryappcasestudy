const express = require("express");
const authorRouter = express.Router();
const authordata = require('../model/authordata');
const currentUserData = require('../model/currentuser');
const fs = require('fs');
const fileUpload = require('express-fileupload');
function author(newnav) {
  // {
  //   "authors": [
  //     {
  //       "name": "M. T. Vasudevan Nair",
  //       "language": "Malayalam",
  //       "dob": "15 July 1933 ",
  //       "img": "mt.jpg",
  //       "content": "Madath Thekkepaattu Vasudevan Nair (born 1933),popularly known as MT, is an Indian author, screenplay writer and film director.[1] He is a prolific and versatile writer in modern Malayalam literature, and is one of the masters of post-Independence Indian literature.His debut novel Naalukettu (Ancestral Home- translated to English as The Legacy), wrote at the age of 23, won the Kerala Sahitya Akademi Award in 1958. His other novels include Manju (Mist), Kaalam (Time), Asuravithu (The Prodigal Son - translated to English as The Demon Seed) and Randamoozham (The Second Turn). The deep emotional experiences of his early days have gone into the making of MT's novels. Most of his works are oriented towards the basic Malayalam family structure and culture and many of them were path-breaking in the history of Malayalam literature. His three seminal novels on life in the matriarchal family in Kerala are Naalukettu, Asuravithu, and Kaalam. Randamoozham, which retells the story of the Mahabharatha from the point of view of Bhimasena, is widely credited as his masterpiece."
  //     },
  //     {
  //       "name": "Kamala Surayya",
  //       "language": "English, Malayalam",
  //       "dob": "31 March 1934",
  //       "img": "kamala.jpg",
  //       "content": "Kamala Surayya (born Kamala; 31 March 1934–31 May 2009), popularly known by her one-time pen name Madhavikutty and married name Kamala Das, was an Indian poet in English as well as an author in Malayalam from Kerala, India. Her popularity in Kerala is based chiefly on her short stories and autobiography, while her oeuvre in English, written under the name Kamala Das, is noted for the poems and explicit autobiography. She was also a widely read columnist and wrote on diverse topics including women's issues, child care, politics among others etc."
  //     },
  //     {
  //       "name": "William Shakespear",
  //       "language": "English",
  //       "dob": "26 April 1564",
  //       "img": "330px-Shakespeare.jpg",
  //       "content": "William Shakespeare (26 April 1564 – 23 April 1616) was an English playwright, poet, and actor, widely regarded as the greatest writer in the English language and the world's greatest dramatist.He is often called England's national poet and the Bard of Avon (or simply the Bard)His extant works, including collaborations, consist of some 39 plays154 sonnets, three long narrative poems, and a few other verses, some of uncertain authorship. His plays have been translated into every major living language and are performed more often than those of any other playwright.They also continue to be studied and reinterpreted."
  //     }
  //   ]
  // }




  authorRouter.get('/', (req, res) => {
    authordata.find()
      .then(function (authors) {
        currentUserData.find()
          .then(function (data) {
            if (data == "") {
              // var userrole = "guest"
              // res.render('authors',
              //   {
              //     nav,
              //     title: 'Library',
              //     authors,
              //     role: userrole
              //   });
              res.redirect('/');
            }
            else {
              var userrole = data[0].role;
              res.render('authors',
                {
                  newnav,
                  title: 'Library',
                  authors,
                  role: userrole
                });
            }
          }).catch()
      });
  });

  authorRouter.get('/:i', (req, res) => {
    const id = req.params.i;
    authordata.findOne({ _id: id })
      .then(function (author) {
        currentUserData.find()
          .then(function (data) {
            if (data == "") {
              // var userrole = "guest"
              // res.render('author', {
              //   nav,
              //   title: 'Library',
              //   author,
              //   role: userrole
              // });
              res.redirect('/');
            }
            else {
              var userrole = data[0].role;
              res.render('author', {
                newnav,
                title: 'Library',
                author,
                role: userrole
              });
            }
          }).catch()

      });
  });
  authorRouter.get('/delete/:i', function (req, res) {
    const id = req.params.i;
    authordata.findOne({ _id: id }).then(function (data) {
      fs.unlink('.//public/images/' + data.img, (err) => {
        if (err) {
          throw err;
        }

        console.log("File is deleted.");
      });
    })
    authordata.deleteOne({ _id: id }).then(function () {
      res.redirect('/authors');
    })
  });
  authorRouter.get('/update/:i', function (req, res) {
    const id = req.params.i;
    authordata.findOne({ _id: id }).then(function (data) {
      // console.log(data);
      res.render('addauthor', {
        newnav,
        title: 'Library',
        head: 'ADD AUTHOR',
        author: data,
        action: 'update'
      })
      authorRouter.post('/update/:i', function (req, res) {
        const id = req.params.i;
        // var item = {
        //   title: req.body.title.trim(),
        //   author: req.body.author.trim(),
        //   genre: req.body.genre.trim(),
        //   img: req.body.img
        // }
        // console.log(item);
        let img = req.files.img;
        let uploadPath = './/public/images/' + img.name;
        authordata.findOne({ _id: id }).then(function (data) {
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
        authordata.updateMany({ _id: id }, {
          name: req.body.name.trim(),
          language: req.body.language.trim(),
          dob: req.body.dob.trim(),
          img: req.files.img.name,
          content: req.body.content.trim()
        }).then(function () {
          res.redirect('/authors');
        })

      })
    })

  });
  return authorRouter;
}
module.exports = author;