// let User = require("../../models/user");
let NotesBoard = require('../../models/online_notes_board');
let OnlineApp = require('../../models/online_application');
let Complain = require('../../models/complain');
let ExamSchedule = require('../../models/exam');
let ExamGrade = require('../../models/examGrade');
let Homework = require('../../models/homeworks');
let Attendance = require('../../models/attendance');
let StudentResult = require('../../models/student_result');
let Student = require('../../models/student');
let Setting = require('../../models/setting');
let Message = require('../../models/message');

let options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

const saltRounds = 10;
module.exports = {
  GetLogin: async function (req, res) {
    res.render('login/teacher');
  },
  GetDashboard: async function (req, res) {
    var sett = await Setting.find({}).sort('-createdAt'); 
    console.log(sett) 
    res.render('teachers/index',{
      sett:sett,
    	teacher:req.user
    });
  },
  //  GetDashboard1: async function (req, res) {
  //   res.render('teachers/dashboard',{
  //   	student:req.user
  //   });
  // },
  GetProfile: async function (req, res) {
    var sett = await Setting.find({}).sort('-createdAt'); 
    res.render('teachers/profile',{
    	teacher:req.user,
      sett:sett
    });
  },
     GetResetPassword:async (req,res)=>{
      let sett = await Setting.find({}).sort('-createdAt');
      res.render('teachers/reset-password',{
        sett:sett,
        teacher:req.user,
      })
     },
     PostResetPassword:async (req,res)=>{
      var teacher = await Teacher.findOne({_id:req.user.id});

       let salt = bcrypt.genSaltSync(saltRounds);
      
       let hash = bcrypt.hashSync(req.body.resetPassword, salt);
       teacher.password = hash;
       console.log(teacher)
       teacher.save();
       res.redirect('/teacher/dashboard')

     },
  GetLogout: async (req, res) => {
      try {
        let user = await Teacher.findOne({ _id: req.user._id });
        if (!user) {
          return res.send({ Success: false, message: "User not found" });
        } else {
            req.logout();
            req.session.destroy((err) => {
               res.redirect('/teacher/login');
            });
        }
      } catch (err) {
        console.log(err);
        res.send({ Success: false, err });
      }
    },
  GetNotesBoards: async function (req, res) {
  	var notesBoard = await NotesBoard.find({}).sort('-createdAt');
    var sett = await Setting.find({}).sort('-createdAt'); 
    res.render('teachers/notice-board',{
    	notesBoard:notesBoard,
    	teacher:req.user,
      sett:sett
    });
  },
  GetHomeWorks: async function (req, res) {
    var homework = await Homework.find({}).sort('-createdAt').limit(5);
    var sett = await Setting.find({}).sort('-createdAt'); 
    res.render('teachers/homework',{
      homework:homework,
      teacher:req.user,
      sett:sett
    });
  },
  GetAddHomeWorks:async function (req, res) {
    var sett = await Setting.find({}).sort('-createdAt'); 
    res.render('teachers/add_homeworks',{
      teacher:req.user,
      sett:sett
    });
  },
  CreateHomeWorks: async function (req, res) {
      let homework = new Homework();
      homework.teacherName = req.body.teacherName;
      homework.homeworkType = req.body.homeworkType;
      homework.Class = req.body.class;
      homework.section = req.body.section;
      homework.message = req.body.message;
      
       if (req.files && req.files.image) {
              let dir = './public/uploads/homeworksPic/';
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
              homework.image = imagePath
          }


      console.log(homework)
      homework.save(async function (err, user) {
        if (err) {
          res.send(err);
        } else {
          res.redirect('/teacher/get/home-work');
        }
      });
  },
 GetAddResults: async function (req, res) {
  var sett = await Setting.find({}).sort('-createdAt'); 
    var stdResult = await StudentResult.find({teacherId:req.user._id}).sort('-createdAt').limit(5);
    res.render('teachers/all_result',{
      stdResult:stdResult,
      teacher:req.user,
      sett:sett
    });
  },
  PostAddResults:async function (req, res) {
    var sett = await Setting.find({}).sort('-createdAt'); 
    res.render('teachers/result',{
      teacher:req.user,
      sett:sett
    });
  },//
  CreateSTDResult: async function (req, res) {
      var obtMarks = req.body.obtMarks / req.body.totalMarks * 100;
       var myString = req.body.parent;
        var addParent = myString.replace(/\s+/g, '');
      console.log(obtMarks); 
      let stdResult = new StudentResult();
      stdResult.stdName = req.body.stdName;
      stdResult.ExamName = req.body.examName;
      stdResult.class = req.body.class;
      stdResult.rollNumber = req.body.rollNumber;
      stdResult.parent = addParent;
      stdResult.subject = req.body.subject;
      stdResult.obtMarks = req.body.obtMarks;
      stdResult.totalMarks = req.body.totalMarks;
      stdResult.teacherId = req.user.id;
      stdResult.grade = req.body.grade;
      stdResult.comment = req.body.comment;
    
      console.log(stdResult)
      stdResult.save(async function (err, user) {
        if (err) {
          res.send(err);
        } else {
          res.redirect('/teacher/post/add/result');
        }
      });
  },



   GetAttendence: async function (req, res) {
    var sett = await Setting.find({}).sort('-createdAt'); 
  	var attendance = await Attendance.find({subject:req.user.subject}).sort('-createdAt').limit(31);
    var student = await Student.find({class:req.user.class}).sort('-createdAt').limit(31);

    console.log(student.presentORabsent)
    res.render('teachers/student-attendence',{
      attendance:attendance,
      student:student,
    	student1:student.presentORabsent,
    	teacher:req.user,
      sett:sett
    });
  },
   GetAddAttendence: async function (req, res) {
    var sett = await Setting.find({}).sort('-createdAt'); 
    res.render('teachers/add_attendance',{
      teacher:req.user,
      sett:sett
    });
  },
  GetEditAttendence: async function (req, res) {
    var sett = await Setting.find({}).sort('-createdAt'); 
    res.render('teachers/edit_attendance',{
      teacher:req.user,
      sett:sett,
      roll:req.params.roll,
      id:req.params.id,
    });
  },
  PostEditAttendence: async function (req, res) {
    var student = await Student.updateOne({roll:req.params.roll},{
      $pull:{
          "presentORabsent":{
            _id:req.params.id
          }
      }
    });
    console.log(student)
    res.redirect('/teacher/student/attendence')
  },
  CreateAttendence: async function (req, res) {
      let attendance = new Attendance();
      attendance.studentName = req.body.studentName;
      attendance.section = req.body.section;
      attendance.class = req.body.class;
      attendance.roll = req.body.roll;
      attendance.subject = req.body.subject;
      attendance.presentORabsent = req.body.presentORabsent;
      attendance.teacherId = req.user.id;
      attendance.date = req.body.date;

      console.log(attendance)
      attendance.save(async function (err, user) {
        if (err) {
          res.send(err);
        } else {
          console.log(user.roll)
          if(user.presentORabsent == "Present"){
          var studentAtt = await Student.updateOne({roll:user.roll},
              { $push:{
                      presentORabsent:{
                        present:"true"
                      }
                    }})
                console.log(studentAtt)
            res.redirect('/teacher/get/add/attendence');
        
           }else{
              var studentAtt = await Student.updateOne({roll:user.roll},
             {$push:{
                   presentORabsent:{
                     present:"false"
                   }
                 }})
            res.redirect('/teacher/get/add/attendence');
           }
         }
          
      });
  },


  GetOnlineApplicationApprove: async function (req, res) {
    var firstName = req.user.firstName;
    var lastName = req.user.lastName;
    var fullName = req.user.firstName + "" + req.user.lastName;
    var onlineApp = await OnlineApp.find({studentName:fullName}).sort('-createdAt');
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('teachers/applicationapproval',{
      onlineApp:onlineApp,
      teacher:req.user,
      sett:sett
    });
  },
   GetOnlineApplication: async function (req, res) {
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('teachers/add_onlineapplication',{
      teacher:req.user,
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
      onlineApp.email = req.body.email.toLowerCase().replace(/\s/g, "");
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
          res.redirect('/teacher/online-application');
        }
      });
  },

  GetComplain: async function (req, res) {
     let sett = await Setting.find({}).sort('-createdAt');
     var complain = await Complain.find({}).sort('-createdAt').limit(6);
     res.render('teachers/complaint',{
       complain:complain,
       sett:sett,
		   teacher:req.user,
	});
	},
   GetAddComplain: async function (req, res) {
     let sett = await Setting.find({}).sort('-createdAt');
     res.render('teachers/add_complaint',{
       sett:sett,
       teacher:req.user,
  });
  },

  CreateComplain: async function (req, res) {
      let complain = new Complain();
	    complain.studentName = req.body.stdName;
	    complain.complainFor = req.body.complainFor;
	    complain.email = req.body.email.toLowerCase().replace(/\s/g, "");
	    complain.contactNumber = req.body.contactNumber;
	    complain.studentId = req.user.id;
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
	        res.redirect('/teacher/complain');
	      }
	    });
  },

  GetAppAproval:async function(req,res){
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


    GetAllMessage:async function(req,res){
        var myString2 = req.user.firstName;
        var myString21 = req.user.lastName;
        var thirdParty = myString2 +""+myString21;
        var addMessageBy = thirdParty.replace(/\s+/g, '');
        console.log(addMessageBy)
    let message = await Message.find({sendTo:"Teacher",recName:addMessageBy}).sort('-createdAt');
    let message1 = await Message.find({messageBy:addMessageBy}).sort('-createdAt');
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('message/teacher-message',{
      message:message,
      message1:message1,
      teacher:req.user,
      sett:sett
    })
  },
   message:async function(req,res){
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('teachers/messaging',{
      teacher:req.user,
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
          res.redirect('/teacher/get/all-message')
      })
  },


   GetForgotPassword:async function(req,res){
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('login/teacher-forgot',{
      student:req.user,
      sett:sett
    })
  },

  CreateForgotPassword: async function (req, res) {
    var aAdminUser = await Teacher.findOne({email:req.body.email});
   if(aAdminUser){
       let salt = bcrypt.genSaltSync(saltRounds);
      
      let hash = bcrypt.hashSync(req.body.password, salt);
      aAdminUser.password = hash;

      aAdminUser.save(function (err, user) {
          if (err) res.send(err);
          res.redirect('/teacher/login')
      })
    }else{
     res.send("Email Not Found")
    }
  },



}






