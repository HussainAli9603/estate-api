let express = require('express');
let passport = require('passport');
let router = express.Router();
const teacherScript = require('./scripts/teacherscript');
let jwt = require('jsonwebtoken');
let jwtConfig = require('../config/jwtConfig');

router.get('/teacher/login', (req, res) => {
    teacherScript.GetLogin(req, res);
});
router.get('/teacher/dashboard',isTeacher, (req, res) => {
    teacherScript.GetDashboard(req, res);
});

router.get('/teacher/reset-password',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetResetPassword(req, res);
});
router.post('/teacher/add/reset-password',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.PostResetPassword(req, res);
});
router.get('/edit/:roll/:id',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.PostEditAttendence(req, res);
});

// router.post('/teacher/add/edit_attendance/:roll/:id',isLoggedIn,isTeacher, (req, res) => {
//     teacherScript.PostEditAttendence(req, res);
// });

// router.get('/teacher/dashboard1', (req, res) => {
//     teacherScript.GetDashboard1(req, res);
// });
//User Login 
router.post('/teacher/loginTeacher', (req, res , next) => {
    passport.authenticate('teacher', function(err, user, info) {
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
            res.redirect('/teacher/dashboard');
            // res.send({ success: true, user: req.user });
        });
    })(req, res, next);
});

router.get('/teacher/profile',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetProfile(req, res);
});
router.get('/teacher/reset-password',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetResetPassword(req, res);
});
router.get('/teacher/logout',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetLogout(req, res);
});

router.get('/teacher/notice-board',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetNotesBoards(req, res);
});

router.get('/teacher/home-work',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetHomeWorks(req, res);
});
router.get('/teacher/get/home-work',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetAddHomeWorks(req, res);
});
router.post('/teacher/add/home-work',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.CreateHomeWorks(req, res);
});


router.get('/teacher/student/attendence',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetAttendence(req, res);
});
router.get('/teacher/get/add/attendence',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetAddAttendence(req, res);
});
router.post('/teacher/post/add/attendence',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.CreateAttendence(req, res);
});

router.get('/teacher/get/add/result',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetAddResults(req, res);
});
router.get('/teacher/post/add/result',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.PostAddResults(req, res);
});
router.post('/teacher/add/result',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.CreateSTDResult(req, res);
});



router.get('/teacher/online-application',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetOnlineApplicationApprove(req, res);
});
router.get('/teacher/get/online-application',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetOnlineApplication(req, res);
});
router.post('/teacher/add/online-application',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.CreateOnlineApplication(req, res);
});


router.get('/teacher/complain',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetComplain(req, res);
});
router.get('/teacher/get/complain',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetAddComplain(req, res);
});
router.post('/teacher/add/complain',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.CreateComplain(req, res);
});


router.get('/teacher/application-approval',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetAppAproval(req, res);
});
router.get('/teacher/exam-schedule',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetExamSchedule(req, res);
});
router.get('/teacher/exam-grade',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetExamGrade(req, res);
});



router.get('/teacher/get/all-message',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.GetAllMessage(req, res);
});
router.get('/teacher/message',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.message(req, res);
});
router.post('/teacher/add/message',isLoggedIn,isTeacher, (req, res) => {
    teacherScript.CreateMessage(req, res);
});

router.get('/teacher/forgot-password',(req, res) => {
    teacherScript.GetForgotPassword(req, res);
});
router.post('/teacher/add/forgot-password',(req, res) => {
    teacherScript.CreateForgotPassword(req, res);
});



function isTeacher(req, res, next) {
    if (req.isAuthenticated()){
        if(req.user.roleId && req.user.roleId =='Teacher' || req.user.roleId =='Teacher'){
            return next();
        }
        else{
            return res.redirect('back');
        }
        
    }
        
    return res.redirect('/teacher/login');
}


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.redirect('/teacher/login');
}


module.exports = router;
