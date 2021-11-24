let express = require('express');
let router = express.Router(),
User = require('./scripts/userscript');
let jwt = require('jsonwebtoken');
let jwtConfig = require('../config/jwtConfig');

router.get('/', (req, res) => {
    User.Home(req, res);
});
router.post('/login/user', (req, res) => {
    User.LoginUser(req, res);
});
router.post('/register/user', (req, res) => {
    User.Register(req, res);
});
router.get('/app-user-logout/:userId', (req, res) => {
    User.logoutUser(req, res);
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


router.get('/get/all/about-us', (req, res) => {
    User.GetAllAboutUs(req, res);
});
router.get('/get/all/our-team', (req, res) => {
    User.GetAllOurTeam(req, res);
});
router.get('/get/all/ourTeam-aboutUs', (req, res) => {
    User.GetAllOurTimeAndAboutUs(req, res);
});
router.get('/get/contact-us', (req, res) => {
    User.GetAllContactUs(req, res);
});

router.post('/post/message', (req, res) => {
    User.PostMessages(req, res);
});


router.post('/search/property',checkJwtToken, (req, res) => {
    User.searchProperty(req, res);
});
router.post('/search/project',checkJwtToken, (req, res) => {
    User.searchProject(req, res);
});


router.get('/get/all/project', (req, res) => {
    User.GetAllProject(req, res);
});
router.get('/get/all/featured',checkJwtToken, (req, res) => {
    User.GetAllFeatured(req, res);
});

router.get('/get/property/favourite/:userId', (req, res) => {
    User.GetAllFavouriteProperty(req, res);
});
router.post('/post/property/favourite/:propertyId/:userId', (req, res) => {
    User.addFavourite(req, res);
});

function checkJwtToken(req,res,next){
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== "undefined"){
        var bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    }else{
        req.sendStatus(403)
    }
}

// function checkJwtToken(req, res, next) {
//     let authHeader = req.headers.authorization;
//     console.log(authHeader)
//     if (authHeader) {
//         jwt.verify(authHeader, jwtConfig.secret, (err, user) => {
//             if (err) {
//                 if (err.name && err.name == 'TokenExpiredError' || err.name == 'JsonWebTokenError') {
//                     return res.send({Success : false, message: "Token Expired or Invalid" })
//                 }
                
//             } else {
//                 return next();
//             }
//         })
//     } else {
//         return res.send({Success : false, message: "UnAuthorized User" });
//     }
// }


module.exports = router;