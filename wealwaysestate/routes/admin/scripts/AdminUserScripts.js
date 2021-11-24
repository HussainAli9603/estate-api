let adminUser = require('../../../models/adminuser');
let adminRole = require('../../../models/adminrole');
let Users = require('../../../models/user');
let Property = require('../../../models/property');
let Country = require('../../../models/country');
let City = require('../../../models/city');
let AboutUs = require('../../../models/aboutUs');
let OurTeam = require('../../../models/ourTeam');
let CallUs = require('../../../models/callUs');
let Maps = require('../../../models/contactMap');
let OfficeAddress = require('../../../models/office_location');
let SocialContact = require('../../../models/social_contact');
let PropertyImages = require('../../../models/property_images');
let PropertyType = require('../../../models/property_types');
let PlotFeatures = require('../../../models/plot_features');
let PaymentImages = require('../../../models/payment_plans');
let OtherFacilities = require('../../../models/other_facilities');
let AddNearByLocation = require('../../../models/nearby_location_facilities');
let MainFeature = require('../../../models/main_features');
let HealthCare = require('../../../models/healthcare_recreational');
let FloorPlan = require('../../../models/floor_plans');
let Developer = require('../../../models/developer');
let Communication = require('../../../models/communication');
let Messages = require('../../../models/messages');
let Rooms = require('../../../models/rooms');
let jwt = require('jsonwebtoken');

const saltRounds = 10;
let options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
  };
module.exports = {
    Login: async function (req, res) {
        res.render('admin/login');
    },
    adminDashboard: async function (req, res) {
       Promise.all([
            Users.countDocuments({}),
            Property.countDocuments({isFeatured:true}),
            Property.countDocuments({isFeatured:false}),
            Property.countDocuments({purpose:'Rent'}),
            Property.countDocuments({purpose:'Buy'}),
            Messages.countDocuments({}),
            Messages.find({unRead:'1'}).sort('-createdAt').limit(5),
            
        ]).then(([users,feature,project,rent,buy,message,messageUnread]) => {
              //console.log(exchangeProduct)
            res.render('admin/index', { users,feature,project,rent,buy,message,messageUnread,admin:req.user });
        });
    },
    adminRegister: async function (req, res) {
        if(req.body.fullName == undefined || req.body.fullName ==''){
            return res.send({ "Success": false, "message": "Name is required" })
        }
        if(req.body.email == undefined || req.body.email ==''){
            return res.send({ "Success": false, "message": "email is required" })
        }
        if(req.body.contactNumber == undefined || req.body.contactNumber ==''){
            return res.send({ "Success": false, "message": "contact Number is required" })
        }
        if(req.body.password == undefined || req.body.password ==''){
            return res.send({ "Success": false, "message": "Password is required" })
        }
        if(req.body.cpassword == undefined || req.body.cpassword ==''){
            return res.send({ "Success": false, "message": "Confirm Password is required" })
        }
        if(req.body.password != req.body.cpassword){
            return res.send({ "Success": false, "message": "Password did not match" })
        }
        if(req.body.role == undefined || req.body.role ==''){
            return res.send({ "Success": false, "message": "User role is required" })
        }
        let newUser = new adminUser();
        newUser.fullName = req.body.fullName;
        newUser.username = req.body.username;
        newUser.email = req.body.email;
        newUser.contactNumber = req.body.contactNumber;
        newUser.roleId = req.body.role;
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(req.body.password, salt);
        newUser.password = hash;
        newUser.save(function (err, user) {
            if (err) res.send(err);
            else res.send({ "Success": true, "message": "Your account has been created Successfully!" })
        })
    },
    logoutUser: async (req, res) => {
      try {
        let user = await adminUser.findOne({ _id: req.user._id });
        if (!user) {
          return res.send({ Success: false, message: "User not found" });
        } else {
            req.logout();
            req.session.destroy((err) => {
               res.redirect('/weAlways-App/admin');
            });
        }
      } catch (err) {
        console.log(err);
        res.send({ Success: false, err });
      }
    },
    CreateCountry: async function (req, res) {
        let country = new Country();
        country.title = req.body.title;
        country.save(function (err, user) {
            if (err) res.send(err);
            else res.send({ "success": true, "message": "Record inserted Successfully!" })
        })
    },
    ViewAllCountries: async function (req, res) {
        let countries = await Country.find({}).sort('-createdAt');
        res.render('admin/country', { countries,admin:req.user });
    },
    editCountry: async function(req,res){
        let id = req.params.id;
        let countries = await Country.findById({_id:id}).sort('-createdAt');
        res.render("admin/edit_country",{
            countries,
            admin:req.user
        })
    }, 
    saveUpdateCountry : async function(req,res){
        let id = req.params.id;
        let title = req.body.title;
        Country.findById({_id:id},(err,updateCountry)=>{
            if(err) return err;
            updateCountry.title = title;
            updateCountry.save(err=>{
                if(err){
                    console.log(err)
                }
                res.redirect('/admin/country')
                
            })
        })
    },

    deleteCountry: async function (req, res) {
        let countries = await Country.deleteOne({ _id: req.params.id });
        res.redirect('/admin/country')
    },

   ViewAllCities: async function (req, res) {
        let cities = await City.find({}).populate('countryId').sort('-createdAt');
        let countries = await Country.find({}).sort('-createdAt');
        res.render('admin/city', { cities, countries,admin:req.user });
    },
   CreateCity: async function (req, res) {
        let city = new City();
        city.title = req.body.title;
        city.countryId = req.body.countryId;
        city.save(function (err, user) {
            if (err) res.send(err);
            else res.send({ "Success": true, "message": "Record inserted Successfully!" })
        })
    },
    editCity: async function(req,res){
        let id = req.params.id;
        let countries = await Country.find().sort('-createdAt');
        let cities = await City.findById({_id:id}).populate('countryId').sort('-createdAt');
        res.render("admin/edit_city",{
            cities,
            countries,
            admin:req.user
        })
    }, 
    saveUpdateCity : async function(req,res){
        let id = req.params.id;
        let title = req.body.title;
        let countryId = req.body.countryId;
    
          City.findById({_id:id},(err,updateCity)=>{
            if(err) return err;
            updateCity.title = title;
            updateCity.countryId = countryId;
            updateCity.save(err=>{
                if(err){
                    console.log(err)
                }
                res.redirect('/admin/city')
                
            })
        })
    },
    deleteCity: async function (req, res) {
        let city = await City.deleteOne({ _id: req.params.id });
        res.redirect('/admin/city')
    },

   GetAboutUs:async function(req,res){
     let aboutUs = await AboutUs.find({})
     res.render('admin/about',{admin:req.user,aboutUs})
   },
    AddAboutUs:async function(req,res){
        var aboutUs = new AboutUs();
        aboutUs.title = req.body.title;
        aboutUs.description = req.body.description;

        aboutUs.save();
        
        res.redirect('/admin/get/about-us');
   },
   deleteAboutUs: async function (req, res) {
        let aboutUs = await AboutUs.deleteOne({ _id: req.params.id });
        res.redirect('/admin/get/about-us')
    },


   GetAllOurTeam:async function(req,res){
     let ourTeam = await OurTeam.find({}).sort('-createdAt');
     res.render('admin/our_team',{admin:req.user,ourTeam})
   },

   AddOurTeam:async function(req,res){
     try {
           if (req.files && req.files.images) {
            var ImagesArray = [];
            let dir = './public/uploads/ourTeamsImages/';
            if (!fs.existsSync(dir)) {
              fs.mkdirSync(dir, { recursive: true });
            }
              let profileImage = req.files.images;
              let imageUrl = dir + Date.now() + "" + profileImage.name;
                  await profileImage.mv(imageUrl, function (err) {
              if (err)
                console.log(err);
                  });
                 imageUrl = imageUrl.substring(9);
                 await ImagesArray.push(imageUrl);
              }

              let newOurTeam = new OurTeam();
              newOurTeam.fullName = req.body.fullName;
              newOurTeam.bio = req.body.bio;
              newOurTeam.images = ImagesArray;
              console.log(newOurTeam)
              newOurTeam.save(async function (err, property) {
                  if(err){
                      console.log(err);
                  }
                  else{
                    res.redirect('/admin/get/our-team')
                      // return res.send({'Success' : true,'message' : ' Communication added Successfully.','Communication':property})
                  }
              })
        
        } catch (error) {
            console.log(error.message,'from add New Our Teams API');
            return res.send({'Success' : false,'message' : error.message})
        } 
   
   },

   deleteOurTeam: async function (req, res) {
        let ourTeam = await OurTeam.deleteOne({ _id: req.params.id });
        res.redirect('/admin/get/our-team')
    },

   GetAllCallUs:async function(req,res){
    var getCallUs = await CallUs.find({}).sort('-createdAt');
    res.render('admin/call_us',{admin:req.user,getCallUs});
   },
   AddCallUs:async function(req,res){
     var callUs = new CallUs();
     callUs.location = req.body.location;
     callUs.contactNumber = req.body.contactNumber;
     console.log(callUs)
     callUs.save();
     return res.redirect('/admin/get/all/call-us')

   },
   deleteCallUs: async function (req, res) {
        let callUs = await CallUs.deleteOne({ _id: req.params.id });
        res.redirect('/admin/get/all/call-us')
    },

   GetAllOfficeAddress:async function(req,res){
    var officeAddress = await OfficeAddress.find({});
    res.render('admin/office_address',{admin:req.user,officeAddress});
   }, 
   AddOfficeAddress:async function(req,res){
     var officeAddress = new OfficeAddress();
     officeAddress.location = req.body.location;
     officeAddress.title = req.body.title;
     officeAddress.address = req.body.address;
     console.log(officeAddress)
     officeAddress.save();
     return res.redirect('/admin/get/all/office-address')

   },
    deleteOfficeAddress: async function (req, res) {
        let officeAddress = await OfficeAddress.deleteOne({ _id: req.params.id });
        res.redirect('/admin/get/all/office-address')
    },

   GetAllMap:async function(req,res){
    var map = await Maps.find({}).sort('-createdAt');
    // res.render({'Success':true,'message':'Get All Map',map});
    res.render('admin/contact_map',{admin:req.user,map});
   }, 
   AddPropertyMap:async function(req,res){
     var map = new Maps();
     map.lat = req.body.lat;
     map.lng = req.body.lng;
     console.log(map)
     map.save();
     // res.send({'Success':true,'Message':'Map Add Successfully', map})
     return res.redirect('/admin/get/all/map')

   },
   deleteMap: async function (req, res) {
        let map = await Maps.deleteOne({ _id: req.params.id });
        res.redirect('/admin/get/all/map')
    },


   GetAllSocialContact:async function(req,res){
    var socialContact = await SocialContact.find({propertyId:req.params.id});
    var property = await Property.findOne({_id:req.params.id});
   // return res.send({'Success' : true,'message' : 'Get All.',socialContact})

    res.render('admin/add_social_contact',{admin:req.user,socialContact,property});
   },
   AddSocialContact:async function(req,res){
    try {
      var propertyId = await Property.findOne({_id:req.params.id});
      if(propertyId){
        let socialContact = new SocialContact();
        socialContact.email = req.body.email;
        socialContact.call = req.body.call;
        socialContact.sms = req.body.sms;
        socialContact.propertyId = propertyId.id;
           
        socialContact.save(async function (err, property) {
        if(err){
          console.log(err);
        }else{
          res.redirect(`/admin/get/all/social-contact/${propertyId._id}`)
          // return res.send({'Success' : true,'message' : ' added Successfully.',socialContact})
        }
        })
        }else{
          return res.send({'Success' : true,'message' : 'Property ID  Not Found'})
        }
        } catch (error) {
            console.log(error.message,'from add New Developer Plan API');
            return res.send({'Success' : false,'message' : error.message})
        }
      },

    GetAllRegisterUser:async function(req,res){
    var users = await Users.find({}).sort('-createdAt');
   // return res.send({'Success' : true,'message' : 'Get All.',socialContact})

    res.render('admin/users',{admin:req.user,users});
   },
   GetAllbuy:async function(req,res){
    var buy = await Property.find({purpose:'Buy'}).sort('-createdAt');
   // return res.send({'Success' : true,'message' : 'Get All.',socialContact})

    res.render('admin/all_buy',{admin:req.user,buy});
   },
   GetAllRent:async function(req,res){
    var rent = await Property.find({purpose:'Rent'}).sort('-createdAt');
   // return res.send({'Success' : true,'message' : 'Get All.',socialContact})

    res.render('admin/all_rent',{admin:req.user,rent});
   },

    GetAdminProjectDetails:async function(req,res){
     
         var property = await Property.findOne({_id:req.params.id});
         // var addNearByLocation = await AddNearByLocation.find({propertyId:req.params.id});
         var propertyImage = await PropertyImages.find({propertyId:req.params.id});
         var propertyType = await PropertyType.find({propertyId:req.params.id});
         var paymentImages = await PaymentImages.find({propertyId:req.params.id});
         // var otherFacilities = await OtherFacilities.find({propertyId:req.params.id});
         var addNearByLocation = await AddNearByLocation.find({propertyId:req.params.id});
         var mainFeature = await MainFeature.find({propertyId:req.params.id});
         var healthCare = await HealthCare.find({propertyId:req.params.id});
         var floorPlan = await FloorPlan.find({propertyId:req.params.id});
         var developer = await Developer.find({propertyId:req.params.id});
         var plotFeatures = await PlotFeatures.find({propertyId:req.params.id});
         var communication = await Communication.find({propertyId:req.params.id});   
         var socialContact = await SocialContact.find({propertyId:req.params.id});   
  

         if(property){
              res.render('admin/view-property',{
            property,
            addNearByLocation,
            developer,
            propertyImage,
            propertyType,
            paymentImages,
            // otherFacilities,
            mainFeature,
            healthCare,
            floorPlan,
            plotFeatures,
            communication,
            socialContact,
            admin:req.user
          })

         }else{
           return res.send({'Success':true,'message':'Get Property is Empty'})
         }
  
   },
    GetAdminFeatureDetails:async function(req,res){
     
         var property = await Property.findOne({_id:req.params.id,});
             var addNearByLocation = await AddNearByLocation.find({propertyId:req.params.id});//
             var propertyImage = await PropertyImages.find({propertyId:req.params.id});
             var rooms = await Rooms.find({propertyId:req.params.id});//
             var otherFacilities = await OtherFacilities.find({propertyId:req.params.id});//
             var mainFeature = await MainFeature.find({propertyId:req.params.id});//
             var healthCare = await HealthCare.find({propertyId:req.params.id});//
             var communication = await Communication.find({propertyId:req.params.id});//
             var socialContact = await SocialContact.find({propertyId:req.params.id}); 
  

         if(property){
              res.render('admin/view_feature',{
            property,
            addNearByLocation,
            propertyImage,
            rooms,
            otherFacilities,
            mainFeature,
            healthCare,
            communication,
            socialContact,
            admin:req.user
          })

         }else{
           return res.send({'Success':true,'message':'Get Property is Empty'})
         }
  
   },
   GetEditProperty:async function(req,res){
    var property = await Property.findOne({_id:req.params.id}).sort('-createdAt');
    var cities = await City.find({}).sort('-createdAt');


    res.render('admin/edit_property',{admin:req.user,property,cities});
   },
   GetEditProject:async function(req,res){
    var property = await Property.findOne({_id:req.params.id}).sort('-createdAt');
    var cities = await City.find({}).sort('-createdAt');


    res.render('admin/edit_project',{admin:req.user,property,cities});
   },
    GetEditProjectProperty:async function(req,res){
    var property = await Property.findOne({_id:req.params.id}).sort('-createdAt');
    var cities = await City.find({}).sort('-createdAt');


    res.render('admin/edit-feature-project',{admin:req.user,property,cities});
   },
 
   PostEditProperty:async function(req,res){

          var ImagesArray = [];
                if (req.files && req.files.images) {
                    let dir = './public/uploads/thumbnail/';
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    if (Array.isArray(req.files.images)) {
                        for (const element of req.files.images) {
                            let sampleFile = element;
                            var imagename = dir + Date.now() + "" + sampleFile.name;
                            await sampleFile.mv(imagename, function (err) {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).send(err);
                                }
                            });
                            imagename = imagename.substring(9);
                            await ImagesArray.push(imagename);
                        }
                    } //end of req.files array
                    else {
                        let profileImage = req.files.images;
                        let imageUrl = dir + Date.now() + "" + profileImage.name;
                        await profileImage.mv(imageUrl, function (err) {
                            if (err)
                                console.log(err);
                        });
                        imageUrl = imageUrl.substring(9);
                        await ImagesArray.push(imageUrl);
                    }
                }else{
                   imageUrl1 = req.body.oldImage
                  }

                  var ImagesIcon = [];
                if (req.files && req.files.icon) {
                    let dir = './public/uploads/thumbnail/';
                    if (!fs.existsSync(dir)) {
                        fs.mkdirSync(dir, { recursive: true });
                    }
                    if (Array.isArray(req.files.icon)) {
                        for (const element of req.files.icon) {
                            let sampleFile = element;
                            var imagename1 = dir + Date.now() + "" + sampleFile.name;
                            await sampleFile.mv(imagename1, function (err) {
                                if (err) {
                                    console.log(err);
                                    return res.status(500).send(err);
                                }
                            });
                            imagename1 = imagename1.substring(9);
                            await ImagesArray.push(imagename1);
                        }
                    } //end of req.files array
                    else {
                        let profileImage1 = req.files.icon;
                        let imageUrl11 = dir + Date.now() + "" + profileImage1.name;
                        await profileImage1.mv(imageUrl11, function (err) {
                            if (err)
                                console.log(err);
                        });
                        imageUrl11 = imageUrl11.substring(9);
                        await ImagesIcon.push(imageUrl11);
                    }
                }else{
                   imageUrl2 = req.body.oldImage
                  }
          let id = req.params.id;
         
             title = req.body.title;
             description = req.body.description;
             priceFrom = req.body.priceFrom;
             priceTo = req.body.priceTo;
             areaFrom = req.body.areaFrom;
             fixedPrice = req.body.fixedPrice;
             areaTo = req.body.areaTo;
             fixedArea = req.body.fixedArea;
             bedrooms = req.body.bedrooms;
             bathrooms = req.body.bathrooms;
             flats = req.body.flats;
             type = req.body.type;
             location = req.body.location;
             featured = req.body.featured;
             isRecommented = req.body.isRecommented;
             propertyId = req.body.propertyId;
             developer = req.body.developer;
             lat = req.body.lat;
             lng = req.body.lng;
             purpose = req.body.purpose;
             areaUnit = req.body.areaUnit;
             priceUnit = req.body.priceUnit;
             imageUrl1 = ImagesArray;
             imageUrl2 = ImagesIcon
    
             Property.findById(id,function(err,editPropert){
                  if(err) return err;
                  editPropert.title = title;
                  editPropert.description = description;
                  editPropert.priceFrom = priceFrom;
                  editPropert.priceTo = priceTo;
                  editPropert.areaFrom = areaFrom;
                  editPropert.areaTo = areaTo;
                  editPropert.fixedPrice = fixedPrice;
                  editPropert.fixedArea = fixedArea;
                  editPropert.bedrooms = bedrooms;
                  editPropert.bathrooms = bathrooms;
                  editPropert.flats = flats;
                  editPropert.type = type;
                  editPropert.location = location;
                  editPropert.isFeatured = featured;
                  editPropert.isRecommented = isRecommented;
                  editPropert.propertyId = propertyId;
                  editPropert.developer = developer;
                  editPropert.lat = lat;
                  editPropert.lng = lng;
                  editPropert.purpose = purpose;
                  editPropert.areaUnit = areaUnit;
                  editPropert.priceUnit = priceUnit;
                  // editPropert.images = imageUrl1;
                  // editPropert.Icon = imageUrl2;
                  if(ImagesArray != ""){
                    editPropert.images.pull();
                      editPropert.images = ImagesArray;
                
                  }
                   if(ImagesIcon != ""){
                      editPropert.Icon = ImagesIcon;
                
                  }
               console.log(editPropert)    
        editPropert.save(err => {
          // res.send(editPropert)
            res.redirect('/admin/all-property')
        })
    })
    },


   PostEditProject:async function(req,res){

      var ImagesArray = [];
            if (req.files && req.files.images) {
                let dir = './public/uploads/thumbnail/';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                if (Array.isArray(req.files.images)) {
                    for (const element of req.files.images) {
                        let sampleFile = element;
                        var imagename = dir + Date.now() + "" + sampleFile.name;
                        await sampleFile.mv(imagename, function (err) {
                            if (err) {
                                console.log(err);
                                return res.status(500).send(err);
                            }
                        });
                        imagename = imagename.substring(9);
                        await ImagesArray.push(imagename);
                    }
                } //end of req.files array
                else {
                    let profileImage = req.files.images;
                    let imageUrl = dir + Date.now() + "" + profileImage.name;
                    await profileImage.mv(imageUrl, function (err) {
                        if (err)
                            console.log(err);
                    });
                    imageUrl = imageUrl.substring(9);
                    await ImagesArray.push(imageUrl);
                }
            }else{
               imageUrl1 = req.body.oldImage
              }

              var ImagesIcon = [];
            if (req.files && req.files.icon) {
                let dir = './public/uploads/thumbnail/';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                if (Array.isArray(req.files.icon)) {
                    for (const element of req.files.icon) {
                        let sampleFile = element;
                        var imagename1 = dir + Date.now() + "" + sampleFile.name;
                        await sampleFile.mv(imagename1, function (err) {
                            if (err) {
                                console.log(err);
                                return res.status(500).send(err);
                            }
                        });
                        imagename1 = imagename1.substring(9);
                        await ImagesArray.push(imagename1);
                    }
                } //end of req.files array
                else {
                    let profileImage1 = req.files.icon;
                    let imageUrl11 = dir + Date.now() + "" + profileImage1.name;
                    await profileImage1.mv(imageUrl11, function (err) {
                        if (err)
                            console.log(err);
                    });
                    imageUrl11 = imageUrl11.substring(9);
                    await ImagesIcon.push(imageUrl11);
                }
            }else{
               imageUrl2 = req.body.oldIcon
              }
      let id = req.params.id;
     
         title = req.body.title;
         description = req.body.description;
         priceFrom = req.body.priceFrom;
         priceTo = req.body.priceTo;
         areaFrom = req.body.areaFrom;
         fixedPrice = req.body.fixedPrice;
         areaTo = req.body.areaTo;
         fixedArea = req.body.fixedArea;
         bedrooms = req.body.bedrooms;
         bathrooms = req.body.bathrooms;
         flats = req.body.flats;
         type = req.body.type;
         location = req.body.location;
         featured = req.body.featured;
         isRecommented = req.body.isRecommented;
         propertyId = req.body.propertyId;
         developer = req.body.developer;
         lat = req.body.lat;
         lng = req.body.lng;
         purpose = req.body.purpose;
         areaUnit = req.body.areaUnit;
         priceUnit = req.body.priceUnit;
         imageUrl1 = ImagesArray;
         imageUrl2 = ImagesIcon

         Property.findById(id,async function(err,editPropertt){
              if(err) return err;
              editPropertt.title = title;
              editPropertt.description = description;
              editPropertt.priceFrom = priceFrom;
              editPropertt.priceTo = priceTo;
              editPropertt.areaFrom = areaFrom;
              editPropertt.areaTo = areaTo;
              editPropertt.fixedPrice = fixedPrice;
              editPropertt.fixedArea = fixedArea;
              editPropertt.bedrooms = bedrooms;
              editPropertt.bathrooms = bathrooms;
              editPropertt.flats = flats;
              editPropertt.type = type;
              editPropertt.location = location;
              editPropertt.isFeatured = featured;
              editPropertt.isRecommented = isRecommented;
              editPropertt.propertyId = propertyId;
              editPropertt.developer = developer;
              editPropertt.lat = lat;
              editPropertt.lng = lng;
              editPropertt.purpose = purpose;
              editPropertt.areaUnit = areaUnit;
              editPropertt.priceUnit = priceUnit;
              // editPropertt.images = imageUrl1;
              // editPropertt.Icon = imageUrl2;
              if(ImagesArray != ""){
                editPropertt.images.pull();
                  editPropertt.images = ImagesArray;
            
              }
               if(ImagesIcon != ""){
                  editPropertt.Icon.pull();
                  editPropertt.Icon = ImagesIcon;
            
              }
           console.log(editPropertt)    
             await editPropertt.save()
              // err => {    

        res.redirect('/admin/all-project')
    // })
})
},

  PostEditProjectProperty:async function(req,res){

      var ImagesArray = [];
            if (req.files && req.files.images) {
                let dir = './public/uploads/thumbnail/';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                if (Array.isArray(req.files.images)) {
                    for (const element of req.files.images) {
                        let sampleFile = element;
                        var imagename = dir + Date.now() + "" + sampleFile.name;
                        await sampleFile.mv(imagename, function (err) {
                            if (err) {
                                console.log(err);
                                return res.status(500).send(err);
                            }
                        });
                        imagename = imagename.substring(9);
                        await ImagesArray.push(imagename);
                    }
                } //end of req.files array
                else {
                    let profileImage = req.files.images;
                    let imageUrl = dir + Date.now() + "" + profileImage.name;
                    await profileImage.mv(imageUrl, function (err) {
                        if (err)
                            console.log(err);
                    });
                    imageUrl = imageUrl.substring(9);
                    await ImagesArray.push(imageUrl);
                }
            }else{
               imageUrl1 = req.body.oldImage
              }

              var ImagesIcon = [];
            if (req.files && req.files.icon) {
                let dir = './public/uploads/thumbnail/';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                if (Array.isArray(req.files.icon)) {
                    for (const element of req.files.icon) {
                        let sampleFile = element;
                        var imagename1 = dir + Date.now() + "" + sampleFile.name;
                        await sampleFile.mv(imagename1, function (err) {
                            if (err) {
                                console.log(err);
                                return res.status(500).send(err);
                            }
                        });
                        imagename1 = imagename1.substring(9);
                        await ImagesArray.push(imagename1);
                    }
                } //end of req.files array
                else {
                    let profileImage1 = req.files.icon;
                    let imageUrl11 = dir + Date.now() + "" + profileImage1.name;
                    await profileImage1.mv(imageUrl11, function (err) {
                        if (err)
                            console.log(err);
                    });
                    imageUrl11 = imageUrl11.substring(9);
                    await ImagesIcon.push(imageUrl11);
                }
            }else{
               imageUrl2 = req.body.oldImage
              }
      let id = req.params.id;
     
         title = req.body.title;
         description = req.body.description;
         priceFrom = req.body.priceFrom;
         priceTo = req.body.priceTo;
         areaFrom = req.body.areaFrom;
         fixedPrice = req.body.fixedPrice;
         areaTo = req.body.areaTo;
         fixedArea = req.body.fixedArea;
         bedrooms = req.body.bedrooms;
         bathrooms = req.body.bathrooms;
         flats = req.body.flats;
         type = req.body.type;
         location = req.body.location;
         featured = req.body.featured;
         isRecommented = req.body.isRecommented;
         propertyId = req.body.propertyId;
         developer = req.body.developer;
         lat = req.body.lat;
         lng = req.body.lng;
         purpose = req.body.purpose;
         areaUnit = req.body.areaUnit;
         priceUnit = req.body.priceUnit;
         imageUrl1 = ImagesArray;
         imageUrl2 = ImagesIcon

         Property.findById(id,function(err,editPropert){
              if(err) return err;
              editPropert.title = title;
              editPropert.description = description;
              editPropert.priceFrom = priceFrom;
              editPropert.priceTo = priceTo;
              editPropert.areaFrom = areaFrom;
              editPropert.areaTo = areaTo;
              editPropert.fixedPrice = fixedPrice;
              editPropert.fixedArea = fixedArea;
              editPropert.bedrooms = bedrooms;
              editPropert.bathrooms = bathrooms;
              editPropert.flats = flats;
              editPropert.type = type;
              editPropert.location = location;
              editPropert.isFeatured = featured;
              editPropert.isRecommented = isRecommented;
              editPropert.propertyId = propertyId;
              editPropert.developer = developer;
              editPropert.lat = lat;
              editPropert.lng = lng;
              editPropert.purpose = purpose;
              editPropert.areaUnit = areaUnit;
              editPropert.priceUnit = priceUnit;
              // editPropert.images = imageUrl1;
              // editPropert.Icon = imageUrl2;
              if(ImagesArray != ""){
                editPropert.images.pull();
                  editPropert.images = ImagesArray;
              }
               if(ImagesIcon != ""){
                editPropert.images.pull();
                  editPropert.Icon = ImagesIcon;
            
              }
           console.log(editPropert)    
    editPropert.save(err => {
        res.redirect('/get/all-property-featured')
    })
})
},

  GetMessage:async function(req,res){
     var message = Messages.find({}).sort('-createdAt').then(message=>{
        res.render('admin/message',{
      message,
      admin:req.user
     }); 
     });
     
  },
  GetPostMessages:async function(req,res){
     var message = Messages.findByIdAndUpdate({_id:req.params.id},{
       $push:{
         unRead:0
       }
     });
     //  message.save();
      res.redirect('/admin/message');
  },

    deleteUserMessage:async function (req, res) {
        let message = await Messages.deleteOne({ _id: req.params.id });
        res.redirect(`/admin/message`)
    },



}