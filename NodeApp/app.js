const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const config = require('./config/database');
const passport = require('passport');
// Connect to Database
mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//Check connection
db.once('open',function(){
console.log('Connected to Mongodb');
});

//Check for DB errors
db.on('error', function(err){
console.log(err);
});

//Init APP
const app = express();

//Bring in models
let Article = require('./models/article');

//Bring in User model
let User = require('./models/user');
//let User = require('./models/user');
//Load View Engine

app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine','pug');

//use Public folder
app.use(express.static(path.join(__dirname,'public')));

// Body parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Express Session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

require('./config/passport')(passport);
  app.use(passport.initialize());
  app.use(passport.session());

app.get('*',function(req, res, next) {
  res.locals.user = req.user || null;
  next();
})


//Add Home
app.get('/', function(req,res) {
  res.render('index.pug', {

  });
});
//Recieved Messages Route
app.get('/rmessages', function(req, res){
  Article.find({}, function(err, articles){
    if (err){
      console.log(err);
    } else {
    res.render('rmessages',{
      title :'Messages',
      articles: articles
    });
   }
 });
});

//Get single article
app.get('/message/:id', function(req,res) {
  Article.findById(req.params.id, function(err,article) {
    res.render('message', {
        article:article

    });
  });
});
//Add Route
app.get('/messages/send', function(req,res) {
  res.render('sendmessage', {
      title:'Add Article'
  });
});

//Add Submit POST Route
app.post('/messages/send', function(req,res) {
/*  req.checkBody('MessageTittle ','kur is requred').notEmpty();
  req.checkBody('MessageFrom','From is requred').notEmpty();
  req.checkBody('Message','Message is requred').notEmpty();

  //Get errors
  let errors = req.validationErrors();

  if(errors){
    res.render('sendmessage',{
      tittle:'Send Message',
      errors:errors
    });
  } else { */
      let article = new Article();
      article.MessageTittle = req.body.MessageTittle;
      article.MessageFrom = req.user._id;
      article.Message = req.body.Message;

      article.save(function(err) {
    if(err){
      console.log(err);
      return;
      } else {
      req.flash('success','Message Added')
      res.redirect('/');
    }
  })
//}
});

//Rot13 Page
app.get('/rot13/', function(req,res) {
  res.render('rot13', {
      title:'ROT13'
  });
});

//Bacon Page
app.get('/baconian/', function(req,res) {
  res.render('baconian', {
      title:'Baconian Cipher'
  });
});

// Delete Message
app.get('/message/delete/:id', function(req, res){
     Article.findByIdAndRemove(req.params.id, function(err, message){
       res.redirect('/');
     });
   });

//signup Form
app.get('/signup',function(req, res) {
  res.render('signup');
});

app.post('/signup', function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('signup', {
      errors:errors
    })
  } else {
    let newUser = new User ({
      name:name,
      email:email,
      username:username,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt,function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            req.flash('error','Username not unique ')
            res.render('signup', {
              err:err
            });
          } else {
            req.flash('success','You are now registered ')
            res.redirect('/login')
          }
        });
      });
    });
  }
});

//login Form
app.get('/login',function(req, res) {
  res.render('login');
});

//login proccess
app.post('/login',function(req, res, next){
  passport.authenticate('local', {
  successRedirect:'/',
  failureRedirect:'/login',
  failureFlash: true
})(req,res,next);
});



app.get('/logout', function(req, res){
  req.logout();
  req.flash('success','You are logged out');
  res.redirect('/login');
})

//Start server
app.listen(3000, function() {
console.log('Server Started on port 3k')
});
