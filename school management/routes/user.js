let express = require('express');
let router = express.Router(),
 passport = require('passport'),
User = require('./scripts/userscript');
let jwt = require('jsonwebtoken');
let jwtConfig = require('../config/jwtConfig');

router.get('/', (req, res) => {
    User.Home(req, res);
});
//User Login 
router.post('/admin/loginUser', (req, res , next) => {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            console.log('error', "" + err);
            //req.flash('error', "" + err); // will generate a 500 error
            return res.redirect('/login');
        }
        if (!user) {
            return res.send(info);
            //console.log(info.message);
        }
        req.login(user, loginErr => {
            if (loginErr) {
                console.log(loginErr);
            }
            res.redirect('/admin/dashboard');
            // res.send({ success: true, user: req.user });
        });
    })(req, res, next);
});

router.post('/login/user', (req, res) => {
    User.LoginUser(req, res);
});
router.post('/register/user', (req, res) => {
    User.Register(req, res);
});
router.post('/forgot-password/request', (req, res) => {
    User.forgotPassword(req, res);
});
router.post('/user/resetPassword', (req, res) => {
    User.PostResetPasswordToken(req, res);
});
router.post('/reset-password/confirm-otp', (req, res) => {
    User.resetPasswordConfirmationSubmission(req, res);
});

router.get('/get/cities', (req, res) => {
    User.GetCities(req, res);
});


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.redirect('/');
}
// function checkJwtToken(req,res,next){
//     const bearerHeader = req.headers["authorization"];
//     if(typeof bearerHeader !== "undefined"){
//         var bearer = bearerHeader.split(" ");
//         const bearerToken = bearer[1];
//         req.token = bearerToken;
//         next();
//     }else{
//         req.sendStatus(403)
//     }
// }

module.exports = router;