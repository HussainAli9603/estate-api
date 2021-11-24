let adminUser = require('../../../models/adminUser');
let adminRole = require('../../../models/accountAccess');
let AccessAccount = require('../../../models/accountAccess');
let NotesBoard = require('../../../models/online_notes_board');
let OnlineApplication = require('../../../models/online_application');
let ClassTimeTable = require('../../../models/class_time_table');
let Student = require('../../../models/student');
let Teacher = require('../../../models/teacher');
let Parent = require('../../../models/parent');
let Expenses = require('../../../models/expenses');
let Class = require('../../../models/class');
let Exam = require('../../../models/exam');
let ExamGrade = require('../../../models/examGrade');
let Hostel = require('../../../models/hostel');
let Books = require('../../../models/books');
let assignSubject = require('../../../models/assign_subject');
let Complaint = require('../../../models/complain');
let Setting = require('../../../models/setting');
let DMC = require('../../../models/dmc');
let Message = require('../../../models/message');



const saltRounds = 10;
let options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
  };
module.exports = {
    GetDashboard: async function (req, res) {
    	 Promise.all([
            Student.countDocuments({}),
            Teacher.countDocuments({}),
            Setting.find({}).sort('-createdAt'),
            
        ]).then(([student,teacher,sett]) => {
              //console.log(exchangeProduct)
            res.render('admin/index', {student,teacher ,admin:req.user,sett});
        });
    },

    Register: async function (req, res) {
	    let newUser = new adminUser();
	    let defaultProfilePic = "uploads/default-Pic.png";
	    newUser.firstName = req.body.firstName;
	    newUser.lastName = req.body.lastName;
	    newUser.email = req.body.email.toLowerCase().replace(/\s/g, "");
	    newUser.contactNumber = req.body.contactNumber;
	    // newUser.OTPCOde = req.body.userPinCode;
	    newUser.address = req.body.address;
	    newUser.occupation = req.body.occupation;
	    newUser.bio = req.body.bio;
	    newUser.password = req.body.password;
	    newUser.roleId = "Admin";

	    newUser.profilePic = defaultProfilePic;
	    let salt = bcrypt.genSaltSync(saltRounds);
	    
	    let hash = bcrypt.hashSync(req.body.password, salt);
	    newUser.password = hash;
	    
	     if (req.files && req.files.image) {
	            let dir = './public/uploads/adminPic/';
	            if (!fs.existsSync(dir)) {
	                await fs.mkdirSync(dir, { recursive: true });
	            }

	            let adminProfileImage = req.files.image;
	            let nowDate = Date.now();
	            let iconUrl = dir + nowDate / 1000 + "" + adminProfileImage.name;

	            await adminProfileImage.mv(iconUrl, async function (err) {
	                if (err)
	                    console.log(err);
	            });

	            imagePath = iconUrl.substring(9);
	            newUser.image = imagePath
	        }


	    console.log(newUser)
	    newUser.save(async function (err, user) {
	      if (err) {
	        res.send(err);
	      } else {
	        res.render('login/index');
	      }
	    });
  },
    GetLogout: async (req, res) => {
      try {
        let user = await adminUser.findOne({ _id: req.user._id });
        if (!user) {
          return res.send({ Success: false, message: "User not found" });
        } else {
            req.logout();
            req.session.destroy((err) => {
               res.redirect('/');
            });
        }
      } catch (err) {
        console.log(err);
        res.send({ Success: false, err });
      }
    },
    GetResetPassword:async (req,res)=>{
      let sett = await Setting.find({}).sort('-createdAt');
      res.render('admin/reset-password',{
        sett:sett,
        admin:req.user,
      })
     },
     PostResetPassword:async (req,res)=>{
      var adminuser = await adminUser.findOne({_id:req.user.id});

       let salt = bcrypt.genSaltSync(saltRounds);
      
       let hash = bcrypt.hashSync(req.body.resetPassword, salt);
       adminuser.password = hash;
       console.log(adminuser)
       adminuser.save();
       res.redirect('/admin/dashboard')

     },

    GetAccountAccess: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/account-settings',{
        sett:sett,
        admin:req.user
       })
    },

     CreateAccountAccess: async function (req, res) {
        let accessAccount = new AccessAccount();
        accessAccount.firstName = req.body.firstName;
        accessAccount.lastName = req.body.lastName;
        accessAccount.email = req.body.email;
        accessAccount.userType = req.body.userType;
        accessAccount.IdNo = req.body.IdNO;
        console.log(accessAccount)
        accessAccount.save(function (err, user) {
            if (err) res.send(err);
            res.redirect('/admin/get/access-account')
        })
    },

     GetNotesBoard: async function (req, res) {
      var notesBoard = await NotesBoard.find({}).sort('-createdAt');
       let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/notice-board',{
       	 notesBoard:notesBoard,
         sett:sett,
         admin:req.user
       });
    },
     CreateNotesBoard: async function (req, res) {
        let noticeBoard = new NotesBoard();
        noticeBoard.title = req.body.title;
        noticeBoard.details = req.body.details;
        noticeBoard.postedBy = req.body.postedBy ;
        noticeBoard.date = req.body.date;
        console.log(noticeBoard)
        noticeBoard.save(function (err, user) {
            if (err) res.send(err);
            res.redirect('/admin/get/notice-board')
        })
    },

    GetClassTimeTable: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
    	var classTimeTable = await ClassTimeTable.find({}).sort('-createdAt');
       res.render('admin/class-routine',{
       	  classTimeTable:classTimeTable,
          sett:sett,
          admin:req.user
       })
    },
     CreateClassTimeTable: async function (req, res) {
        let classTimeTable = new ClassTimeTable();
        classTimeTable.subjectName = req.body.subjectName;
        classTimeTable.class = req.body.class;
        classTimeTable.subjectCode = req.body.subjectCode ;
        classTimeTable.day = req.body.day;
        classTimeTable.section = req.body.section;
        classTimeTable.teacher = req.body.teacher;
        classTimeTable.time = req.body.time;
        classTimeTable.date = req.body.date;
        classTimeTable.code = req.body.code;

        console.log(classTimeTable)
        classTimeTable.save(function (err, user) {
            if (err) res.send(err);
            res.redirect('/admin/get/class-time-table')
        })
    },

    // ------------------------------------Students Dramas---------------------------------------------

    GetAddStudentPage: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/admit-form',{
        admin:req.user,
        sett:sett
       })
    },
    GetAllStudents: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
       var allStudent = await Student.find({}).sort('-createdAt');
       res.render('admin/all-student',{
         allStudent:allStudent,
         admin:req.user,
         sett:sett
       })
    },
     CreateStudent: async function (req, res) {
        var myString = req.body.parent;
        var addParent = myString.replace(/\s+/g, '');
        let newStudent = new Student();
        newStudent.firstName = req.body.firstName;
        newStudent.lastName = req.body.lastName;
        newStudent.gender = req.body.gender;
        newStudent.email = req.body.email;
        newStudent.contactNumber = req.body.contactNumber;
        newStudent.dateOfBirth = req.body.dateOfBirth;
        newStudent.roll = req.body.roll;
        newStudent.bloodGroup = req.body.bloodGroup;
        newStudent.class = req.body.class;
        newStudent.section = req.body.section;
        newStudent.admissionId = req.body.admissionId;
        newStudent.bio = req.body.bio;
        newStudent.parent = addParent;

        newStudent.address = req.body.address;
        newStudent.roleId = "Student";

	    let salt = bcrypt.genSaltSync(saltRounds);
	    
	    let hash = bcrypt.hashSync(req.body.password, salt);
	    newStudent.password = hash;
	    
          if (req.files && req.files.image) {
	            let dir = './public/uploads/studentPic/';
	            if (!fs.existsSync(dir)) {
	                await fs.mkdirSync(dir, { recursive: true });
	            }

	            let studentProfileImage = req.files.image;
	            let nowDate = Date.now();
	            let imageUrl = dir + nowDate / 1000 + "" + studentProfileImage.name;

	            await studentProfileImage.mv(imageUrl, async function (err) {
	                if (err)
	                    console.log(err);
	            });

	            imagePath = imageUrl.substring(9);
	            newStudent.image = imagePath
	        }
        console.log(newStudent)
        newStudent.save(function (err, user) {
            if (err) res.send(err);
            return res.redirect('/admin/get/student')
        })
    },
// ------------------------------------ Teacher Drama- ---------------------------------------
    GetAddTeacherPage: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/add-teacher',{
        sett:sett,
        admin:req.user
       })
    },
    GetAllTeachers: async function (req, res) {
       var allTeachers = await Teacher.find({}).sort('-createdAt');
        let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/all-teacher',{
         allTeachers:allTeachers,
         sett:sett,
         admin:req.user
       })
    },
    CreateTeacher: async function (req, res) {
        let newTeacher = new Teacher();
        newTeacher.firstName = req.body.firstName;
        newTeacher.lastName = req.body.lastName;
        newTeacher.gender = req.body.gender;
        newTeacher.email = req.body.email;
        newTeacher.contactNumber = req.body.contactNumber;
        newTeacher.dateOfBirth = req.body.dateOfBirth;
        newTeacher.IdNumber = req.body.IdNumber;
        newTeacher.bloodGroup = req.body.bloodGroup;
        newTeacher.class = req.body.class;
        newTeacher.section = req.body.section;
        newTeacher.bio = req.body.bio;
        newTeacher.subject = req.body.subject;
        newTeacher.address = req.body.address;
        newTeacher.roleId = "Teacher";
        let salt = bcrypt.genSaltSync(saltRounds);
      
        let hash = bcrypt.hashSync(req.body.password, salt);
        newTeacher.password = hash;
        
          if (req.files && req.files.image) {
	            let dir = './public/uploads/teacherPic/';
	            if (!fs.existsSync(dir)) {
	                await fs.mkdirSync(dir, { recursive: true });
	            }

	            let teacherProfileImage = req.files.image;
	            let nowDate = Date.now();
	            let imageUrl = dir + nowDate / 1000 + "" + teacherProfileImage.name;

	            await teacherProfileImage.mv(imageUrl, async function (err) {
	                if (err)
	                    console.log(err);
	            });

	            imagePath = imageUrl.substring(9);
	            newTeacher.image = imagePath
	        }
        console.log(newTeacher)
        newTeacher.save(function (err, user) {
            if (err) res.send(err);
            res.redirect('/admin/get/teacher')
        })
    },

    // -------------------------------------Parents Drama --------------------------------------
    GetAddParentPage: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/add-parents',{
        sett:sett,
        admin:req.user
       })
    },
    GetAllParents: async function (req, res) {
       var allParents = await Parent.find({}).sort('-createdAt');
        let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/all-parents',{
         allParents:allParents,
         sett:sett,
         admin:req.user
       })
    },
    CreateParent: async function (req, res) {
        let newParent = new Parent();
        newParent.firstName = req.body.firstName;
        newParent.lastName = req.body.lastName;
        newParent.gender = req.body.gender;
        newParent.email = req.body.email;
        newParent.contactNumber = req.body.contactNumber;
        newParent.IdNumber = req.body.IdNumber;
        newParent.occupation = req.body.occupation;
        newParent.bio = req.body.bio;
        newParent.address = req.body.address;
        newParent.roleId = "Parent";
         let salt = bcrypt.genSaltSync(saltRounds);
      
        let hash = bcrypt.hashSync(req.body.password, salt);
        newParent.password = hash;

          if (req.files && req.files.image) {
	            let dir = './public/uploads/parentsPic/';
	            if (!fs.existsSync(dir)) {
	                await fs.mkdirSync(dir, { recursive: true });
	            }

	            let parentProfileImage = req.files.image;
	            let nowDate = Date.now();
	            let imageUrl = dir + nowDate / 1000 + "" + parentProfileImage.name;

	            await parentProfileImage.mv(imageUrl, async function (err) {
	                if (err)
	                    console.log(err);
	            });

	            imagePath = imageUrl.substring(9);
	            newParent.image = imagePath
	        }
        console.log(newParent)
        newParent.save(function (err, user) {
            if (err) res.send(err);
            res.redirect('/admin/get/parent')
        })
    },
  // -------------------------------------Expenses Drama --------------------------------------
    GetAddExpensePage: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/add-expense',{
        admin:req.user,
        sett:sett
       })
    },
    GetAllExpenses: async function (req, res) {
       var allExpenses = await Expenses.find({}).sort('-createdAt');
        let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/all-expense',{
         allExpenses:allExpenses,
         sett:sett,
         admin:req.user
       })
    },
    GetAllFeeCollection: async function (req, res) {
       var allFees = await Expenses.find({}).sort('-createdAt');
        let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/all-fees',{
         allFees:allFees,
         sett:sett,
         admin:req.user
       })
    },
    CreateExpense: async function (req, res) {
        var myString = req.body.parent;
        var addParent = myString.replace(/\s+/g, '');
        let newExpense = new Expenses();
        newExpense.fullName = req.body.fullName;
        newExpense.parent = addParent;
        newExpense.gender = req.body.gender;
        newExpense.email = req.body.email;
        newExpense.contactNumber = req.body.contactNumber;
        newExpense.IdNumber = req.body.IdNumber;
        newExpense.roll = req.body.roll;
        newExpense.class = req.body.class;
        newExpense.section = req.body.section;
        newExpense.expensesType = req.body.expensesType;
        newExpense.date = req.body.date;
        newExpense.amount = req.body.amount;
        newExpense.status = req.body.status;
          if (req.files && req.files.image) {
	            let dir = './public/uploads/expensesPic/';
	            if (!fs.existsSync(dir)) {
	                await fs.mkdirSync(dir, { recursive: true });
	            }

	            let expenseProfileImage = req.files.image;
	            let nowDate = Date.now();
	            let imageUrl = dir + nowDate / 1000 + "" + expenseProfileImage.name;

	            await expenseProfileImage.mv(imageUrl, async function (err) {
	                if (err)
	                    console.log(err);
	            });

	            imagePath = imageUrl.substring(9);
	            newExpense.image = imagePath
	        }
        console.log(newExpense)
        newExpense.save(function (err, user) {
            if (err) res.send(err);
            res.redirect('/admin/get/expense')
        })
    },

    // -------------------------------------Class Drama --------------------------------------
    GetAddClassPage: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/add-class',{
        admin:req.user,
        sett:sett
       })
    },
    GetAllClass: async function (req, res) {
       var allClasses = await Class.find({}).sort('-createdAt');
        let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/all-class',{
         allClasses:allClasses,
         sett:sett,
         admin:req.user
       });
    },
    CreateClass: async function (req, res) {
        let newClass = new Class();
        newClass.teacherName = req.body.teacherName;
        newClass.gender = req.body.gender;
        newClass.email = req.body.email;
        newClass.contactNumber = req.body.contactNumber;
        newClass.IdNumber = req.body.IdNumber;
        newClass.time = req.body.time;
        newClass.class = req.body.class;
        newClass.section = req.body.section;
        newClass.subject = req.body.subject;
        newClass.date = req.body.date;
         
        console.log(newClass)
        newClass.save(function (err, user) {
            if (err) res.send(err);
            res.redirect('/admin/get/class')
        })
    },
// --------------------------------Exam Drama-----------------------------------------------
     GetAllExam: async function (req, res) {
       var allExam = await Exam.find({}).sort('-createdAt');
        let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/exam-schedule',{
         allExam:allExam,
         sett:sett,
         admin:req.user
       })
    },
    CreateExam: async function (req, res) {
        let newExam = new Exam();
        newExam.examName = req.body.examName;
        newExam.subjectType = req.body.subjectType;
        newExam.selectClass = req.body.selectClass;
        newExam.selectSection = req.body.selectSection;
        newExam.selectTime = req.body.selectTime;
        newExam.selectDate = req.body.selectDate;
         
        console.log(newExam)
        newExam.save(function (err, user) {
            if (err) res.send(err);
            res.redirect('/admin/get/all/exam')
        })
    },

    // --------------------------------Exam Grade Drama-----------------------------------------------
     GetAllExamGrade: async function (req, res) {
       var allExamGrade = await ExamGrade.find({}).sort('-createdAt');
        let sett = await Setting.find({}).sort('-createdAt');
       res.render('admin/exam-grade',{
         allExamGrade:allExamGrade,
         admin:req.user,
         sett:sett
       })
    },
    CreateExamGrade: async function (req, res) {
        let newExamGrade = new ExamGrade();
        newExamGrade.gradeName = req.body.gradeName;
        newExamGrade.gradePoint = req.body.gradePoint;
        newExamGrade.percentageFrom = req.body.percentageFrom;
        newExamGrade.percentageUpTo = req.body.percentageUpTo;
        newExamGrade.comments = req.body.comments;
         
        console.log(newExamGrade)
        newExamGrade.save(function (err, user) {
            if (err) res.send(err);
            res.redirect('/admin/get/all/exam-grade')
        })
    },


 
    GetApplicationApproval: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
        var applicationapproval = await OnlineApplication.find({}).sort('-createdAt').limit(3); 
        res.render('admin/applicationapproval',{
          applicationapproval:applicationapproval,
          admin:req.user,
          sett:sett
        });
    },
    GetComplaint: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
      var complaint = await Complaint.find({}).sort('-createdAt').limit(6);
        res.render('admin/complaint',{
          complaint:complaint,
          admin:req.user,
          sett:sett
        });
    },

    GetTransport: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/hostel',{
          admin:req.user,
          sett:sett
        });
    },



    GetSetting: async function (req, res) {
      var sett = await Setting.find({})
        res.render('admin/setting',{
          sett:sett,
          admin:req.user
        });
    },
    CreateSetting: async function (req, res) {
        var setting = new Setting();
        setting.title = req.body.title;
         if (req.files && req.files.image) {
              let dir = './public/uploads/schoolPic/';
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
              setting.image = imagePath
          }


        setting.save();
        res.send({"Success":true,"message":"Success Full",setting})
        // res.redirect('/admin/add/books')
    },


   GetDMCIssue: async function (req, res) {
      let AllDmc = await DMC.find({}).sort('-createdAt').limit(20);
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/degree-dmc-issue',{
          sett:sett,
          AllDmc:AllDmc,
          admin:req.user
        });
    },
    GetAddDMCIssue: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/add_dmc',{
          sett:sett,
          admin:req.user
        });
    },

        CreateDMCIssue: async function (req, res) {
        var myString = req.body.parent;
        var addParent = myString.replace(/\s+/g, '');
        let newDMC = new DMC();
        newDMC.studentName = req.body.studentName;
        newDMC.roll = req.body.roll;
        newDMC.class = req.body.class;
        newDMC.section = req.body.section;
        newDMC.parent = addParent;
      
          if (req.files && req.files.image) {
              let dir = './public/uploads/dmcPic/';
              if (!fs.existsSync(dir)) {
                  await fs.mkdirSync(dir, { recursive: true });
              }

              let studentProfileImage = req.files.image;
              let nowDate = Date.now();
              let imageUrl = dir + nowDate / 1000 + "" + studentProfileImage.name;

              await studentProfileImage.mv(imageUrl, async function (err) {
                  if (err)
                      console.log(err);
              });

              imagePath = imageUrl.substring(9);
              newDMC.image = imagePath
          }
        console.log(newDMC)
        newDMC.save(function (err, user) {
            if (err) res.send(err);
            return res.redirect('/admin/get/dmc-issue')
        })
    },


    GetHostel: async function (req, res) {
      let Allhostel = await Hostel.find({}).sort('-createdAt');
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/hostel',{
          Allhostel:Allhostel,
          admin:req.user,
          sett:sett
        });
    },
    AddHostel: async function (req, res) {
        var hostel = new Hostel();
        hostel.roomName = req.body.name;
        hostel.roomNumber = req.body.number;
        hostel.roomType = req.body.type;
        hostel.NoOfBed = req.body.NoOfBed;
        hostel.price = req.body.price;
        hostel.save();
        res.redirect('/admin/get/hostel')
    },

    GetAllBook: async function (req, res) {
      var allBooks = await Books.find({}).sort('-createdAt');
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/all-book',{
          allBooks:allBooks,
          admin:req.user,
          sett:sett

        });
    },
    

    GetAddBook: async function (req, res) {
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/add-book',{
          admin:req.user,
          sett:sett
        });
    },
     PostAddBook: async function (req, res) {
        var book = new Books();
        book.bookName = req.body.bookName;
        book.subject = req.body.subject;
        book.writterName = req.body.writterName;
        book.class = req.body.class;
        book.idNo = req.body.idNo;
        book.publishData = req.body.publishData;
        book.uploadDate = req.body.uploadDate;
         if (req.files && req.files.image) {
              let dir = './public/uploads/booksPic/';
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
              book.image = imagePath
          }


        book.save();
        res.redirect('/admin/add/books')
    },


     GetAssignSubject: async function (req, res) {
      var assignSubject = await Teacher.find({}).sort('-createdAt');
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/all-assign-subject-for-teacher',{
          assignSubject:assignSubject,
          admin:req.user,
          sett:sett

        });
    },

     searchStudents: async function (req, res) {
        let studentAll = [];
         let sett = await Setting.find({}).sort('-createdAt');
         console.log(req.body)
        if(req.body.firstName != undefined && req.body.firstName !="" && req.body.roll != undefined && req.body.roll !=""  && req.body.class != undefined && req.body.class !=""){
            let student = await Student.find({
                $and: [
                    { $or: [{firstName : {$regex: new RegExp(req.body.firstName, 'i')}}]},
                    { $or: [{roll: {$regex: new RegExp(req.body.roll, 'i')}}]},
                    { $or: [{class: {$regex: new RegExp(req.body.class, 'i')}}]},
                ]}).lean();
              console.log(student)
                if(student != null && student !=""){
                    for (const property of student) {
                        let mainObject = {}
                        mainObject.property = property
                        await studentAll.push(mainObject);
    
                    }
                }
                // return res.send({'Success' : true,'Property' : vehicleAll})
                res.render('admin/all-student',{
                	allStudent:studentAll,
                  sett:sett,
                  admin:req.user
                })
        }
        // if(req.body.firstName != undefined && req.body.firstName !=""){
        //     let student = await Student.find({firstName: {$regex: new RegExp(req.body.firstName, 'i')}}).lean();
        //         if(student != null && student !=""){
        //             for (const property of student) {
        //                 let mainObject = {}
        //                 mainObject.property = property;
        //                await studentAll.push(mainObject);
    
        //             }
        //         }
        //         // return res.send({'Success' : true,'property' : studentAll})
        //          res.render('admin/search-student',{
        //         	allStudent:studentAll
        //         })
        // }
        // if(req.body.class != undefined && req.body.class !=""){
        //     let student = await Student.find({class: {$regex: new RegExp(req.body.class, 'i')}}).lean();
        //         if(student != null && student !=""){
        //             for (const property of student) {
        //                 let mainObject = {}
        //                 mainObject.property = property;
        //                await studentAll.push(mainObject);
    
        //             }
        //         }
        //         // return res.send({'Success' : true,'property' : studentAll})
        //          res.render('admin/search-student',{
        //         	allStudent:studentAll
        //         })
        // }
        // if(req.body.roll != undefined && req.body.roll !=""){
        //     let student = await Student.find({roll: {$regex: new RegExp(req.body.roll, 'i')}}).lean();
        //         if(student != null && student !=""){
        //             for (const property of student) {
        //                 let mainObject = {}
        //                 mainObject.property = property;
        //                await studentAll.push(mainObject);
    
        //             }
        //         }
        //         // return res.send({'Success' : true,'property' : studentAll})
        //          res.render('admin/search-student',{
        //         	allStudent:studentAll
        //         })
        // }

    },
// ----------------------------Edit Student Drama----------------------------------
      GetEditStudent:async function (req, res) {
      let editStudent = await Student.findOne({_id:req.params.id});
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/edit_student',{
          editStudent:editStudent,
          sett:sett
        });
    },

      PostEditStudent:async function(req,res){

        if (req.files && req.files.image) {
            let dir = './public/uploads/studentPic/';
            if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir, { recursive: true });
            }

            let studentImage = req.files.image;
            let nowDate = Date.now();
            let iconUrl = dir + nowDate / 1000 + "" + studentImage.name;

            await studentImage.mv(iconUrl, async function (err) {
                if (err)
                    console.log(err);
            });

            imagePath = iconUrl.substring(9);
            images = imagePath
        }else{
        imagePath = req.body.oldImage
          }
         
         let id = req.params.id;
         firstName = req.body.firstName;
         lastName = req.body.lastName;
         gender = req.body.gender;
         email = req.body.email;
         contactNumber = req.body.contactNumber;
         dateOfBirth = req.body.dateOfBirth;
         roll = req.body.roll;
         bloodGroup = req.body.bloodGroup;
         Class = req.body.class;
         section = req.body.section;
         admissionId = req.body.admissionId;
         bio = req.body.bio;
         parent = req.body.parent;
         address = req.body.address;
         roleId = req.body.roleId;
         image = imagePath
         // imageUrl2 = ImagesIcon

         Student.findById(id,async function(err,editStudent){
              if(err) return err;
              editStudent.firstName = firstName;
              editStudent.lastName = lastName;
              editStudent.gender = gender;
              editStudent.email = email;
              editStudent.contactNumber = contactNumber;
              editStudent.roll = roll;
              editStudent.dateOfBirth = dateOfBirth;
              editStudent.bloodGroup = bloodGroup;
              editStudent.class = Class;
              editStudent.section = section;
              editStudent.admissionId = admissionId;
              editStudent.bio = bio;
              editStudent.parent = parent;
              editStudent.presentORabsent = presentORabsent;
              editStudent.address = address;
              editStudent.roleId = roleId;
              // editStudent.password = password;
              editStudent.image = imagePath;

              let salt = bcrypt.genSaltSync(saltRounds);
      
              let hash = bcrypt.hashSync(req.body.password, salt);
              editStudent.password = hash;

               if(imagePath != ""){
                  editStudent.image = imagePath;
            
              }
           console.log(editStudent)    
             await editStudent.save()
              // err => {    

        res.redirect('/admin/get/all/students')
    // })
})
},

 DeleteStudent:async function (req, res) {
        let deleteStudent = await Student.deleteOne({ _id: req.params.id });
        res.redirect('/admin/get/all/students')
    },

// ---------------------------------Edit End Student Drama----------------------------

// ----------------------------Edit teacher Drama----------------------------------
      GetEditTeacher:async function (req, res) {
      let editTeacher = await Teacher.findOne({_id:req.params.id});
      let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/edit_teacher',{
          editTeacher:editTeacher,
          sett:sett,
          admin:req.user
        });
    },

      PostEditTeacher:async function(req,res){

        if (req.files && req.files.image) {
            let dir = './public/uploads/teacherPic/';
            if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir, { recursive: true });
            }

            let studentImage = req.files.image;
            let nowDate = Date.now();
            let iconUrl = dir + nowDate / 1000 + "" + studentImage.name;

            await studentImage.mv(iconUrl, async function (err) {
                if (err)
                    console.log(err);
            });

            imagePath = iconUrl.substring(9);
            images = imagePath
        }else{
        imagePath = req.body.oldImage
          }
         
         let id = req.params.id;
         firstName = req.body.firstName;
         lastName = req.body.lastName;
         gender = req.body.gender;
         email = req.body.email;
         contactNumber = req.body.contactNumber;
         dateOfBirth = req.body.dateOfBirth;
         IdNumber = req.body.IdNumber;
         bloodGroup = req.body.bloodGroup;
         Class = req.body.class;
         section = req.body.section;
         subject = req.body.subject;
         bio = req.body.bio;
         address = req.body.address;
         roleId = req.body.roleId;
         image = imagePath
         // imageUrl2 = ImagesIcon

         Teacher.findById(id,async function(err,editTeacher){
              if(err) return err;
              editTeacher.firstName = firstName;
              editTeacher.lastName = lastName;
              editTeacher.gender = gender;
              editTeacher.email = email;
              editTeacher.contactNumber = contactNumber;
              editTeacher.subject = subject;
              editTeacher.dateOfBirth = dateOfBirth;
              editTeacher.bloodGroup = bloodGroup;
              editTeacher.class = Class;
              editTeacher.section = section;
              editTeacher.IdNumber = IdNumber;
              editTeacher.bio = bio;
              editTeacher.address = address;
              editTeacher.roleId = roleId;
              // editTeacher.password = password;
              editTeacher.image = imagePath;

              

               if(imagePath != ""){
                  editTeacher.image = imagePath;
            
              }
           console.log(editTeacher)    
             await editTeacher.save()
              // err => {    

        res.redirect('/admin/get/all/teachers')
    // })
})
},

 DeleteTeacher:async function (req, res) {
        let deleteTeacher = await Teacher.deleteOne({ _id: req.params.id });
        res.redirect('/admin/get/all/teachers')
    },

// ---------------------------------Edit End Teacher Drama----------------------------

// ----------------------------Edit Parent Drama----------------------------------
      GetEditParent:async function (req, res) {
      let editParent = await Parent.findOne({_id:req.params.id});
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/edit_parent',{
          editParent:editParent,
          admin:req.user,
          sett:sett
        });
    },

      PostEditParent:async function(req,res){

        if (req.files && req.files.image) {
            let dir = './public/uploads/parentsPic/';
            if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir, { recursive: true });
            }

            let parentImage = req.files.image;
            let nowDate = Date.now();
            let iconUrl = dir + nowDate / 1000 + "" + parentImage.name;

            await parentImage.mv(iconUrl, async function (err) {
                if (err)
                    console.log(err);
            });

            imagePath = iconUrl.substring(9);
            images = imagePath
        }else{
        imagePath = req.body.oldImage
          }
         
         let id = req.params.id;
         firstName = req.body.firstName;
         lastName = req.body.lastName;
         gender = req.body.gender;
         email = req.body.email;
         contactNumber = req.body.contactNumber;
         dateOfBirth = req.body.dateOfBirth;
         IdNumber = req.body.IdNumber;
         bloodGroup = req.body.bloodGroup;
         occupation = req.body.occupation;
         bio = req.body.bio;
         address = req.body.address;
         roleId = req.body.roleId;
         image = imagePath
         // imageUrl2 = ImagesIcon

         Parent.findById(id,async function(err,editParent){
              if(err) return err;
              editParent.firstName = firstName;
              editParent.lastName = lastName;
              editParent.gender = gender;
              editParent.email = email;
              editParent.contactNumber = contactNumber;
              editParent.occupation = occupation;
              editParent.dateOfBirth = dateOfBirth;
              editParent.bloodGroup = bloodGroup;
              editParent.IdNumber = IdNumber;
              editParent.bio = bio;
              editParent.address = address;
              editParent.roleId = roleId;
              // editParent.password = password;
              editParent.image = imagePath;

               if(imagePath != ""){
                  editParent.image = imagePath;
            
              }
           console.log(editParent)    
             await editParent.save()
              // err => {    

        res.redirect('/admin/get/all/parents')
    // })
   })
},

 DeleteParent:async function (req, res) {
        let deleteParent = await Parent.deleteOne({ _id: req.params.id });
        res.redirect('/admin/get/all/parents')
    },

// ---------------------------------Edit End Parent Drama----------------------------

// ----------------------------Edit teacher Drama----------------------------------
      GetEditExpenses:async function (req, res) {
      let editExpenses = await Expenses.findOne({_id:req.params.id});
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/edit_expenses',{
          editExpenses:editExpenses,
          admin:req.user,
          sett:sett
        });
    },

      PostEditExpenses:async function(req,res){

        if (req.files && req.files.image) {
            let dir = './public/uploads/expensesPic/';
            if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir, { recursive: true });
            }

            let expensesImage = req.files.image;
            let nowDate = Date.now();
            let iconUrl = dir + nowDate / 1000 + "" + expensesImage.name;

            await expensesImage.mv(iconUrl, async function (err) {
                if (err)
                    console.log(err);
            });

            imagePath = iconUrl.substring(9);
            images = imagePath
        }else{
        imagePath = req.body.oldImage
          }
         
         let id = req.params.id;
         fullName = req.body.fullName;
         parent = req.body.parent;
         gender = req.body.gender;
         email = req.body.email;
         contactNumber = req.body.contactNumber;
         roll = req.body.roll;
         section = req.body.section;
         Class = req.body.class;
         expensesType = req.body.expensesType;
         amount = req.body.amount;
         IdNumber = req.body.IdNumber;
         status = req.body.status;
         date = req.body.date;
         roleId = req.body.roleId;
         image = imagePath
         // imageUrl2 = ImagesIcon

         Expenses.findById(id,async function(err,editExpenses){
              if(err) return err;
              editExpenses.fullName = fullName;
              editExpenses.parent = parent;
              editExpenses.gender = gender;
              editExpenses.email = email;
              editExpenses.contactNumber = contactNumber;
              editExpenses.roll = roll;
              editExpenses.section = section;
              editExpenses.class = Class;
              editExpenses.IdNumber = IdNumber;
              editExpenses.expensesType = expensesType;
              editExpenses.status = status;
              editExpenses.roleId = roleId;
              editExpenses.date = date;
              // editExpenses.password = password;
              editExpenses.image = imagePath;

               if(imagePath != ""){
                  editExpenses.image = imagePath;
            
              }
           console.log(editExpenses)    
             await editExpenses.save()
              // err => {    

        res.redirect('/admin/get/all/expenses')
    // })
})
},

 deleteExpenses:async function (req, res) {
        let deleteExpenses = await Expenses.deleteOne({ _id: req.params.id });
        res.redirect('/admin/get/all/expenses')
    },

// ---------------------------------Edit End Teacher Drama----------------------------

// ----------------------------Edit teacher Drama----------------------------------
      GetEditFee:async function (req, res) {
      let editFee = await Expenses.findOne({_id:req.params.id});
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/edit_fee',{
          editFee:editFee,
          sett:sett,
          admin:req.user
        });
    },

      PostEditFee:async function(req,res){

        if (req.files && req.files.image) {
            let dir = './public/uploads/feePic/';
            if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir, { recursive: true });
            }

            let expensesImage = req.files.image;
            let nowDate = Date.now();
            let iconUrl = dir + nowDate / 1000 + "" + expensesImage.name;

            await expensesImage.mv(iconUrl, async function (err) {
                if (err)
                    console.log(err);
            });

            imagePath = iconUrl.substring(9);
            images = imagePath
        }else{
        imagePath = req.body.oldImage
          }
         
         let id = req.params.id;
         fullName = req.body.fullName;
         parent = req.body.parent;
         gender = req.body.gender;
         email = req.body.email;
         contactNumber = req.body.contactNumber;
         roll = req.body.roll;
         section = req.body.section;
         Class = req.body.class;
         expensesType = req.body.expensesType;
         amount = req.body.amount;
         IdNumber = req.body.IdNumber;
         status = req.body.status;
         date = req.body.date;
         roleId = req.body.roleId;
         image = imagePath
         // imageUrl2 = ImagesIcon

         Expenses.findById(id,async function(err,editExpenses){
              if(err) return err;
              editExpenses.fullName = fullName;
              editExpenses.parent = parent;
              editExpenses.gender = gender;
              editExpenses.email = email;
              editExpenses.contactNumber = contactNumber;
              editExpenses.roll = roll;
              editExpenses.section = section;
              editExpenses.class = Class;
              editExpenses.IdNumber = IdNumber;
              editExpenses.expensesType = expensesType;
              editExpenses.status = status;
              editExpenses.roleId = roleId;
              editExpenses.date = date;
              // editExpenses.password = password;
              editExpenses.image = imagePath;

               if(imagePath != ""){
                  editExpenses.image = imagePath;
            
              }
           console.log(editExpenses)    
             await editExpenses.save()
              // err => {    

        res.redirect('/admin/get/all/fees-collection')
    // })
})
},

 deleteFee:async function (req, res) {
        let deleteExpenses = await Expenses.deleteOne({ _id: req.params.id });
        res.redirect('/admin/get/all/fees-collection')
    },

// ---------------------------------Edit End Teacher Drama----------------------------

// ----------------------------Edit Class Drama----------------------------------
      GetEditClass:async function (req, res) {
      let editClass = await Class.findOne({_id:req.params.id});
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/edit_class',{
          editClass:editClass,
          sett:sett,
          admin:req.user
        });
    },

      PostEditClass:async function(req,res){
         
         let id = req.params.id;
         teacherName = req.body.teacherName;
          gender = req.body.gender;
          email = req.body.email;
          contactNumber = req.body.contactNumber;
          IdNumber = req.body.IdNumber;
          time = req.body.time;
          Classs = req.body.class;
          section = req.body.section;
          subject = req.body.subject;
          date = req.body.date;
           

         Class.findById(id,async function(err,editExpenses){
          console.log(editExpenses)
              if(err) return err;
              editExpenses.teacherName = teacherName;
              editExpenses.gender = gender;
              editExpenses.email = email;
              editExpenses.contactNumber = contactNumber;
              editExpenses.section = section;
              editExpenses.class = Classs;
              editExpenses.IdNumber = IdNumber;
              editExpenses.subject = subject;
              editExpenses.time = time;
              editExpenses.date = date;
              // editExpenses.password = password;
              // editExpenses.image = imagePath;

           console.log(editExpenses)    
             await editExpenses.save()
              // err => {    

        res.redirect('/admin/get/all/class')
    // })
})
},

 deleteClass:async function (req, res) {
        let deleteClass = await Class.deleteOne({ _id: req.params.id });
        res.redirect('/admin/get/all/class')
    },

// ---------------------------------Edit End Class Drama----------------------------
// ----------------------------Edit class Time Table Drama----------------------------------
      GetEditClassTimeTable:async function (req, res) {
      let editTimeTable = await ClassTimeTable.findOne({_id:req.params.id});
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/edit_class_time',{
          editTimeTable:editTimeTable,
          admin:req.user,
          sett:sett
        });
    },

      PostEditClassTimeTable:async function(req,res){
         
         let id = req.params.id;
         subjectName = req.body.subjectName;
          code = req.body.code;
          day = req.body.day;
          subjectCode = req.body.subjectCode;
          Classs = req.body.class;
          section = req.body.section;
          teacher = req.body.teacher;
          time = req.body.time;
          date = req.body.date;
           

         ClassTimeTable.findById(id,async function(err,editExpenses){
          console.log(editExpenses)
              if(err) return err;
              editExpenses.subjectName = subjectName;
              editExpenses.code = code;
              editExpenses.day = day;
              editExpenses.subjectCode = subjectCode;
              editExpenses.section = section;
              editExpenses.class = Classs;
              editExpenses.teacher = teacher;
              editExpenses.time = time;
              editExpenses.date = date;
              // editExpenses.password = password;
              // editExpenses.image = imagePath;

           console.log(editExpenses)    
             await editExpenses.save()
              // err => {    

           res.redirect('/admin/get/class-time-table')
        // })
})
},

 deleteClassTimeTable:async function (req, res) {
        let deleteClass = await ClassTimeTable.deleteOne({ _id: req.params.id });
        res.redirect('/admin/get/class-time-table')
    },

// ---------------------------------Edit End Teacher Drama----------------------------

// ----------------------------Edit teacher Drama----------------------------------
      GetEditSetting:async function (req, res) {
      let setting = await Setting.findOne({_id:req.params.id});
       let sett = await Setting.find({}).sort('-createdAt');
        res.render('admin/edit_setting',{
          setting:setting,
          admin:req.user,
          sett:sett
        });
    },

      PostEditSetting:async function(req,res){

        if (req.files && req.files.image) {
            let dir = './public/uploads/settingPic/';
            if (!fs.existsSync(dir)) {
                await fs.mkdirSync(dir, { recursive: true });
            }

            let expensesImage = req.files.image;
            let nowDate = Date.now();
            let iconUrl = dir + nowDate / 1000 + "" + expensesImage.name;

            await expensesImage.mv(iconUrl, async function (err) {
                if (err)
                    console.log(err);
            });

            imagePath = iconUrl.substring(9);
            images = imagePath
        }else{
        imagePath = req.body.oldImage
          }
         
         let id = req.params.id;
         title = req.body.title;
         image = imagePath
         // imageUrl2 = ImagesIcon

         Setting.findById(id,async function(err,editSetting){
              if(err) return err;
              editSetting.title = title;
              editSetting.image = imagePath;

               if(imagePath != ""){
                  editSetting.image = imagePath;
            
              }
           console.log(editSetting)    
             await editSetting.save()
              // err => {    

        res.redirect('/admin/get/setting')
    // })
})
},

  GetAllMessagess:async function(req,res){
      var myString2 = req.user.firstName;
        var myString21 = req.user.lastName;
        var thirdParty = myString2 +""+myString21;
        var addMessageBy = thirdParty.replace(/\s+/g, '');
        console.log(addMessageBy)
    let message = await Message.find({sendTo:"Admin"}).sort('-createdAt');
    let message1 = await Message.find({messageBy:addMessageBy}).sort('-createdAt');
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('message/messages',{
      message:message,
      message1:message1,
      admin:req.user,
      sett:sett
    })
  },

   message:async function(req,res){
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('admin/messaging',{
      admin:req.user,
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
          res.redirect('/admin/get/all-message')
      })
  },


   GetForgotPassword:async function(req,res){
    let sett = await Setting.find({}).sort('-createdAt');
    res.render('login/forgot-password',{
      admin:req.user,
      sett:sett
    })
  },

  CreateForgotPassword: async function (req, res) {
    var aAdminUser = await adminUser.findOne({email:req.body.email});
    if(aAdminUser){
       let salt = bcrypt.genSaltSync(saltRounds);
      
      let hash = bcrypt.hashSync(req.body.password, salt);
      aAdminUser.password = hash;
        console.log(aAdminUser)
        aAdminUser.save(function (err, user) {
          if (err) res.send(err);
          res.redirect('/')
      })
    }else{
     res.send("Email Not Found")
    }
  },


}


















