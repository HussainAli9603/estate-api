let express = require('express');
let router = express.Router(),
Parent = require('./scripts/parentscript');
let jwt = require('jsonwebtoken');
let jwtConfig = require('../config/jwtConfig');

router.get('/parent/dashboard',isLoggedIn,isParent, (req, res) => {
    Parent.ParentDashboard(req, res);
});
router.get('/parent/dashboard1',isLoggedIn,isParent, (req, res) => {
    Parent.ParentDashboard1(req, res);
});


router.get('/parent/reset-password',isLoggedIn,isParent, (req, res) => {
    Parent.GetResetPassword(req, res);
});
router.post('/parent/add/reset-password',isLoggedIn,isParent, (req, res) => {
    Parent.PostResetPassword(req, res);
});

router.get('/parent/login', (req, res) => {
    Parent.ParentLogin(req, res);
});
router.get('/parent/reset-password',isLoggedIn,isParent, (req, res) => {
    Parent.GetResetPassword(req, res);
});
router.get('/parent/logout',isLoggedIn,isParent, (req, res) => {
    Parent.GetLogout(req, res);
});
//User Login 
router.post('/admin/loginParent', (req, res , next) => {
    passport.authenticate('parent', function(err, user, info) {
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
            res.redirect('/parent/dashboard');
            // res.send({ success: true, user: req.user });
        });
    })(req, res, next);
});

router.get('/parent/kids/attendence',isLoggedIn,isParent,isParent, (req, res) => {
    Parent.GetAttendence(req, res);
});
router.get('/parent/complaint',isLoggedIn,isParent, (req, res) => {
    Parent.GetComplain(req, res);
});
router.post('/parent/add/complaint',isLoggedIn,isParent, (req, res) => {
    Parent.CreateComplain(req, res);
});
router.get('/parent/all/complaint',isLoggedIn,isParent, (req, res) => {
    Parent.GetAllComplain(req, res);
});
router.get('/parent/profile',isLoggedIn,isParent, (req, res) => {
    Parent.GetProfile(req, res);
});
router.get('/parent/kids/homework',isLoggedIn,isParent, (req, res) => {
    Parent.GethomeWorks(req, res);
});

router.get('/parent/get/add/result',isLoggedIn,isParent, (req, res) => {
    Parent.GetAllKidsResults(req, res);
});
router.get('/parent/all/hostel',isLoggedIn,isParent, (req, res) => {
    Parent.GetHostel(req, res);
});
router.get('/parent/kids/exam',isLoggedIn,isParent, (req, res) => {
    Parent.GetKidsExam(req, res);
});


router.get('/parent/get/all-message',isLoggedIn,isParent, (req, res) => {
    Parent.GetAllMessage(req, res);
});
router.get('/parent/message',isLoggedIn,isParent, (req, res) => {
    Parent.message(req, res);
});
router.post('/parent/add/message',isLoggedIn,isParent, (req, res) => {
    Parent.CreateMessage(req, res);
});


router.get('/parent/forgot-password',(req, res) => {
    Parent.GetForgotPassword(req, res);
});
router.post('/parent/add/forgot-password',(req, res) => {
    Parent.CreateForgotPassword(req, res);
});



function isParent(req, res, next) {
    if (req.isAuthenticated()){
        if(req.user.roleId && req.user.roleId =='Parent' || req.user.roleId =='Parent'){
            return next();
        }
        else{
            return res.redirect('back');
        }
        
    }
        
    return res.redirect('/parent/login');
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.redirect('/parent/login');
}


module.exports = router;