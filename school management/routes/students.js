let express = require('express');
let passport = require('passport');
let router = express.Router();
const studentScript = require('./scripts/studentscript');
let jwt = require('jsonwebtoken');
let jwtConfig = require('../config/jwtConfig');

router.get('/student/login', (req, res) => {
    studentScript.GetLogin(req, res);
});
router.get('/student/dashboard',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetDashboard(req, res);
});


router.get('/student/reset-password',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetResetPassword(req, res);
});
router.post('/student/add/reset-password',isLoggedIn,isStudent, (req, res) => {
    studentScript.PostResetPassword(req, res);
});

router.get('/student/dashboard1',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetDashboard1(req, res);
});
//User Login 
router.post('/student/loginStudent', (req, res , next) => {
    passport.authenticate('student', function(err, user, info) {
        if (err) {
            console.log('error', "" + err);
            //req.flash('error', "" + err); // will generate a 500 error
            return res.redirect('/');
        }
        if (!user) {
            return res.send(info);
        }
        req.login(user, loginErr => {
            if (loginErr) {
                console.log(loginErr);
            }
            res.redirect('/student/dashboard');
            // res.send({ success: true, user: req.user });
        });
    })(req, res, next);
});

router.get('/student/profile',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetProfile(req, res);
});
router.get('/student/reset-password',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetResetPassword(req, res);
});
router.get('/student/logout',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetLogout(req, res);
});

router.get('/student/notice-board',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetNotesBoards(req, res);
});

router.get('/student/attendence',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetAttendence(req, res);
});

router.get('/student/application-approve',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetOnlineApplicationApprove(req, res);
});
router.get('/student/online-application',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetOnlineApplication(req, res);
});
router.post('/student/add/online-application',isLoggedIn,isStudent, (req, res) => {
    studentScript.CreateOnlineApplication(req, res);
});


router.get('/student/complain',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetComplain(req, res);
});
router.get('/student/all/complain',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetAllComplain(req, res);
});
router.post('/student/add/complain',isLoggedIn,isStudent, (req, res) => {
    studentScript.CreateComplain(req, res);
});



router.get('/student/application-approval',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetAppAproval(req, res);
});
router.get('/student/exam-schedule',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetExamSchedule(req, res);
});
router.get('/student/exam-grade',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetExamGrade(req, res);
});

router.get('/student/home-work',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetHomeWorks(req, res);
});

router.get('/student/get/all-books',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetAllBook(req, res);
});

router.get('/student/get/result',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetResult(req, res);
});



router.get('/student/get/all-message',isLoggedIn,isStudent, (req, res) => {
    studentScript.GetAllMessage(req, res);
});
router.get('/student/message',isLoggedIn,isStudent, (req, res) => {
    studentScript.message(req, res);
});
router.post('/student/add/message',isLoggedIn,isStudent, (req, res) => {
    studentScript.CreateMessage(req, res);
});

router.get('/student/forgot-password',(req, res) => {
    studentScript.GetForgotPassword(req, res);
});
router.post('/student/add/forgot-password',(req, res) => {
    studentScript.CreateForgotPassword(req, res);
});




function isStudent(req, res, next) {
    if (req.isAuthenticated()){
        if(req.user.roleId && req.user.roleId =='Student' || req.user.roleId =='Student'){
            return next();
        }
        else{
            return res.redirect('back');
        }
        
    }
        
    return res.redirect('/student/login');
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.redirect('/student/login');
}


module.exports = router;
