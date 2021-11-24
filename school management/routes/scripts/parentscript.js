// let User = require("../../models/user");
let Student = require("../../models/student");
let Expense = require("../../models/expenses");
let Complain = require("../../models/complain");
let Parent = require("../../models/parent");
let StudentResult = require('../../models/student_result');
let HomeWorks = require('../../models/homeworks');
let Attendance = require('../../models/attendance');
let Hostel = require('../../models/hostel');
let Exam = require('../../models/exam');
let Setting = require('../../models/setting');
let Message = require('../../models/message');



let options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

const saltRounds = 10;
module.exports = {
  ParentDashboard: async function (req, res) {
    var sett = await Setting.find({}).sort('-createdAt');
    res.render('parents/index',{
      sett:sett,
      parent:req.user
    })
  },
  ParentDashboard1: async function (req, res) {
   	 var firstName = req.user.firstName;
  	 var lastName = req.user.lastName;
  	 var fullName = req.user.firstName + "" + req.user.lastName;

      var KidsExpenses = await Expense.find({parent:fullName});
      var KidsDetails = await Student.find({parent:fullName});
      var allDue = await Expense.findOne({parent:fullName,status:"Due"});
      var allKidResult = await StudentResult.find({parent:fullName});
    var sett = await Setting.find({}).sort('-createdAt');

   
	    res.render('parents/index4',{
	    	KidsExpenses:KidsExpenses,
        KidsDetails:KidsDetails,
	    	allKidResult:allKidResult,
	    	allDue:allDue,
	    	parent:req.user,
        sett:sett
	    })
  },
  ParentLogin: async function (req, res) {
    res.render('login/parents')
  },

    GetLogout: async (req, res) => {
      try {
        let user = await Parent.findOne({ _id: req.user._id });
        if (!user) {
          return res.send({ Success: false, message: "User not found" });
        } else {
            req.logout();
            req.session.destroy((err) => {
               res.redirect('/parent/login');
            });
        }
      } catch (err) {
        console.log(err);
        res.send({ Success: false, err });
      }
    },

     GetResetPassword:async (req,res)=>{
      let sett = await Setting.find({}).sort('-createdAt');
      res.render('parents/reset-password',{
        sett:sett,
        parent:req.user,
      })
     },
     PostResetPassword:async (req,res)=>{
      var parent = await Parent.findOne({_id:req.user.id});

       let salt = bcrypt.genSaltSync(saltRounds);
      
       let hash = bcrypt.hashSync(req.body.resetPassword, salt);
       parent.password = hash;
       console.log(parent)
       parent.save();
       res.redirect('/parent/dashboard')

     },

   GetComplain:async function(req,res){
    var sett = await Setting.find({}).sort('-createdAt');
   	 res.render('parents/complaint',{
      sett:sett,
      parent:req.user
     })
   },
   GetAllComplain:async function(req,res){
   	 var firstName = req.user.firstName;
  	 var lastName = req.user.lastName;
  	 var fullName = req.user.firstName + "" + req.user.lastName;
   	var allComplian = await Complain.find({parent:fullName});
    var sett = await Setting.find({}).sort('-createdAt');
   	 res.render('parents/view_complain',{
   	 	allComplian:allComplian,
   	 	parent:req.user,
      sett:sett
   	 })
   },

   CreateComplain: async function (req, res) {
     var myString = req.body.parent;
        var addParent = myString.replace(/\s+/g, '');
        var myString2 = req.user.firstName;
        var myString21 = req.user.lastName;
        var thirdParty = myString2 +"" +myString21;
        console.log(thirdParty) 
        var addComplainBy = thirdParty.replace(/\s+/g, '-');
      let complain = new Complain();
	    complain.studentName = req.body.stdName;
      complain.complainFor = req.body.complainFor;
      complain.complainBy = addComplainBy;
      complain.class = req.body.class;
      complain.subject = req.body.subject;
	    complain.parent = addParent;
	    complain.email = req.body.email.toLowerCase().replace(/\s/g, "");
	    complain.contactNumber = req.body.contactNumber;
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
	        res.redirect('/parent/complaint');
	      }
	    });
   },
   GetProfile:async function(req,res){
      var firstName = req.user.firstName;
  	  var lastName = req.user.lastName;
  	  var fullName = req.user.firstName + "" + req.user.lastName;
	   	var profile = await Parent.findOne({_id:req.user.id});
	   	var kids = await Student.find({parent:fullName});
      var sett = await Setting.find({}).sort('-createdAt');
	   	 res.render('parents/profile',{
   	 	  profile:profile,
   	 	  kids:kids,
   	 	  parent:req.user,
        sett:sett
   	 })
   },

   GetAllKidsResults: async function (req, res) {
     var firstName = req.user.firstName;
      var lastName = req.user.lastName;
      var fullName = req.user.firstName + "" + req.user.lastName;
    var stdResult = await StudentResult.find({parent:fullName});
    var sett = await Setting.find({}).sort('-createdAt');
    res.render('parents/result',{
      stdResult:stdResult,
      parent:req.user,
      sett:sett
    });
  },
   GethomeWorks:async function(req,res){
      var homeworks = await HomeWorks.find({}).sort('-createdAt').limit(5);
      var sett = await Setting.find({}).sort('-createdAt');
       res.render('parents/homework',{
        homeworks:homeworks,
        parent:req.user,
        sett:sett
     })
   },
   GetAttendence: async function (req, res) {
     var firstName = req.user.firstName;
     var lastName = req.user.lastName;
     var fullName = req.user.firstName + "" + req.user.lastName;
     var student = await Student.find({parent:fullName}).sort('-createdAt').limit(31);
var sett = await Setting.find({}).sort('-createdAt');
    // console.log(student.presentORabsent)
    res.render('parents/attendance',{
      // attendance:attendance,
      student:student,
      parent:req.user,
      sett:sett
    });
  },
  GetHostel: async function (req, res) {
      let Allhostel = await Hostel.find({}).sort('-createdAt');
      var sett = await Setting.find({}).sort('-createdAt');
        res.render('parents/hostel',{
          Allhostel:Allhostel,
          parent:req.user,
          sett:sett
        });
    },

 GetKidsExam: async function (req, res) {
   var allExam = await Exam.find({}).sort('-createdAt');
   var sett = await Setting.find({}).sort('-createdAt');
   res.render('parents/exam-schedule',{
     allExam:allExam,
     sett:sett,
     parent:req.user
   })
},


  GetAllMessage:async function(req,res){
     var myString2 = req.user.firstName;
        var myString21 = req.user.lastName;
        var thirdParty = myString2 +""+myString21;
        var addMessageBy = thirdParty.replace(/\s+/g, '');
        console.log(addMessageBy)
    let message = await Message.find({sendTo:"Parent",recName:addMessageBy}).sort('-createdAt');
    let message1 = await Message.find({messageBy:addMessageBy}).sort('-createdAt');
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('message/parent-message',{
      message:message,
      message1:message1,
      parent:req.user,
      sett:sett
    })
  },
   message:async function(req,res){
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('parents/messaging',{
      parent:req.user,
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
          res.redirect('/parent/get/all-message')
      })
  },

   GetForgotPassword:async function(req,res){
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('login/parent-forgot',{
      parent:req.user,
      sett:sett
    })
  },

  CreateForgotPassword: async function (req, res) {
    var aAdminUser = await Parent.findOne({email:req.body.email});
   if(aAdminUser){
       let salt = bcrypt.genSaltSync(saltRounds);
      
      let hash = bcrypt.hashSync(req.body.password, salt);
      aAdminUser.password = hash;

      aAdminUser.save(function (err, user) {
          if (err) res.send(err);
          res.redirect('/parent/login')
      })
    }else{
     res.send("Email Not Found")
    }
  },




}
