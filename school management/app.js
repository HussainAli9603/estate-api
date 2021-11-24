var PORT = process.env.PORT || 13000;
 let bodyParser = require("body-parser"),
  path = require('path');
express = require("express"),
  passport = require('passport'),
  LocalStrategy = require("passport-local"),
  mongoose = require("mongoose"),
  objectID = require('mongoose').Types.ObjectId,
  bcrypt = require('bcryptjs'),
  cors = require("cors"),
  fs = require('fs'),
  app = require('express')();

var http = require('http');
var server = http.createServer(app);
// var io = require('socket.io').listen(server);
// let Message = require('./models/message');
// let Conversation = require('./models/conversation');
// let AppNotifications = require('./models/notification');
// let User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
index = require('./routes/index');

adminRouter = require('./routes/admin/index');
adminUser = require('./models/adminUser');
Student = require('./models/student');
Teacher = require('./models/teacher');
Parent = require('./models/parent');

let options = {
  priority: 'high',
  timeToLive: 60 * 60 * 24
};


app.use(express.static('/public'));
app.use(express.static(__dirname + '/public', { maxAge: '30 days' }));
app.use(express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/static'));

app.use('/uploads', express.static(__dirname + '/uploads'));
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
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.ifcrw.mongodb.net/schoolmanagement?retryWrites=true&w=majority`,{
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
          console.log('User Not Found with username ' + email);
          return done(null, false, 'no user found');
        }
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          return done(null, user);
        }
        else {
          return done(null, false, 'Incorrect Password.');
        }
      })

  }));
// --------------------------------------Student Passport -------------------------------------
passport.use('student', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
},
  async function (req, email, password, done) { // callback with email and password from our form
    Student.findOne({ 'email': email },
      async function (err, users) {
        if (err)
          return done(err);
        if (!users) {
          return done(null, false, 'no Student found');
        }
        const match = await bcrypt.compare(password, users.password);
        if (match) {
               return done(null, users);
        }
        else {
          return done(null, false, 'Incorrect Password.');
        }
      })

  }));
// ----------------------------------------Student Passport End--------------------------------
// --------------------------------------Teacher Passport -------------------------------------
passport.use('teacher', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
},
  async function (req, email, password, done) { // callback with email and password from our form
    Teacher.findOne({ 'email': email },
      async function (err, users) {
        if (err)
          return done(err);
        if (!users) {
          return done(null, false, 'no Teacher found');
        }
        const match = await bcrypt.compare(password, users.password);
        if (match) {
               return done(null, users);
        }
        else {
          return done(null, false, 'Incorrect Password.');
        }
      })

  }));
// ----------------------------------------Teacher Passport End--------------------------------
// --------------------------------------Parents Passport -------------------------------------
passport.use('parent', new LocalStrategy({
  // by default, local strategy uses username and password, we will override with email
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true // allows us to pass back the entire request to the callback
},
  async function (req, email, password, done) { // callback with email and password from our form
    Parent.findOne({ 'email': email },
      async function (err, users) {
        if (err)
          return done(err);
        if (!users) {
          return done(null, false, 'no Parent found');
        }
        const match = await bcrypt.compare(password, users.password);
        if (match) {
               return done(null, users);
        }
        else {
          return done(null, false, 'Incorrect Password.');
        }
      })

  }));
// ----------------------------------------Teacher Passport End--------------------------------

passport.serializeUser(function (user, done) {
  done(null, user._id);
});
passport.deserializeUser(function (id, done) {
  adminUser.findById({ _id: id }).
  exec(function (err, admin) {
     if (err) return done(err);
     if (admin)return done(null, admin);
     // Student.findById(id, function(err, user) {
     //        done(err, user);
     //    });
      Parent.findById({_id:id}).
     exec(function (err, parent) {
     if (err) return done(err);
     if (parent)return done(null, parent);
     });
    Teacher.findById({_id:id}).
     exec(function (err, teacher) {
     if (err) return done(err);
     if (teacher)return done(null, teacher); 
     });
     Student.findById({_id:id}).
     exec(function (err, student) {
     if (err) return done(err);
     if (student)return done(null, student); 
     }); 
     
  });
 
});
// passport.serializeUser(function (user, done) {
//   done(null, user._id);
// });
// passport.deserializeUser(function (id, done) {
//   Parent.findById({ _id: id }).
//   exec(function (err, admin) {
//      if (err) return done(err);
//      if (admin) return done(null, admin);
     // Student.findById(id, function(err, user) {
     //        done(err, user);
     //    });
     
  // }); });

app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  res.locals.currentUser = req.user;
  next();
});
app.use(cors());
/* app.use(helmet()); */
//app.use(express.static("public"));

app.use(bodyParser.json());
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));


app.use(index);
app.use(adminRouter);

//server.listen(3001);
server.listen(PORT, () => {
  console.log("Server is Listening on port :", PORT);
});
