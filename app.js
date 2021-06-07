const express = require("express");

const app = new express();
const currentUserData = require('./src/model/currentuser');
// const multer = require('multer');
const fileUpload = require('express-fileupload');
const port =process.env.PORT ||5000;
const nav = [
  {
    link: '/login',
    name: 'LOGIN | SIGNUP'
  },
  {
    link: '/books',
    name: 'BOOKS'
  },
  {
    link: '/authors',
    name: 'AUTHORS'

  },
  {
    link: '/addbook',
    name: 'ADD BOOK'
  },
  {
    link: '/addauthor',
    name: 'ADD AUTHOR'
  }
]
const newnav = [
  {
    link: '/logout',
    name: 'LOGOUT'
  },
  {
    link: '/books',
    name: 'BOOKS'
  },
  {
    link: '/authors',
    name: 'AUTHORS'

  },
  {
    link: '/addbook',
    name: 'ADD BOOK'
  },
  {
    link: '/addauthor',
    name: 'ADD AUTHOR'
  }
]


const bookRouter=require('./src/routes/bookRouter')(newnav);
const authorRouter=require('./src/routes/authorRouter')(newnav);
const loginRouter=require('./src/routes/loginRouter')(nav);
const addbookRouter=require('./src/routes/addbookRouter')(newnav);
const addauthorRouter=require('./src/routes/addauthorRouter')(newnav);
const logoutRouter=require('./src/routes/logoutRouter')();
// app.use(express.json());
app.use((fileUpload()));
app.use(express.urlencoded({extended:true}));
// app.use(morgan('dev'));
app.set('view engine', 'ejs');
app.set('views', __dirname + '/src/views');
app.use(express.static('./public'));
app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/login', loginRouter);
app.use('/addbook', addbookRouter);
app.use('/addauthor', addauthorRouter);
app.use('/logout', logoutRouter);
app.get('/', function (req, res) {
  // res.sendFile(__dirname+"/src/views/index.html");
  const currentUserData = require('./src/model/currentuser');
  currentUserData.find()
.then(function(data){
  if (data==""){
    var userrole="guest"
    res.render('index',
    {
      nav,
      title: 'Library',
      head:'Library',
      role:userrole
    });
  }
  else {
    var userrole=data[0].role;
    
    // console.log(nav);
    res.render('index',
    {
      newnav,
      title: 'Library',
      head:'Library',
      role:userrole
    });
  }
}).catch()
  
});

app.listen(port,()=>{
  console.log("Server is ready at port number:"+port);
});