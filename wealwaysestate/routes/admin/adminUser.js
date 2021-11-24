let express = require('express');
let passport = require('passport');
let router = express.Router();
const adminUserScript = require('./scripts/AdminUserScripts');
const adminProduct = require('./scripts/product');
let jwt = require('jsonwebtoken');
let jwtConfig = require('../../config/jwtConfig');

router.get('/weAlways-App/admin', (req, res) => {
    adminUserScript.Login(req, res);
});
router.get('/admin/logout', (req, res) => {
    adminUserScript.logoutUser(req, res);
});
router.get('/admin/dashboard',isLoggedIn, (req, res) => {
    adminUserScript.adminDashboard(req, res);
});
//Admin Login 
router.post('/admin/loginUser', (req, res , next) => {
    passport.authenticate('local-login', function(err, user, info) {
        if (err) {
            console.log('error', "" + err);
            //req.flash('error', "" + err); // will generate a 500 error
            return res.redirect('/weAlways-App/admin');
        }
        if (!user) {
            return res.send(info);
            //console.log(info.message);
        }
        req.login(user, loginErr => {
            if (loginErr) {
                console.log(loginErr);
            }
            res.send({ success: true, user: req.user });
        });
    })(req, res, next);
});
router.post('/admin/register', (req, res) => {
    adminUserScript.adminRegister(req, res);
});
router.get('/admin/country',isLoggedIn, (req, res) => {
    adminUserScript.ViewAllCountries(req, res);
});
router.post('/admin/country',isLoggedIn, (req, res) => {
    adminUserScript.CreateCountry(req, res);
});
router.get('/admin/edit/country/:id',isLoggedIn, (req, res) => {
    adminUserScript.editCountry(req, res);
});
router.post('/admin/edit/country/:id',isLoggedIn, (req, res) => {
    adminUserScript.saveUpdateCountry(req, res);
});
router.get('/admin/delete/country/:id',isLoggedIn, (req, res) => {
    adminUserScript.deleteCountry(req, res);
});

router.get('/admin/city',isLoggedIn, (req, res) => {
    adminUserScript.ViewAllCities(req, res);
});
router.post('/admin/city/add',isLoggedIn, (req, res) => {
    adminUserScript.CreateCity(req, res);
});
router.get('/admin/edit/city/:id',isLoggedIn , (req,res) =>{
    adminUserScript.editCity(req,res);
});
router.post('/admin/edit/city/:id',isLoggedIn,(req,res) =>{
    adminUserScript.saveUpdateCity(req,res);
});
router.get('/admin/delete/city/:id',isLoggedIn, (req, res) => {
    adminUserScript.deleteCity(req, res);
});


router.get('/admin/all-property',isLoggedIn, (req, res) => {
    adminProduct.GetProperty(req, res);
});
router.get('/admin/all-project',isLoggedIn, (req, res) => {
    adminProduct.GetProject(req, res);
});
router.get('/get/all-property-featured',isLoggedIn, (req, res) => {
    adminProduct.GetAllFeaturedProject(req, res);
});

router.get('/admin/add-property',isLoggedIn, (req, res) => {
    adminProduct.GetAddProperty(req, res);
});

router.get('/admin/property/add-main-featured/:id',isLoggedIn, (req, res) => {
    adminProduct.GetAddMainFeatured(req, res);
});
router.get('/admin/project/add-main-featured1/:id',isLoggedIn, (req, res) => {
    adminProduct.GetAddMainFeatured1(req, res);
});
// router.get('/admin/feature/add-main-featured/:id',isLoggedIn, (req, res) => {
//     adminProduct.GetAddMainFeatured2(req, res);
// });

router.post('/add/property', (req, res) => {
    adminProduct.AddProperty(req, res);
});
router.get('/edit/property/:id', (req, res) => {
    adminUserScript.GetEditProperty(req, res);
});
router.get('/edit/project/:id', (req, res) => {
    adminUserScript.GetEditProject(req, res);
});
router.get('/edit/property-project/:id', (req, res) => {
    adminUserScript.GetEditProjectProperty(req, res);
});


router.post('/edit/property/:id', (req, res) => {
    adminUserScript.PostEditProperty(req, res);
});
router.post('/edit/project/:id', (req, res) => {
    adminUserScript.PostEditProject(req, res);
});
router.post('/edit/project-feature/:id', (req, res) => {
    adminUserScript.PostEditProjectProperty(req, res);
});

router.get('/admin/delete/property/:id',(req,res)=>{
    adminProduct.deleteProduct(req,res);
});
router.get('/admin/delete/project/:id',(req,res)=>{
    adminProduct.deleteProject(req,res);
});
router.get('/admin/delete/feature/:id',(req,res)=>{
    adminProduct.deleteFeature(req,res);
});


router.get('/admin/property-image/:id', (req, res) => {
    adminProduct.GetAddPropertyImages(req, res);
});
router.post('/add/property-image/:id', (req, res) => {
    adminProduct.AddPropertyImages(req, res);
});
router.get('/admin/delete/image/:id',function(req,res){
    adminProduct.deletePropertyImage(req,res);
});

router.get('/admin/property-type/:id', (req, res) => {
    adminProduct.GetAddPropertyType(req, res);
});
router.post('/add/property-type/:id', (req, res) => {
    adminProduct.AddPropertyType(req, res);
});
router.get('/admin/delete/type/:id',function(req,res){
    adminProduct.deletePropertyType(req,res);
});

router.get('/admin/add/plot/:id', (req, res) => {
    adminProduct.GetAddPlot(req, res);
});
router.post('/add/plot/:id', (req, res) => {
    adminProduct.AddPlot(req, res);
});
router.get('/admin/delete/plot/:id',function(req,res){
    adminProduct.deletePropertyPlot(req,res);
});

router.get('/admin/add/payment/:id', (req, res) => {
    adminProduct.GetAddPaymentImages(req, res);
});
router.post('/add/payment-images/:id', (req, res) => {
    adminProduct.AddPaymentImages(req, res);
});
router.get('/admin/delete/payment/:id',function(req,res){
    adminProduct.deletePropertyPayment(req,res);
});


router.get('/admin/add/other-facilities/:id', (req, res) => {
    adminProduct.GetAddOtherFacilities(req, res);
});
router.post('/add/other-facilities/:id', (req, res) => {
    adminProduct.AddOtherFacilities(req, res);
});
router.get('/admin/delete/other-facilities/:id',function(req,res){
    adminProduct.deletePropertyType(req,res);
});



router.get('/admin/add/near-location/:id', (req, res) => {
    adminProduct.GetAddNearByLocation(req, res);
});
router.post('/add/nearby-location/:id', (req, res) => {
    adminProduct.AddNearByLocation(req, res);
});
router.get('/admin/delete/nearByLocation/:id',function(req,res){
    adminProduct.deletePropertyNearByLocation(req,res);
});

router.get('/admin/add/features/:id', (req, res) => {
    adminProduct.GetAddMainFeatures(req, res);
});
router.post('/add/main-features/:id', (req, res) => {
    adminProduct.AddMainFeatures(req, res);
});
router.get('/admin/delete/mainFeature/:id',function(req,res){
    adminProduct.deletePropertymainFeature(req,res);
});

router.get('/admin/add/health-care/:id', (req, res) => {
    adminProduct.GetAddHealthCare(req, res);
});
router.post('/add/healthcare-recreational/:id', (req, res) => {
    adminProduct.AddHealthCare(req, res);
});
router.get('/admin/delete/healthCare/:id',function(req,res){
    adminProduct.deletePropertyHealthCare(req,res);
});

router.get('/admin/add/floor-plane/:id', (req, res) => {
    adminProduct.GetAddFloorPlan(req, res);
});
router.post('/add/floor-plan/:id', (req, res) => {
    adminProduct.AddFloorPlan(req, res);
});
router.get('/admin/delete/floorPlan/:id',function(req,res){
    adminProduct.deletePropertyFloorPlan(req,res);
});

router.get('/admin/add/developer/:id', (req, res) => {
    adminProduct.GetAddDeveloper(req, res);
});
router.post('/add/developer/:id', (req, res) => {
    adminProduct.AddDeveloper(req, res);
});
router.get('/admin/delete/developer/:id',function(req,res){
    adminProduct.deletePropertyDeveloper(req,res);
});

router.get('/admin/add/communication/:id', (req, res) => {
    adminProduct.GetAddCommunication(req, res);
});
router.post('/add/communication/:id', (req, res) => {
    adminProduct.AddCommunication(req, res);
});
router.get('/admin/delete/communication/:id',function(req,res){
    adminProduct.deletePropertyCommunication(req,res);
});

router.get('/admin/add/room/:id', (req, res) => {
    adminProduct.GetAddRoom(req, res);
});
router.post('/add/room/:id', (req, res) => {
    adminProduct.AddRooms(req, res);
});
router.get('/admin/delete/room/:id',function(req,res){
    adminProduct.deletePropertyRoom(req,res);
});



router.get('/get/all-property',checkJwtToken, (req, res) => {
    adminProduct.GetAllProperty(req, res);
});
router.get('/get/all-property-featured', (req, res) => {
    adminProduct.GetAllPropertyFeatured(req, res);
});


router.get('/get/property-details/:id',checkJwtToken, (req, res) => {
    adminProduct.GetPropertyDetails(req, res);
});
router.get('/get/project-details/:id', (req, res) => {
    adminProduct.GetProjectDetails(req, res);
});



router.get('/get/buy/property', (req, res) => {
    adminProduct.GetAllBuyProperty(req, res);
});
router.get('/get/sell/property', (req, res) => {
    adminProduct.GetAllSellProperty(req, res);
});
router.get('/get/rent/property', (req, res) => {
    adminProduct.GetAllRentProperty(req, res);
});

router.get('/get/user-profile/:userId', (req, res) => {
    adminProduct.GetUserProfile(req, res);
});
router.post('/edit/user-profile/:userId', (req, res) => {
    adminProduct.EditUserProfile(req, res);
});


router.get('/admin/get/about-us', isLoggedIn, (req, res) => {
    adminUserScript.GetAboutUs(req, res);
});
router.post('/admin/add/about-us',isLoggedIn, (req, res) => {
    adminUserScript.AddAboutUs(req, res);
});
router.get('/admin/delete/about-us/:id',isLoggedIn, (req, res) => {
    adminUserScript.deleteAboutUs(req, res);
});

router.get('/admin/get/our-team', isLoggedIn, (req, res) => {
    adminUserScript.GetAllOurTeam(req, res);
});
router.post('/admin/add/our-team', isLoggedIn, (req, res) => {
    adminUserScript.AddOurTeam(req, res);
});
router.get('/admin/delete/our-team/:id',isLoggedIn, (req, res) => {
    adminUserScript.deleteOurTeam(req, res);
});

router.get('/admin/get/all/call-us', isLoggedIn, (req, res) => {
    adminUserScript.GetAllCallUs(req, res);
});
router.post('/admin/add/call-us', isLoggedIn, (req, res) => {
    adminUserScript.AddCallUs(req, res);
});
router.get('/admin/delete/call-us/:id',(req,res)=>{
    adminUserScript.deleteCallUs(req,res);
});

router.get('/admin/get/all/office-address', isLoggedIn, (req, res) => {
    adminUserScript.GetAllOfficeAddress(req, res);
});
router.post('/admin/add/office-address', isLoggedIn, (req, res) => {
    adminUserScript.AddOfficeAddress(req, res);
});
router.get('/admin/delete/office-address/:id',(req,res)=>{
    adminUserScript.deleteOfficeAddress(req,res);
});

router.get('/admin/get/all/map', isLoggedIn, (req, res) => {
    adminUserScript.GetAllMap(req, res);
});
router.post('/admin/add/map', (req, res) => {
    adminUserScript.AddPropertyMap(req, res);
});
router.get('/admin/delete/map/:id',(req,res)=>{
    adminUserScript.deleteMap(req,res);
});


router.get('/admin/get/all/social-contact/:id',isLoggedIn, (req, res) => {
    adminUserScript.GetAllSocialContact(req, res);
});
router.post('/admin/post/all/social-contact/:id',isLoggedIn, (req, res) => {
    adminUserScript.AddSocialContact(req, res);
});
router.get('/register/users',isLoggedIn, (req, res) => {
    adminUserScript.GetAllRegisterUser(req, res);
});
router.get('/register/delete/users/:id',isLoggedIn, (req, res) => {
    adminProduct.GetAllRegisterDeleteUser(req, res);
});

router.get('/all-buy',isLoggedIn, (req, res) => {
    adminUserScript.GetAllbuy(req, res);
});
router.get('/all-rent',isLoggedIn, (req, res) => {
    adminUserScript.GetAllRent(req, res);
});

router.get('/admin/get/project-details/:id', (req, res) => {
    adminUserScript.GetAdminProjectDetails(req, res);
});
router.get('/admin/get/feature-details/:id', (req, res) => {
    adminUserScript.GetAdminFeatureDetails(req, res);
});


router.get('/admin/message', (req, res) => {
    adminUserScript.GetMessage(req, res);
});
router.post('/admin/post/message/:id', (req, res) => {
    adminUserScript.GetPostMessages(req, res);
});
router.get('/admin/delete/message/:id',(req,res)=>{
    adminUserScript.deleteUserMessage(req,res);
});



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    return res.redirect('/weAlways-App/admin');
}
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