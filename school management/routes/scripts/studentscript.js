// let User = require("../../models/user");
let NotesBoard = require('../../models/online_notes_board');
let OnlineApp = require('../../models/online_application');
let Complain = require('../../models/complain');
let ExamSchedule = require('../../models/exam');
let ExamGrade = require('../../models/examGrade');
let Homework = require('../../models/homeworks');
let Books = require('../../models/books');
let Setting = require('../../models/setting');
let Result = require('../../models/result');
let Message = require('../../models/message');


let options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

const saltRounds = 10;
module.exports = {
  GetLogin: async function (req, res) {
    res.render('login/student');
  },
  GetDashboard: async function (req, res) {
    var sett = await Setting.find({}).sort('-createdAt');
    res.render('students/index',{
      sett:sett,
    	student:req.user
    });
  },
   GetDashboard1: async function (req, res) {
    var sett = await Setting.find({}).sort('-createdAt');
    res.render('students/dashboard',{
    	student:req.user,
      sett:sett
    });
  },
  GetProfile: async function (req, res) {
    var sett = await Setting.find({}).sort('-createdAt');
    res.render('students/profile',{
    	student:req.user,
      sett:sett
    });
  },
    GetLogout: async (req, res) => {
      try {
        let user = await Student.findOne({ _id: req.user._id });
        if (!user) {
          return res.send({ Success: false, message: "User not found" });
        } else {
            req.logout();
            req.session.destroy((err) => {
               res.redirect('/student/login');
            });
        }
      } catch (err) {
        console.log(err);
        res.send({ Success: false, err });
      }
    },
       GetResetPassword:async (req,res)=>{
      let sett = await Setting.find({}).sort('-createdAt');
      res.render('students/reset-password',{
        sett:sett,
        student:req.user,
      })
     },
     PostResetPassword:async (req,res)=>{
      var student = await Student.findOne({_id:req.user.id});

       let salt = bcrypt.genSaltSync(saltRounds);
      
       let hash = bcrypt.hashSync(req.body.resetPassword, salt);
       student.password = hash;
       console.log(student)
       student.save();
       res.redirect('/student/dashboard')

     },
  GetNotesBoards: async function (req, res) {
  	var notesBoard = await NotesBoard.find({}).sort('-createdAt');
    var sett = await Setting.find({}).sort('-createdAt');
    res.render('students/notice-board',{
    	notesBoard:notesBoard,
    	student:req.user,
      sett:sett
    });
  },
   GetAttendence: async function (req, res) {
     var studentss = await Student.find({_id:req.user.id}).sort('-createdAt').limit(31);
    var sett = await Setting.find({}).sort('-createdAt');
    res.render('students/student-attendence',{
      studentss:studentss, 
    	student:req.user,
      sett:sett
    });
  },

  GetOnlineApplicationApprove: async function (req, res) {
    var firstName = req.user.firstName;
    var lastName = req.user.lastName;
    var fullName = req.user.firstName + "" + req.user.lastName;
  	var onlineApp = await OnlineApp.find({studentName:fullName}).sort('-createdAt');
    var sett = await Setting.find({}).sort('-createdAt');
    res.render('students/applicationapproval',{
    	onlineApp:onlineApp,
    	student:req.user,
      sett:sett
    });
  },
   GetOnlineApplication: async function (req, res) {
    var sett = await Setting.find({}).sort('-createdAt');
    res.render('students/stdonlineapplication',{
      student:req.user,
      sett:sett
    });
  },

  CreateOnlineApplication: async function (req, res) {
    var myString2 = req.user.firstName;
        var myString21 = req.user.lastName;
        var thirdParty = myString2 +""+myString21;
        console.log(thirdParty) 
        var addComplainBy = thirdParty.replace(/\s+/g, '-');
      let onlineApp = new OnlineApp();
      onlineApp.studentName = addComplainBy;
	    onlineApp.title = req.body.title;
	    onlineApp.applicationFor = req.body.appFor;
	    onlineApp.contactNumber = req.body.contactNumber;
	    onlineApp.studentId = req.user.id;
	    onlineApp.bio = req.body.message;
	    
	     if (req.files && req.files.image) {
	            let dir = './public/uploads/applicationPic/';
	            if (!fs.existsSync(dir)) {
	                await fs.mkdirSync(dir, { recursive: true });
	            }

	            let applicationFile = req.files.image;
	            let nowDate = Date.now();
	            let iconUrl = dir + nowDate / 1000 + "" + applicationFile.name;

	            await applicationFile.mv(iconUrl, async function (err) {
	                if (err)
	                    console.log(err);
	            });

	            imagePath = iconUrl.substring(9);
	            onlineApp.image = imagePath
	        }


	    console.log(onlineApp)
	    onlineApp.save(async function (err, user) {
	      if (err) {
	        res.send(err);
	      } else {
	        res.redirect('/student/online-application');
	      }
	    });
  },

  GetComplain: async function (req, res) {
		// var notesBoard = await NotesBoard.find({}).sort('-createdAt');
    var sett = await Setting.find({}).sort('-createdAt');
     res.render('students/add_complaint',{
		// notesBoard:notesBoard,
		student:req.user,
    sett:sett
	});
	},
  GetAllComplain: async function (req, res) {
    var firstName = req.user.firstName;
    var lastName = req.user.lastName;
    var fullName = req.user.firstName + "" + req.user.lastName;
       console.log(fullName)
       var sett = await Setting.find({}).sort('-createdAt');
    var allComplian = await Complain.find({studentName:fullName});
     res.render('students/all_complain',{
      allComplian:allComplian,
      student:req.user,
      sett:sett
     });
  },

  CreateComplain: async function (req, res) {
        // var myString = req.body.stdName;
        // var addStudent = myString.replace(/\s+/g, '');
        var myString2 = req.user.firstName;
        var myString21 = req.user.lastName;
        var thirdParty = myString2 +""+myString21;
        console.log(thirdParty) 
        var addComplainBy = thirdParty.replace(/\s+/g, '-');
      let complain = new Complain();
      complain.studentName = addComplainBy;
      complain.complainFor = req.body.complainFor;
      complain.complainBy = addComplainBy;
      complain.class = req.user.class;
      complain.section = req.user.section;
      complain.parent = req.user.parent;
      complain.email = req.body.email.toLowerCase().replace(/\s/g, "");
      complain.contactNumber = req.user.contactNumber;
      complain.studentId = req.user._id;
      complain.parentId = req.user._id;
      complain.bio = req.body.message;
      
       if (req.files && req.files.image) {
              let dir = './public/uploads/complainPic/';
              if (!fs.existsSync(dir)) {
                  await fs.mkdirSync(dir, { recursive: true });
              }

              let complainFile = req.files.image;
              let nowDate = Date.now();
              let iconUrl = dir + nowDate / 1000 + "" + complainFile.name;

              await complainFile.mv(iconUrl, async function (err) {
                  if (err)
                      console.log(err);
              });

              imagePath = iconUrl.substring(9);
              complain.image = imagePath
          }


      console.log(complain)
      complain.save(async function (err, user) {
        if (err) {
          res.send(err);
        } else {
          res.redirect('/student/complain');
        }
      });
   },

  GetAppAproval:async function(req,res){
    // var findStudent = await Student.findOne({_id:req.user.id})
    var sett = await Setting.find({}).sort('-createdAt');
  	 res.render('students/applicationapproval',{
  	 	student:req.user,
      sett:sett
  	 })
  },

  GetExamSchedule:async function(req,res){
    var examSchedule = await ExamSchedule.find({}).sort('-createdAt');
    var sett = await Setting.find({}).sort('-createdAt');
  	 res.render('students/exam-schedule',{
  	 	examSchedule:examSchedule,
  	 	student:req.user,
      sett:sett
  	 })
  },
  GetExamGrade:async function(req,res){
  	var examGrade = await ExamGrade.find({}).sort('-createdAt');
    var sett = await Setting.find({}).sort('-createdAt');
  	 res.render('students/exam-grade',{
  	 	examGrade:examGrade,
  	 	student:req.user,
      sett:sett
  	 })
  },

   GetHomeWorks: async function (req, res) {
    var homework = await Homework.find({Class:req.user.class,section:req.user.section}).sort('-createdAt').limit(5);
   var sett = await Setting.find({}).sort('-createdAt');
    res.render('students/homework',{
      homework:homework,
      student:req.user,
      sett:sett
    });
  },

   GetAllBook: async function (req, res) {
      var allBooks = await Books.find({class:req.user.class}).sort('-createdAt');
      var sett = await Setting.find({}).sort('-createdAt');
      console.log(allBooks)
        res.render('students/all_Books',{
          allBooks:allBooks,
          student:req.user,
          sett:sett

        });
    },

   GetResult: async function (req, res) {
    var stdResult = await Result.find({class:req.user.class,section:req.user.section}).sort('-createdAt').limit(5);
   var sett = await Setting.find({}).sort('-createdAt');
    res.render('students/result',{
      stdResult:stdResult,
      student:req.user,
      sett:sett
    });
  },

    GetAllMessage:async function(req,res){
    var myString2 = req.user.firstName;
        var myString21 = req.user.lastName;
        var thirdParty = myString2 +""+myString21;
        var addMessageBy = thirdParty.replace(/\s+/g, '');
        console.log(addMessageBy)
    let message = await Message.find({sendTo:"Student",recName:addMessageBy}).sort('-createdAt');
    let message1 = await Message.find({messageBy:addMessageBy}).sort('-createdAt');
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('message/student-message',{
      message:message,
      message1:message1,
      student:req.user,
      sett:sett
    })
  },
   message:async function(req,res){
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('students/messaging',{
      student:req.user,
      sett:sett
    })
  },

  CreateMessage: async function (req, res) {
   var myString2 = req.user.firstName;
        var myString21 = req.user.lastName;
        var thirdParty = myString2 +""+myString21;
        var recName = req.body.recName;
        var addMessageBy = thirdParty.replace(/\s+/g, '-');
        var addrecName = recName.replace(/\s+/g, '-');
      let newMessage = new Message();
      newMessage.messageBy = addMessageBy;
      newMessage.recName = recName;
      newMessage.title = req.body.title;
      newMessage.recipient = req.body.recipient;
      newMessage.sendTo = req.body.sendTo;
      newMessage.message = req.body.message;

      console.log(newMessage)
      newMessage.save(function (err, user) {
          if (err) res.send(err);
          res.redirect('/student/get/all-message')
      })
  },


   GetForgotPassword:async function(req,res){
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('login/student-forgot',{
      student:req.user,
      sett:sett
    })
  },

  CreateForgotPassword: async function (req, res) {
    var aAdminUser = await Student.findOne({email:req.body.email});
   if(aAdminUser){
       let salt = bcrypt.genSaltSync(saltRounds);
      
      let hash = bcrypt.hashSync(req.body.password, salt);
      aAdminUser.password = hash;

      aAdminUser.save(function (err, user) {
          if (err) res.send(err);
          res.redirect('/student/login')
      })
    }else{
     res.send("Email Not Found")
    }
  },

}





