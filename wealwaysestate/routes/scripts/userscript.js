let User = require("../../models/user");
let AboutUs = require("../../models/aboutUs");
let OurTeam = require("../../models/ourTeam");
let jwtConfig = require("../../config/jwtConfig");
let CallUs = require('../../models/callUs');
let Property = require('../../models/property');
let Favourite = require('../../models/favourite');
let Message = require('../../models/messages');
let SocialContact = require('../../models/social_contact');
let OfficeAddress = require('../../models/office_location');
let Maps = require('../../models/contactMap');
let bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
let nodemailer = require('nodemailer');
let api_key = '9b7587990e46d7d45b905282596f3162-77751bfc-d0ba1c81';
let domain = 'sandbox05a3da0b94bb421caa02db795b3536dc.mailgun.org';
let mailgun = require('mailgun-js')({apiKey:api_key,domain:domain});

var secret = require('../../config/secret');

let options = {
  priority: "high",
  timeToLive: 60 * 60 * 24,
};

const saltRounds = 10;
module.exports = {
  Home: async function (req, res) {
    res.send("Welcome......")
  },

  LoginUser: async function (req, res) {
    try {
      let emailNumber;
      if (Number(req.body.email)) {
        emailNumber = {
          contactNumber: req.body.email.toLowerCase().replace(/\s/g, ""),
        };
      } else {
        emailNumber = {
          email: req.body.email.toLowerCase().replace(/\s/g, ""),
        };
      }
      let user = await User.findOne(emailNumber);
      if (user == null || user.length < 1) {
        return res.send({ Success: false, message: "User Not Found" });
      }
      const match = await bcrypt.compare(req.body.password, user.password);

      let loginUser = user;
      if (match) {
        if (req.body.mobileToken != undefined && req.body.mobileToken != "") {
          if (user.mobileToken != req.body.mobileToken) {
            user.mobileToken = req.body.mobileToken;
          }
        }
        user.onlineStatus = true;
        await user.save(function (err, user) {
          if (err) console.log(err);
          //else res.send({ "Success": true, "message": "Verification successfull!" })
        });
        //const token = jwt.sign({ username: user.username }, jwtConfig.secret, { expiresIn: 86400}); 24 hours
        const token = jwt.sign({ loginUser }, jwtConfig.secret, {
          expiresIn: 8640000,
        });
        const {_id,name,email} = user;
        // res.json({token,user:{_id}});
        res.send({ Success: true, token, user: loginUser });
      } else {
        return res.send({ Success: false, message: "password is not correct" });
      }
    } catch (err) {
      console.log(err);
      res.send({ Success: false, err });
    }
  },

    Register: async function (req, res) {
      
    if (req.body.contactNumber == undefined || req.body.contactNumber == "") {
      return res.send({
        Success: false,
        message: "Contact Number is required!",
      });
    }
    if (req.body.password == undefined || req.body.password == "") {
      return res.send({ Success: false, message: "Password is required!" });
    }
    if (isNaN(req.body.contactNumber)) {
      return res.send({
        Success: false,
        message: "Phone number must be a number!",
      });
    }
	    if (req.body && req.body.email != undefined && req.body.email != "") {
	      let user = await User.findOne({
	        $or: [
	          { email: req.body.email.toLowerCase().replace(/\s/g, "") },
	          { contactNumber: req.body.contactNumber },
	        ],
	      });
	      if (user != null && user != "") {
	        return res.send({
	          Success: false,
	          message: "Username | Phone number already exists!",
	        });
	      }
	    } else {
	      return res.send({ Success: false, message: "Email is required!" });
	    }
	
	    let newUser = new User();
		    let defaultProfilePic = "uploads/profile/default-pic.jpg";
		    
		    newUser.fullName = req.body.fullName;
		    //newUser.username = req.body.username.toLowerCase().replace(/\s/g, '');
		    newUser.email = req.body.email.toLowerCase().replace(/\s/g, "");
		    newUser.contactNumber = req.body.contactNumber;
		    newUser.lastLogin = new Date();
		    newUser.profilePic = defaultProfilePic;
		    let salt = bcrypt.genSaltSync(saltRounds);
		    
		    let hash = bcrypt.hashSync(req.body.password, salt);
		    newUser.password = hash;
		    console.log(newUser)
		    newUser.save(async function (err, user) {
		      console.log(user)
		      if (err) {
		        res.send(err);
		      } else {
		        const token = jwt.sign({ user }, jwtConfig.secret, {
		          expiresIn: 8640000,
		        });
		        res.send({ Success: true, token, user: user });
		      }
		    });
  },

  forgotPassword: async (req, res) => {
    try {
      if (req.body.email == undefined || req.body.email == "") {
        return res.send({
          Success: false,
          message: "Email is required.",
          number: req.body.email,
        });
      }
      let user = await User.findOne({ email: req.body.email });
      if (user != null) {
        let OTPCODE = await Math.floor(1000 + Math.random() * 9000);

        let token = jwt.sign({ foo: "bar" }, "shhhhh");
        user.resetPasswordToken = token;
        user.OTPCOde = OTPCODE;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(async function (err) {
          if (err) {
            console.log(err);
          } else {
             var smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                      user: secret.auth.user,
                      pass: secret.auth.pass
                    }
                });
                
                var mailOptions = {
                    to:req.body.email, // UserEmail@gmail.com
                    from: 'WeAlwaysApp '+'<'+secret.auth.user+'>',
                    subject: 'WeAlways Application Password Reset Token.\n\n ',
                    text: '<'+ req.body.email +'>'+'You have requested for password reset token.\n\n'+
                              'You have received your PIN CODE' +'<'+ OTPCODE +'>\n\n',

                };
                
                smtpTransport.sendMail(mailOptions, (err, response) => {
                    if (response) {
                        return res.send({
                          Success: true,
                          message: "Message sent to your Email",
                          number: req.body.email,
                          'OTP' : OTPCODE
                        });
                      }

                });

          }
        });
      } else {
        return res.send({
          Success: false,
          message: "Email not found",
          number: req.body.email,
        });
      }
    } catch (err) {
      console.log(err);
      res.send({ Success: false, err });
    }
  },

  PostResetPasswordToken: async (req, res) => {
    try {
      if (req.body.email == undefined || req.body.email == "") {
        return res.send({
          Success: false,
          message: "User Email is required.",
        });
      }
      if (req.body.code == undefined || req.body.code == "") {
        return res.send({ Success: false, message: "OTP code is required." });
      }
      if (!Number(req.body.code)) {
        return res.send({
          Success: false,
          message: "OTP code must be number.",
        });
      }

      User.findOne(
        { email: req.body.email },

        function (err, user) {
          // console.log(user.OTPCOde)
          if (!user) {
            res.send({ Success: false, message: "Invalid Eamil." });
          } else {
            if (user.resetPasswordExpires > Date.now()) {
              if (user.OTPCOde == Number(req.body.code)) {
                if (user.resetPasswordToken != "") {
                    user.resetPasswordToken = "";
                }
                if (user.resetPasswordExpires != "") {
                  user.resetPasswordExpires = "";
                }
                user.save(async function (err, savedUser) {
                  if (err) {
                    res.send({ Success: false, message: "Invalid code." });
                  } else {
                    res.send({ Success: true, message: savedUser.email });
                  }
                });
              } else {
                res.send({ Success: false, message: "Invalid code." });
              }
            } else {
              res.send({
                Success: false,
                message: "Your OTP has been expired please request new code.",
              });
            }
          }
        }
      );
    } catch (err) {
      res.send({ Success: false, mesasge: "Please request password Again!" });
    }
  },

  resetPasswordConfirmationSubmission: async function (req, res) {
    if (req.body.newPassword == undefined || req.body.newPassword == "") {
      return res.send({ Success: false, message: "New Password is required." });
    }
    if (
      req.body.confirmPassword == undefined ||
      req.body.confirmPassword == ""
    ) {
      return res.send({
        Success: false,
        message: "Confirm Password is required.",
      });
    }
    if (req.body.newPassword != req.body.confirmPassword) {
      return res.send({ Success: false, message: "Password did not match" });
    }
    if (req.body.email == undefined || req.body.email == "") {
      return res.send({ Success: false, message: "Email is required." });
    }
    User.findOne({ email: req.body.email }, function (err, user) {
      if (err) {
        return res.send({ Success: false, message: err });
      }
      if (user != null && user != "") {
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(req.body.newPassword, salt);
        user.password = hash;
        user.save(async function (err, savedUser) {
          if (err) {
            res.send({ Success: false, message: err });
          } else {
            const token = jwt.sign({ savedUser }, jwtConfig.secret, {
              expiresIn: 8640000,
            });
            res.send({
              Success: true,
              user: savedUser,
              token: token,
              message: "Password changed successfully",
            });
          }
        });
      } else {
        return res.send({ Success: false, message: "user not found" });
      }
    });
  },


    logoutUser: async (req, res) => {
	    try {
	      let user = await User.findOne({ _id: req.params.userId });
	      if (!user) {
	        return res.send({ Success: false, message: "User not found" });
	      } else {
	        user.onlineStatus = false;
	        await user.save(function (err, user) {
	          if (err) console.log(err);
	          else
	            return res.send({ Success: true, message: "Logout successfull!" });
	        });
	      }
	    } catch (err) {
	      console.log(err);
	      res.send({ Success: false, err });
	    }
	  },

    GetAllAboutUs:async function(req,res){
       let aboutUs = await AboutUs.find({});
       if(aboutUs){
         return res.send({ Success: true, message: "All About Us Data!",aboutUs });
       }else{
         return res.send({ Success: false, message: "Empty data" });
       }
    },
    GetAllOurTeam:async function(req,res){
       let ourTeam = await OurTeam.find({});
       if(ourTeam){
         return res.send({ Success: true, message: "All Our Team Data!",ourTeam });
       }else{
         return res.send({ Success: false, message: "Empty data" });
       }
    },
    // deleteOurTeam: async function (req, res) {
    //     let map = await OurTeam.deleteOne({ _id: req.params.id });
    //     res.redirect('/admin/get/all/map')
    // },
    GetAllOurTimeAndAboutUs:async function(req,res){
       let aboutUs = await AboutUs.find({});
       let ourTeam = await OurTeam.find({});
       if(ourTeam && aboutUs){
         return res.send({ Success: true, message: "All OurTeam and AboutUs Data!",aboutUs,ourTeam });
       }else{
         return res.send({ Success: false, message: "Empty data" });
       }
    },
    GetAllContactUs:async function(req,res){
       let callUs = await CallUs.find({});
       let officeAddress = await OfficeAddress.find({});
       let map = await Maps.find({});
       if(callUs && officeAddress && map){
         return res.send({ Success: true, message: "All Call Us and Office Address Data!",callUs,officeAddress,map });
       }else{
         return res.send({ Success: false, message: "Empty data" });
       }
    },
    // ---------------------------------------------------------------------
   GetAllFeatured:async function(req,res){
      jwt.verify(req.token,jwtConfig.secret,async function(err,data){
        if(err){
          var allFeatured = [];
          var featureds = await Property.find({isFeatured:true}).sort('-createdAt');
            if(featureds != null && featureds !=""){
                  for (const featured of featureds) {
                      let favourited = false;
                      let mainObject = {}
                         mainObject.favourited = favourited;
                         mainObject.featured = featured;
                        await allFeatured.push(mainObject);
            
                  }
              }
          if(allFeatured){
         return res.send({'Success' : true,'message' : 'Get All Featured Property',allFeatured})
      }else{
         return res.send({'Success' : false,'message' : 'Featured lists Empty'})
      }
        }else{
          allFeatured = [];
          var featureds = await Property.find({isFeatured:true}).sort('-createdAt');   
      if(featureds != null && featureds !=""){
          for (const featured of featureds) {
              let favourited = false;
              let mainObject = {}
              let favourite = await Favourite.findOne({userId : data.loginUser._id,propertyId : featured._id});
              if(favourite != null && favourite !=""){
                 favourited = true;
              }
                 mainObject.favourited = favourited;
                 mainObject.featured = featured;
                await allFeatured.push(mainObject);
    
          }
      }
      if(allFeatured){
         return res.send({'Success' : true,'message' : 'Get All Featured Property',allFeatured})
      }else{
         return res.send({'Success' : false,'message' : 'Featured lists Empty'})
      }
        }
      })
      
   },

   GetAllProject:async function(req,res){
        projects = [];
        var project = await Property.find({isFeatured:false}).sort('-createdAt');   
     if(project != null && project !=""){
        for (const featured of project) {
            let mainObject = {}
            let socialContact = await SocialContact.findOne({propertyId : featured._id});
            // if(favourite != null && favourite !=""){
            //    favourited = true;
            // }
              mainObject.socialContact = socialContact;
              mainObject.project = featured;
              await projects.push(mainObject);
          }
      }
      // var projects = await Property.find({isFeatured:false}).sort('-createdAt');
      // var socialContact = await SocialContact.findOne({productId:projects._id});
      if(projects){
         return res.send({'Success' : true,'message' : 'Get All Project',projects})
      }else{
         return res.send({'Success' : false,'message' : 'Project lists Empty'})
      }
   },
   searchProperty: async function (req, res) {
       jwt.verify(req.token,jwtConfig.secret,async function(err,data){
        if(err){
        if((req.body.title == undefined || req.body.title =='') && (req.body.location == undefined || req.body.location =="")){ 
            return res.send({'Success' : true,'message' : 'Search fields cannot be empty'})
        }
        let propertyAll = []
        if(req.body.title != undefined && req.body.title !="" && req.body.location != undefined && req.body.location !=""){
            let properties = await Property.find({isFeatured:true,
                $and: [
                    { title : {$regex: new RegExp(req.body.title, 'i')}},
                    { $or: [{location: {$regex: new RegExp(req.body.location, 'i')}},{location: {$regex: new RegExp(req.body.location, 'i')}}] }
                ],isActive : 1,status:'Present'}).lean();
                if(properties != null && properties !=""){
                    for (const property of properties) {
                        let favourited = false;
                        let mainObject = {}
                        mainObject.property = property
                        mainObject.favourited = favourited;
                        await propertyAll.push(mainObject);
    
                    }
                }
                return res.send({'Success' : true,'Property' : propertyAll})
        }
        if(req.body.title != undefined && req.body.title !=""){
            let properties = await Property.find({isFeatured:true ,title: {$regex: new RegExp(req.body.title, 'i')},isActive : 1 ,status:'Presend'}).lean();
                if(properties != null && properties !=""){
                    for (const property of properties) {
                        let favourited = false;
                        let mainObject = {}
                        mainObject.favourited = favourited;
                        mainObject.property = property;
                       await propertyAll.push(mainObject);
    
                    }
                }
                return res.send({'Success' : true,'property' : propertyAll})
        }
        if(req.body.location != undefined && req.body.location !=""){
            let properties = await Property.find({isFeatured:true,
                $or:[ {location:{$regex: new RegExp(req.body.location, 'i')}}, {location:{$regex: new RegExp(req.body.location, 'i')}}, {location:{$regex: new RegExp(req.body.location, 'i')}} ]
                ,isActive : 1,status:'Approved' })
                if(properties != null && properties !=""){
                    for (const property of properties) {
                        let favourited = false;
                        let mainObject = {}
                        mainObject.favourited = favourited;
                        mainObject.property = property;
                        await propertyAll.push(mainObject);
    
                    }
                }
                return res.send({'Success' : true,'property' : propertyAll})
        }
      }else{
        if((req.body.title == undefined || req.body.title =='') && (req.body.location == undefined || req.body.location =="")){ 
            return res.send({'Success' : true,'message' : 'Search fields cannot be empty'})
        }
        let propertyAll = []
        if(req.body.title != undefined && req.body.title !="" && req.body.location != undefined && req.body.location !=""){
            let properties = await Property.find({isFeatured:true,
                $and: [
                    { title : {$regex: new RegExp(req.body.title, 'i')}},
                    { $or: [{location: {$regex: new RegExp(req.body.location, 'i')}},{location: {$regex: new RegExp(req.body.location, 'i')}}] }
                ],isActive : 1,status:'Present'}).lean();
                if(properties != null && properties !=""){
                    for (const property of properties) {
                        let favourited = false;
                        let mainObject = {}
                        let favourite = await Favourite.findOne({userId : data.loginUser._id,propertyId : property._id});
                        if(favourite != null && favourite !=""){
                            favourited = true;
                        }
                        mainObject.property = property
                        mainObject.favourited = favourited;
                        await propertyAll.push(mainObject);
    
                    }
                }
                return res.send({'Success' : true,'Property' : propertyAll})
        }
        if(req.body.title != undefined && req.body.title !=""){
            let properties = await Property.find({title: {$regex: new RegExp(req.body.title, 'i')},isActive : 1 ,status:'Presend'}).lean();
                if(properties != null && properties !=""){
                    for (const property of properties) {
                        let favourited = false;
                        let mainObject = {}
                        let favourite = await favourite.findOne({userId : data.loginUser._id,propertyId : property._id});
                        if(favourite != null && favourite !=""){
                            favourited = true;
                        }
                        mainObject.favourited = favourited;
                        mainObject.property = property;
                       await propertyAll.push(mainObject);
    
                    }
                }
                return res.send({'Success' : true,'property' : propertyAll})
        }
        if(req.body.location != undefined && req.body.location !=""){
            let properties = await Property.find({
                $or:[ {location:{$regex: new RegExp(req.body.location, 'i')}}, {location:{$regex: new RegExp(req.body.location, 'i')}}, {location:{$regex: new RegExp(req.body.location, 'i')}} ]
                ,isActive : 1,status:'Approved' })
                if(properties != null && properties !=""){
                    for (const property of properties) {
                        let favourited = false;
                        let mainObject = {}
                        let favourite = await Favourite.findOne({userId : data.loginUser._id,productId : property._id});
                        if(favourite != null && favourite !=""){
                            favourited = true;
                        }
                        mainObject.favourited = favourited;
                        mainObject.property = property;
                        await propertyAll.push(mainObject);
    
                    }
                }
                return res.send({'Success' : true,'property' : propertyAll})
        }
      }
    });

    },

     searchProject: async function (req, res) {
        if((req.body.title == undefined || req.body.title =='')){ 
            return res.send({'Success' : true,'message' : 'Search fields cannot be empty'})
        }
        // let propertyAll = []
        if(req.body.title != undefined && req.body.title !=""){
            let propertyAll = await Property.find({isFeatured:false,
                $and: [
                    { title : {$regex: new RegExp(req.body.title, 'i')}},
                ],isActive : 1,status:'Present'}).lean();
                return res.send({'Success' : true,'Project' : propertyAll})
        }
        if(req.body.title != undefined && req.body.title !=""){
            let propertyAll = await Property.find({isFeatured:false ,title: {$regex: new RegExp(req.body.title, 'i')},isActive : 1 ,status:'Presend'}).lean();
                return res.send({'Success' : true,'Project' : propertyAll})
        }
        
    },

     GetAllFavouriteProperty:async function(req,res){
     try {
            if(req.params.userId == '' || req.params.userId == undefined){
                return res.send({'Success' : false,'message' : 'User id is required.'})
            }

            let favourite = await Favourite.find({userId:req.params.userId})
              .populate("propertyId");//.populate("userId")
            return res.send({'Success':true,'message':'Get User Favourite Property',favourite})    
     }catch(error){
       return res.send({'Success' : false,'message' : error.message})
     }
   },
 addFavourite: async function (req, res) {
        try {
            if(req.params.userId == '' || req.params.userId == undefined){
                return res.send({'Success' : false,'message' : 'User id is required.'})
            }
            if(req.params.propertyId == '' || req.params.propertyId == undefined){
                return res.send({'Success' : false,'message' : 'property id is required.'})
            }
            let favourite = await Favourite.findOne({propertyId : req.params.propertyId, userId : req.params.userId});
            //console.log(foundWihslist);
            if(favourite != null && favourite !=''){
                await favourite.remove(async()=>{
                return res.send({'Success' : true,'message' : 'Property Id removed from Favourite'})
                 });
             }
            else{

                let newFavourite = new Favourite();
                newFavourite.userId = req.params.userId;
                newFavourite.propertyId = req.params.propertyId;
                await newFavourite.save()
                   return res.send({'Success' : true,'message' : 'Property added to Favourite',newFavourite})
            }
            
        } catch (error) {
            return res.send({'Success' : false,'message' : error.message})
        }
    },
  //addFavourite: async function (req, res) {
   //      try {
   //          if(req.params.userId == '' || req.params.userId == undefined){
   //              return res.send({'Success' : false,'message' : 'User id is required.'})
   //          }
   //          if(req.params.propertyId == '' || req.params.propertyId == undefined){
   //              return res.send({'Success' : false,'message' : 'property id is required.'})
   //          }
   //          let propertyUser = await Property.findOne({_id : req.params.propertyId});
   //          let favourite = await Favourite.findOne({propertyId : req.params.propertyId, userId : req.params.userId});
   //          //console.log(foundWihslist);
   //          if(favourite != null && favourite !=''){
   //              await favourite.remove(async()=>{

   //                 await Property.updateOne({
   //                        _id:req.params.propertyId,
   //                  },{
   //                    $pull:{
   //                      "favourite":{
   //                        userId:req.params.userId
   //                      }
   //                    }
   //                  });
   //              return res.send({'Success' : true,'message' : 'Property Id removed from Favourite'})
   //               });
   //      }
   //          else{

   //              let newFavourite = new Favourite();
   //              newFavourite.userId = req.params.userId;
   //              newFavourite.propertyId = req.params.propertyId;
   //              await newFavourite.save(async function(){
   //                   await Property.findByIdAndUpdate(req.params.propertyId,{
   //                        $push:{
   //                          favourite:{
   //                            userId:req.params.userId
   //                          }
   //                        }
   //                    },{
   //                        new:true
   //                    });
   //                 return res.send({'Success' : true,'message' : 'Property added to Favourite',propertyUser})
   //              });
   //          }
            
   //      } catch (error) {
   //          return res.send({'Success' : false,'message' : error.message})
   //      }
   // },

    PostMessages:async function(req,res){
      if(req.body.userId == '' || req.body.userId == undefined){
        return res.send({'Success' : false,'message' : 'User id is required.'})
       }
      if(req.body.name == '' || req.body.name == undefined){
        return res.send({'Success' : false,'message' : 'Full Name is required.'})
       }
       if(req.body.email == '' || req.body.email == undefined){
        return res.send({'Success' : false,'message' : 'Email is required.'})
       }
       if(req.body.contactNumber == '' || req.body.contactNumber == undefined){
        return res.send({'Success' : false,'message' : 'Contact Number is required.'})
       }
       if(req.body.message == '' || req.body.message == undefined){
        return res.send({'Success' : false,'message' : 'Message is required.'})
       }
       let newMessage = new Message();
       newMessage.name = req.body.name;
       newMessage.email = req.body.email;
       newMessage.contactNumber = req.body.contactNumber;
       newMessage.userId = req.body.userId;
       newMessage.message = req.body.message;
       
      newMessage.save();
      return res.send({'Success' : true,'message' : 'Message Send successfull',newMessage})
            
    },


 

}







