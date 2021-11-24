var PORT = process.env.PORT || 13062;
let multer = require("multer"),
  bodyParser = require("body-parser"),
  path = require('path');
  express = require("express"),
  passport = require('passport'),
  LocalStrategy = require("passport-local"),
  mongoose = require("mongoose"),
  objectID = require('mongoose').Types.ObjectId,
  bcrypt = require('bcryptjs'),
  // cors = require("cors"),
  fs = require('fs'),
  app = require('express')();
var http = require('http');
var server = http.createServer(app);
let jwt = require("jsonwebtoken");
var flash = require('connect-flash');

let User = require('./models/user');
const helmet = require("helmet");

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
index = require('./routes/index');
// cornJobRoute = require('./routes/cronJobs');
adminRouter = require('./routes/admin/index');

adminUser = require('./models/adminuser');
User = require('./models/user');
//old broker id we have to replace with the new one if database is flushed 5ee9b929c837a3191033d601

let options = {
  priority: 'high',
  timeToLive: 60 * 60 * 24
};

app.use(express.static(__dirname + '/public', { maxAge: '30 days' }));

app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/images', express.static(__dirname + '/images'));
// This folder is used for admin side
app.use('/admin', express.static(__dirname + '/admin'));
const fileUpload = require('express-fileupload');
require('dotenv').config();
app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use(fileUpload());

let dbUser = process.env.DB_USERNAME;
let dbPass = process.env.DB_PASSWORD;
// console.log(dbPass)
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.nxjby.mongodb.net/weAlwaysApp?retryWrites=true&w=majority`,{
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
 .then(() => {
    console.log("Connected to the Database");
  })
  .catch(() => {
    console.log("Could not connected to Database");
  });

app.use(require("express-session")({
  secret: "funtime",
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// ---------------------------Admin User Passport--------------------------------
passport.use('local-login', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
},
  async function (req, email, password, done) { // callback with email and password from our form
    adminUser.findOne({ 'email': email },
      async function (err, user) {
        if (err)
          return done(err);
        if (!user) {
           // req.flash('message','User Not Found With Username');
          return done(null, false, 'No User found');
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            user.onlineStatus = 1;
             const token = jwt.sign({id:user.id }, "secretkey",{expiresIn:'1h'});
        
          return done(null, user);
        }
        else {
          // req.flash('message','Password do not match');
          return done(null, false, 'Incorrect Password.');
        }
      })

  }));


passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  adminUser.findById({ _id: id }).
  exec(function (err, admin) {
     if (err) return done(err);
     if (admin) return done(null, admin);
  });
});
app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.locals.user = req.user;
  res.locals.currentUser = req.user;
  next();
});

app.use(flash());

//local variable

app.use((req,res,next)=>{
      res.locals.success = req.flash('success');
      res.locals.danger = req.flash('danger');
      res.locals.message = req.flash('message');
      next();
});



// app.use(cors());/
/* app.use(helmet()); */
//app.use(express.static("public"));

app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));


app.use(index);
app.use(adminRouter);

//server.listen(9000);
server.listen(PORT, () => {
  console.log("Server is Listening on port :", PORT);
});
