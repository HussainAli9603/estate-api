let Property = require('../../../models/property');
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
let Rooms = require('../../../models/rooms');
let City = require('../../../models/city');
let Country = require('../../../models/country');
let Favourite = require('../../../models/favourite');
let User = require('../../../models/user');
let SocialContact = require('../../../models/social_contact');
let jwt = require("jsonwebtoken");
let Cryptr = require("cryptr");
let bcrypt = require("bcryptjs");
let jwtConfig = require("../../../config/jwtConfig");

let options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
};
   const saltRounds = 10;
module.exports = {
   GetProperty:async function(req,res){
    var property = await Property.find({isFeatured:true}).sort('-createdAt');
    res.render('admin/all_featured',{ property, admin:req.user })
   },
   GetProject:async function(req,res){
    var property = await Property.find({isFeatured:false}).sort('-createdAt');
    res.render('admin/all_project',{ property, admin:req.user })
   },
   GetAddProperty:async function(req,res){
    var cities = await City.find({}).sort('-createdAt');
    res.render('admin/add_property',{ cities,admin:req.user })
   },
   GetAllFeaturedProject:async function(req,res){
    var featuredProject = await Property.find({}).sort('-createdAt');
    res.render('admin/all_project_featured',{ featuredProject,admin:req.user })
   },
   // ----------------------------------------
   GetAddMainFeatured:async function(req,res){
    var product = await Property.findOne({_id:req.params.id});
    res.render('admin/add_main_featured1',{product,admin:req.user })
   },
   GetAddMainFeatured1:async function(req,res){
    var product = await Property.findOne({_id:req.params.id});
    res.render('admin/add_main_featured',{product,admin:req.user })
   },
   // --------------------------------------
   GetAddPropertyImages:async function(req,res){
    var property = await Property.findOne({_id:req.params.id});
    var propertyImage = await PropertyImages.find({propertyId:req.params.id});
    res.render('admin/add_images',{property,propertyImage,admin:req.user })
   },
   GetAddPropertyType:async function(req,res){
    var property = await Property.findOne({_id:req.params.id});
    var propertyType = await PropertyType.find({propertyId:req.params.id});
    res.render('admin/add_type',{property,propertyType,admin:req.user })
   },
   GetAddPlot:async function(req,res){
    var property = await Property.findOne({_id:req.params.id});
    var plot = await PlotFeatures.find({propertyId:req.params.id});
    res.render('admin/add_plot',{property,plot,admin:req.user })
   },
   GetAddPaymentImages:async function(req,res){
    var property = await Property.findOne({_id:req.params.id});
    var payment = await PaymentImages.find({propertyId:req.params.id});
    res.render('admin/add_payment_images',{property,payment,admin:req.user })
   },
   GetAddOtherFacilities:async function(req,res){
    var property = await Property.findOne({_id:req.params.id});
    var otherFacilities = await OtherFacilities.find({propertyId:req.params.id});
    res.render('admin/add_other_facilities',{property,otherFacilities,admin:req.user })
   },
   GetAddNearByLocation:async function(req,res){
    var property = await Property.findOne({_id:req.params.id});
    var nearByLocation = await AddNearByLocation.find({propertyId:req.params.id})
    res.render('admin/add_near_by_location',{property,nearByLocation,admin:req.user })
   },
   GetAddMainFeatures:async function(req,res){
    var property = await Property.findOne({_id:req.params.id}); 
    var mainFeature = await MainFeature.find({propertyId:req.params.id})
    res.render('admin/add_main_features',{property,mainFeature,admin:req.user })
   },
   GetAddHealthCare:async function(req,res){
    var property = await Property.findOne({_id:req.params.id});
    var healthCare = await HealthCare.find({propertyId:req.params.id})
    res.render('admin/add_health_care',{property,healthCare,admin:req.user })
   },
   GetAddFloorPlan:async function(req,res){
    var property = await Property.findOne({_id:req.params.id});
    var floorPlan = await FloorPlan.find({propertyId:req.params.id})
    res.render('admin/add_floor_plan',{property,floorPlan,admin:req.user })
   },
   GetAddDeveloper:async function(req,res){
    var property = await Property.findOne({_id:req.params.id});
     var developer = await Developer.find({propertyId:req.params.id})
    res.render('admin/add_developer',{property,developer,admin:req.user })
   },
   GetAddCommunication:async function(req,res){
    var property = await Property.findOne({_id:req.params.id});
    var communication = await Communication.find({propertyId:req.params.id})
    res.render('admin/add_communication',{property,communication,admin:req.user })
   },
   GetAddRoom:async function(req,res){
    var property = await Property.findOne({_id:req.params.id});
    var room = await Rooms.find({propertyId:req.params.id})
    res.render('admin/add_rooms',{property,room,admin:req.user })
   },

   deletePropertyImage: async function (req, res) {
      let city = await PropertyImages.findOne({ _id: req.params.id });
        let city1 = await PropertyImages.deleteOne({ _id: req.params.id });
        res.redirect(`/admin/property-image/${city.propertyId}`);
    },
   deletePropertyType: async function (req, res) {
      let city = await PropertyType.findOne({ _id: req.params.id });
        let city1 = await PropertyType.deleteOne({ _id: req.params.id });
        res.redirect(`/admin/property-type/${city.propertyId}`)
    },
    deletePropertyNearByLocation:async function (req, res) {
      let city = await AddNearByLocation.findOne({ _id: req.params.id });
        let city1 = await AddNearByLocation.deleteOne({ _id: req.params.id });
        res.redirect(`/admin/add/near-location/${city.propertyId}`)
    },
    deletePropertyPayment:async function (req, res) {
      let city = await PaymentImages.findOne({ _id: req.params.id });
        let city1 = await PaymentImages.deleteOne({ _id: req.params.id });
        res.redirect(`/admin/add/payment/${city.propertyId}`)
    },
    deletePropertyPlot:async function (req, res) {
      let city = await PlotFeatures.findOne({ _id: req.params.id });
        let city1 = await PlotFeatures.deleteOne({ _id: req.params.id });
        res.redirect(`/admin/add/plot/${city.propertyId}`)
    },
    deletePropertymainFeature:async function (req, res) {
      let city = await MainFeature.findOne({ _id: req.params.id });
        let city1 = await MainFeature.deleteOne({ _id: req.params.id });
        res.redirect(`/admin/add/features/${city.propertyId}`)
    },
    deletePropertyHealthCare:async function (req, res) {
      let city = await HealthCare.findOne({ _id: req.params.id });
        let city1 = await HealthCare.deleteOne({ _id: req.params.id });
        res.redirect(`/admin/add/health-care/${city.propertyId}`)
    },
    deletePropertyFloorPlan:async function (req, res) {
      let city = await FloorPlan.findOne({ _id: req.params.id });
        let city1 = await FloorPlan.deleteOne({ _id: req.params.id });
        res.redirect(`/admin/add/floor-plane/${city.propertyId}`)
    },
    deletePropertyDeveloper:async function (req, res) {
       let city = await Developer.findOne({ _id: req.params.id });
        let city1 = await Developer.deleteOne({ _id: req.params.id });
        res.redirect(`/admin/add/developer/${city.propertyId}`)
    },
    deletePropertyCommunication:async function (req, res) {
       let city = await Communication.findOne({ _id: req.params.id });
        let city1 = await Communication.deleteOne({ _id: req.params.id });
        res.redirect(`/admin/add/communication/${city.propertyId}`)
    },
    deletePropertyRoom:async function (req, res) {
    
        let city = await Rooms.findOne({ _id: req.params.id });
        let city1 = await Rooms.deleteOne({ _id: req.params.id });
        res.redirect(`/admin/add/room/${city.propertyId}`)
    },
    GetAllRegisterDeleteUser:async function (req, res) {
    
        let city1 = await User.deleteOne({ _id: req.params.id });
        res.redirect(`/register/users`)
    },

	 AddProperty:async function(req,res){
        try {    
        if (req.files && req.files.images) {
                var ImagesArray = [];
                let dir = './public/uploads/thumbnail/';
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
                //end of req.files single image
              } 
              if (req.files && req.files.icon) {
                var iconArray = [];
                let dir = './public/uploads/thumbnail/';
                if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
                }
                    let profileImage = req.files.icon;
                    let imageUrl = dir + Date.now() + "" + profileImage.name;
                    await profileImage.mv(imageUrl, function (err) {
                        if (err)
                            console.log(err);
                    });
                    imageUrl = imageUrl.substring(9);
                    await iconArray.push(imageUrl);
                //end of req.files single image
              }  
 
            let newProperty = new Property();
            newProperty.title = req.body.title;
            newProperty.description = req.body.description;
            newProperty.priceFrom = req.body.priceFrom;
            newProperty.priceTo = req.body.priceTo;
            newProperty.areaFrom = req.body.areaFrom;
            newProperty.fixedPrice = req.body.fixedPrice;
            newProperty.areaTo = req.body.areaTo;
            newProperty.fixedArea = req.body.fixedArea;
            newProperty.bedrooms = req.body.bedrooms;
            newProperty.bathrooms = req.body.bathrooms;
            newProperty.flats = req.body.flats;
            newProperty.type = req.body.type;
            newProperty.location = req.body.location;
            newProperty.isFeatured = req.body.featured;
            newProperty.isRecommented = req.body.isRecommented;
            newProperty.propertyId = req.body.propertyId;
            newProperty.developer = req.body.developer;
            newProperty.lat = req.body.lat;
            newProperty.lng = req.body.lng;
            newProperty.purpose = req.body.purpose;
            newProperty.areaUnit = req.body.areaUnit;
            newProperty.priceUnit = req.body.priceUnit;
            newProperty.images = ImagesArray;
            newProperty.Icon = iconArray;
              console.log(newProperty)
            newProperty.save(async function (err, property) {
                if(err){
                    console.log(err);
                }
                else{
                    // return res.send({'Success' : true,'message' : 'Property added Successfully.'})
                    res.redirect('/get/all-property-featured')
                }
            })
        } catch (error) {
            console.log(error.message,'from add Property API');
            return res.send({'Success' : false,'message' : error.message})
        }
      },

      AddPropertyImages:async function(req,res){
        try{
          var propertyId = await Property.findOne({_id:req.params.id});
          if(propertyId){
           //start of req image
            if (req.files && req.files.images) {
                var ImagesArray = [];
                let dir = './public/uploads/property/';
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
                } //end of req.files single image
                //start of adding entries 
                
                let newPropertyImages = new PropertyImages();
                newPropertyImages.propertyId = propertyId._id;
                newPropertyImages.images = ImagesArray;

                newPropertyImages.save(async function (err, propertyImages) {
                   var totalImg = await PropertyImages.find({propertyId:req.params.id});
                   var property = await Property.findOne({_id:req.params.id});
                     property.totalImages = totalImg.length;
                     console.log(totalImg.length)
                     console.log(property)
                     await property.save();
                    if(err){
                        console.log(err);
                    }
                    else{
                      res.redirect(`/admin/property-image/${propertyId._id}`)
                        // return res.send({'Success' : true,'message' : 'Property Images added Successfully.','property Images':propertyImages})
                    }
                })
            } //end of req.files
            else{
                return res.send({'Success' : false,'message' : 'Property image is required.'})
            }
          }else{
            return res.send({'Success' : false,'message' : 'Property ID Not Found.'})
          }
        }catch(error){
           console.log(error.message,'Property Image API');
           return res.send({'Success' : false,'message' : error.message})
        }
      },

       AddPropertyType:async function(req,res){
        try {
          var propertyId = await Property.findOne({_id:req.params.id});
          if(propertyId){
            let newProperty = new PropertyType();
            newProperty.title = req.body.title;
            newProperty.subTitle = req.body.subTitle;
            newProperty.priceFrom = req.body.priceFrom;
            newProperty.priceTo = req.body.priceTo;
            newProperty.areaFrom = req.body.areaFrom;
            newProperty.areaTo = req.body.areaTo;
            newProperty.propertyId = propertyId._id;
            newProperty.areaUnit = req.body.areaUnit;
            newProperty.priceUnit = req.body.priceUnit;
   
            newProperty.save(async function (err, property) {
                if(err){
                    console.log(err);
                }
                else{
                  res.redirect(`/admin/property-type/${propertyId._id}`)
                    // return res.send({'Success' : true,'message' : 'Property added Successfully.'})
                }
            })
          }else{
            return res.send({'Success' : true,'message' : 'Property ID  Not Found'})
          }
        } catch (error) {
            console.log(error.message,'from add Property Type API');
            return res.send({'Success' : false,'message' : error.message})
        }
      }, 

      AddPlot:async function(req,res){
        try {
          var propertyId = await Property.findOne({_id:req.params.id});
          if(propertyId){
        if(req.body.title == '' || req.body.title == undefined){
            return res.send({'Success' : false,'message' : 'Plot title is required.'})
        }
        if(req.body.status == '' || req.body.status == undefined){
            return res.send({'Success' : false,'message' : 'Plot status is required.'})
        }
        if (req.files && req.files.images) {
          var ImagesArray = [];
          let dir = './public/uploads/plotIcon/';
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

            let newPlotFeatures = new PlotFeatures();
            newPlotFeatures.title = req.body.title;
            newPlotFeatures.Icon = ImagesArray;
            newPlotFeatures.status = req.body.status;
            newPlotFeatures.propertyId = propertyId.id;
            
            newPlotFeatures.save(async function (err, property) {
                if(err){
                    console.log(err);
                }
                else{
                  res.redirect(`/admin/add/plot/${propertyId._id}`)
                    // return res.send({'Success' : true,'message' : 'Plot added Successfully.'})
                }
            })
          }else{
            return res.send({'Success' : true,'message' : 'Property ID  Not Found'})
          }
        } catch (error) {
            console.log(error.message,'from add Plot API');
            return res.send({'Success' : false,'message' : error.message})
        }
      }, 

      AddPaymentImages:async function(req,res){
        try {
          var propertyId = await Property.findOne({_id:req.params.id});
          if(propertyId){
       
           //start of req image
            if (req.files && req.files.images) {
                var ImagesArray = [];
                let dir = './public/uploads/PaymentImages/';
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
                } }//end of req.files single image
                //start of adding entries 

              let newPaymentImages = new PaymentImages();
              newPaymentImages.images = ImagesArray;
              newPaymentImages.propertyId = propertyId.id;
              newPaymentImages.save(async function (err, property) {
                  if(err){
                      console.log(err);
                  }
                  else{
                    res.redirect(`/admin/add/payment/${propertyId._id}`);
                      // return res.send({'Success' : true,'message' : 'Payment Images added Successfully.',newPaymentImages})
                  }
              })
          }else{
            return res.send({'Success' : true,'message' : 'Property ID  Not Found'})
          }
        } catch (error) {
            console.log(error.message,'from add Payment Images API');
            return res.send({'Success' : false,'message' : error.message})
        }
      },

      AddOtherFacilities:async function(req,res){
        try {
          var propertyId = await Property.findOne({_id:req.params.id});
          if(propertyId){
       
           if (req.files && req.files.images) {
            var ImagesArray = [];
            let dir = './public/uploads/otherFacilitiesIcon/';
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

              let newOtherFacilities = new OtherFacilities();
              newOtherFacilities.title = req.body.title;
              newOtherFacilities.status = req.body.status;
              newOtherFacilities.Icon = ImagesArray;
              newOtherFacilities.propertyId = propertyId.id;   
              newOtherFacilities.save(async function (err, property) {
                  if(err){
                      console.log(err);
                  }
                  else{
                    res.redirect(`/admin/add/other-facilities/${propertyId._id}`)
                      // return res.send({'Success' : true,'message' : 'Other Facility added Successfully.',newOtherFacilities})
                  }
              })
          }else{
            return res.send({'Success' : true,'message' : 'Property ID  Not Found'})
          }
        } catch (error) {
            console.log(error.message,'from add Other Facilities API');
            return res.send({'Success' : false,'message' : error.message})
        }
      },

      AddNearByLocation:async function(req,res){
        try {
          var propertyId = await Property.findOne({_id:req.params.id});
          if(propertyId){
       
           if (req.files && req.files.images) {
            var ImagesArray = [];
            let dir = './public/uploads/AddNearByLocationIcon/';
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

              let newAddNearByLocation = new AddNearByLocation();
              newAddNearByLocation.title = req.body.title;
              newAddNearByLocation.status = req.body.status;
              newAddNearByLocation.Icon = ImagesArray;
              newAddNearByLocation.propertyId = propertyId.id;
              newAddNearByLocation.save(async function (err, property) {
                  if(err){
                      console.log(err);
                  }
                  else{
                    res.redirect(`/admin/add/near-location/${propertyId._id}`);
                      // return res.send({'Success' : true,'message' : ' Near By Location added Successfully.',newAddNearByLocation})
                  }
              })
          }else{
            return res.send({'Success' : true,'message' : 'Property ID  Not Found'})
          }
        } catch (error) {
            console.log(error.message,'from add New Add Near By Location API');
            return res.send({'Success' : false,'message' : error.message})
        }
      },

      AddMainFeatures:async function(req,res){
        try {
          var propertyId = await Property.findOne({_id:req.params.id});
          if(propertyId){
       
           if (req.files && req.files.images) {
            var ImagesArray = [];
            let dir = './public/uploads/mainFeatureIcon/';
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

              let newMainFeature = new MainFeature();
              newMainFeature.title = req.body.title;
              newMainFeature.status = req.body.status;
              newMainFeature.Icon = ImagesArray;
              newMainFeature.propertyId = propertyId.id;
              newMainFeature.save(async function (err, property) {
                  if(err){
                      console.log(err);
                  }
                  else{
                    res.redirect(`/admin/add/features/${propertyId._id}`);
                      // return res.send({'Success' : true,'message' : 'Main Features added Successfully.',newMainFeature})
                  }
              })
          }else{
            return res.send({'Success' : true,'message' : 'Property ID  Not Found'})
          }
        } catch (error) {
            console.log(error.message,'from add New Main Feature API');
            return res.send({'Success' : false,'message' : error.message})
        }
      },

       AddHealthCare:async function(req,res){
        try {
          var propertyId = await Property.findOne({_id:req.params.id});
          if(propertyId){
       
           if (req.files && req.files.images) {
            var ImagesArray = [];
            let dir = './public/uploads/HealthCareIcon/';
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

              let newHealthCare = new HealthCare();
              newHealthCare.title = req.body.title;
              newHealthCare.status = req.body.status;
              newHealthCare.Icon = ImagesArray;
              newHealthCare.propertyId = propertyId.id;
              newHealthCare.save(async function (err, property) {
                  if(err){
                      console.log(err);
                  }
                  else{
                     res.redirect(`/admin/add/health-care/${propertyId._id}`);
                      // return res.send({'Success' : true,'message' : ' Health Care added Successfully.','healthcare':property})
                  }
              })
          }else{
            return res.send({'Success' : true,'message' : 'Property ID  Not Found'})
          }
        } catch (error) {
            console.log(error.message,'from add New Main Feature API');
            return res.send({'Success' : false,'message' : error.message})
        }
      },

        AddFloorPlan:async function(req,res){
        try {
          var propertyId = await Property.findOne({_id:req.params.id});
          if(propertyId){
       
           if (req.files && req.files.images) {
            var ImagesArray = [];
            let dir = './public/uploads/FloorPlanImages/';
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

              let newFloorPlan = new FloorPlan();
              newFloorPlan.title = req.body.title;
              newFloorPlan.status = req.body.status;
              newFloorPlan.images = ImagesArray;
              newFloorPlan.propertyId = propertyId.id;
              console.log(newFloorPlan)
              newFloorPlan.save(async function (err, property) {
                  if(err){
                      console.log(err);
                  }
                  else{
                    res.redirect(`/admin/add/floor-plane/${propertyId._id}`)
                      // return res.send({'Success' : true,'message' : ' Floor Plan added Successfully.','FloorPlan':property})
                  }
              })
          }else{
            return res.send({'Success' : true,'message' : 'Property ID  Not Found'})
          }
        } catch (error) {
            console.log(error.message,'from add New Floor Plan API');
            return res.send({'Success' : false,'message' : error.message})
        }
      },

      AddDeveloper:async function(req,res){
        try {
          var propertyId = await Property.findOne({_id:req.params.id});
          if(propertyId){
            let newDeveloper = new Developer();
            newDeveloper.title = req.body.title;
            newDeveloper.description = req.body.description;
            newDeveloper.propertyId = propertyId.id;
            newDeveloper.save(async function (err, property) {
              if(err){
                console.log(err);
              }else{
                res.redirect(`/admin/add/developer/${propertyId._id}`)
                // return res.send({'Success' : true,'message' : ' Developer added Successfully.','Developer':property})
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

      AddCommunication:async function(req,res){
        try {
          var propertyId = await Property.findOne({_id:req.params.id});
          if(propertyId){
       
           if (req.files && req.files.images) {
            var ImagesArray = [];
            let dir = './public/uploads/communicationImages/';
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

              let newCommunication = new Communication();
              newCommunication.title = req.body.title;
              newCommunication.status = req.body.status;
              newCommunication.Icon = ImagesArray;
              newCommunication.propertyId = propertyId.id;
              console.log(newCommunication)
              newCommunication.save(async function (err, property) {
                  if(err){
                      console.log(err);
                  }
                  else{
                    res.redirect(`/admin/add/communication/${propertyId._id}`)
                      // return res.send({'Success' : true,'message' : ' Communication added Successfully.','Communication':property})
                  }
              })
          }else{
            return res.send({'Success' : true,'message' : 'Property ID  Not Found'})
          }
        } catch (error) {
            console.log(error.message,'from add New Communication API');
            return res.send({'Success' : false,'message' : error.message})
        }
      },
      AddRooms:async function(req,res){
        try {
          var propertyId = await Property.findOne({_id:req.params.id});
          if(propertyId){
       
           if (req.files && req.files.images) {
            var ImagesArray = [];
            let dir = './public/uploads/roomsImages/';
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

              let newRoom = new Rooms();
              newRoom.title = req.body.title;
              newRoom.status = req.body.status;
              newRoom.Icon = ImagesArray;
              newRoom.propertyId = propertyId.id;
              console.log(newRoom)
              newRoom.save(async function (err, property) {
                  if(err){
                      console.log(err);
                  }
                  else{
                    res.redirect(`/admin/add/room/${propertyId._id}`)
                      // return res.send({'Success' : true,'message' : ' Communication added Successfully.','Communication':property})
                  }
              })
          }else{
            return res.send({'Success' : true,'message' : 'Property ID  Not Found'})
          }
        } catch (error) {
            console.log(error.message,'from add New Rooms API');
            return res.send({'Success' : false,'message' : error.message})
        }
      },

    deleteProduct: async function (req, res) {
      let product = await Property.deleteOne({ _id: req.params.id });
      res.redirect('/get/all-property-featured')
    },

     deleteProject: async function (req, res) {
      // let product = await Property.deleteOne({ _id: req.params.id });
      res.redirect('/admin/all-project')
    },
     deleteFeature: async function (req, res) {
      let product = await Property.deleteOne({ _id: req.params.id });
      res.redirect('/admin/all-property')
    },
// -------------------------------Get All  Features and project properties in One Apis--------------
    GetAllProperty:async function(req,res){
      jwt.verify(req.token,jwtConfig.secret,async function(err,data){
        console.log(data)
        if(err){
          var allFeatured = [];
             var featureds = await Property.find({isFeatured:true}).sort('-createdAt').limit(5);
              if(featureds != null && featureds !=""){
                  for (const featured of featureds) {
                      let favourited = false;
                      let mainObject = {}
                         mainObject.favourited = favourited;
                         mainObject.featured = featured;
                        await allFeatured.push(mainObject);
            
                  }
              }
             var Location = await City.find({});
             var allProject = await Property.find({isFeatured:false}).sort('-createdAt').limit(5);
            if(allFeatured && allProject){
            return res.send({'Success' : true,'message' : 'Get All Project and Featured Property',Location,allProject,allFeatured})
          }else{
             return res.send({'Success' : false,'message' : 'Property lists Empty'})
          }
        }else{
           let allFeatured = [];
           var featureds = await Property.find({isFeatured:true}).sort('-createdAt').limit(5);
      if(featureds != null && featureds !=""){
          for (const featured of featureds) {
              let favourited = false;
              let mainObject = {}
              let favourite = await Favourite.findOne({userId : data.loginUser._id,propertyId : featured._id});
              if(favourite != null && favourite !=""){
                 favourited = true;
              }
              console.log(favourite)
                 mainObject.favourited = favourited;
                 mainObject.featured = featured;
                await allFeatured.push(mainObject);
    
          }
      }
      var Location = await City.find({});
      var allProject = await Property.find({isFeatured:false}).sort('-createdAt').limit(5);
         if(allFeatured && allProject){
         return res.send({'Success' : true,'message' : 'Get All Project and Featured Property',Location,allProject,allFeatured})
      }else{
         return res.send({'Success' : false,'message' : 'Property lists Empty'})
      }
        }
      });
    
   },

 GetProjectDetails:async function(req,res){
     // jwt.verify(req.token,jwtConfig.secret,async function(err,data){
     //    if(err){
     //     req.sendStatus(403);
     //    }else{
         var property = await Property.findOne({_id:req.params.id});
         var addNearByLocation = await AddNearByLocation.find({propertyId:req.params.id});
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
         //        if(property != null && property !=""){
         //            let favouriteFound = await Favourite.findOne({userId :data.loginUser._id,propertyId : property._id});
         //            if(favouriteFound != null && favouriteFound !=""){
         //                favourite = true;
         //       }
         //  }

         if(property){
           return res.send({'Success':true,'message':'Get Project details',
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
            socialContact
          })

         }else{
           return res.send({'Success':true,'message':'Get Property is Empty'})
         }
      //  }
      // })
     
   },
  GetPropertyDetails:async function(req,res){
    jwt.verify(req.token,jwtConfig.secret,async function(err,data){
        if(err){
            var property = await Property.findOne({_id:req.params.id,});
             var addNearByLocation = await AddNearByLocation.find({propertyId:req.params.id});//
             var propertyImage = await PropertyImages.find({propertyId:req.params.id});
             var rooms = await Rooms.find({propertyId:req.params.id});//
             var otherFacilities = await OtherFacilities.find({propertyId:req.params.id});//
             var mainFeature = await MainFeature.find({propertyId:req.params.id});//
             var healthCare = await HealthCare.find({propertyId:req.params.id});//
             var communication = await Communication.find({propertyId:req.params.id});//
             // var recommentedProperty = await Property.find({isFeatured:true}).sort('-createdAt');
             var socialContact = await SocialContact.find({propertyId:req.params.id}); 
             let favourite = false;
             let recommentedProperty = [];
             var recommentedPropertys = await Property.find({isRecommented:true}).sort('-createdAt').limit(5);
             console.log(recommentedPropertys);
              if(recommentedPropertys != null && recommentedPropertys !=""){
                  for (const featured of recommentedPropertys) {
                      let favourited = false;
                      let mainObject = {}
                         mainObject.favourited = favourited;
                         mainObject.featured = featured;
                        await recommentedProperty.push(mainObject);
            
                  }
              }    
             if(property){
               return res.send({'Success':true,'message':'Get Property details',
                property,
                addNearByLocation,
                rooms,
                otherFacilities,
                mainFeature,
                healthCare,
                propertyImage,
                communication,
                socialContact,
                recommentedProperty,
                favourite
              })
             }else{
               return res.send({'Success':true,'message':'Get Property is Empty'})
             }
        }else{
     var property = await Property.findOne({_id:req.params.id,});
     var addNearByLocation = await AddNearByLocation.find({propertyId:req.params.id});//
     var propertyImage = await PropertyImages.find({propertyId:req.params.id});
     var rooms = await Rooms.find({propertyId:req.params.id});//
     var otherFacilities = await OtherFacilities.find({propertyId:req.params.id});//
     var mainFeature = await MainFeature.find({propertyId:req.params.id});//
     var healthCare = await HealthCare.find({propertyId:req.params.id});//
     var communication = await Communication.find({propertyId:req.params.id});//
     // var recommentedProperty = await Property.find({isFeatured:true}).sort('-createdAt');
     var socialContact = await SocialContact.find({propertyId:req.params.id}); 
     
     let favourite = false;    
                if(property != null && property !=""){
                    let favouriteFound = await Favourite.findOne({userId :data.loginUser._id,propertyId : property._id});
                    if(favouriteFound != null && favouriteFound !=""){
                        favourite = true;
               }
          }
           let recommentedProperty = [];
           var recommentedPropertys = await Property.find({isRecommented:true}).sort('-createdAt').limit(5);
      if(recommentedPropertys != null && recommentedPropertys !=""){
          for (const featured of recommentedPropertys) {
              let favourited = false;
              let mainObject = {}
              let favourite = await Favourite.findOne({userId : data.loginUser._id,propertyId : featured._id});
              if(favourite != null && favourite !=""){
                 favourited = true;
              }
                 mainObject.favourited = favourited;
                 mainObject.featured = featured;
                await recommentedProperty.push(mainObject);
    
          }
      }



     if(property){
       return res.send({'Success':true,'message':'Get Property details',
        property,
        addNearByLocation,
        rooms,
        otherFacilities,
        mainFeature,
        healthCare,
        propertyImage,
        communication,
        socialContact,
        recommentedProperty,
        favourite
      })
     }else{
       return res.send({'Success':true,'message':'Get Property is Empty'})
     }
   }
   });
   },

   GetAllBuyProperty:async function(req,res){
     var Buy = await Property.find({purpose:"buy"});
     if(Buy){
      return res.send({'Success':true,'message':'Get all Buy Property',Buy})
     }else{
      return res.send({'Success':false,'message':'Buy Property is Empty'})
     }
   },
   GetAllSellProperty:async function(req,res){
     var Sell= await Property.find({purpose:"Sell"});
     if(Sell){
      return res.send({'Success':true,'message':'Get all Sell Property',Sell})
     }else{
      return res.send({'Success':false,'message':'Sell Property is Empty'})
     }
   },
   GetAllRentProperty:async function(req,res){
     var Rent= await Property.find({purpose:"Rent"});
     if(Rent){
      return res.send({'Success':true,'message':'Get all Rent Property',Rent})
     }else{
      return res.send({'Success':false,'message':'Rent Property is Empty'})
     }
   },

   

   GetUserProfile:async function(req,res){
     var userProfile = await User.findOne({_id:req.params.userId});
     if(userProfile){
      return res.send({'Success':true,'message':'Get User Profile',userProfile})
     }else{
      return res.send({'Success':true,'message':'Get User Profile is Empty',userProfile})
     }
   },

   EditUserProfile:async function(req,res){
    try {
        if(req.body.fullName == '' || req.body.fullName == undefined){
           return res.send({'Success' : false,'message' : 'Name is required.'})
        }
        if(req.body.email == '' || req.body.email == undefined){
           return res.send({'Success' : false,'message' : 'email is required.'})
        }
        if(req.body.contactNumber == '' || req.body.contactNumber == undefined){
           return res.send({'Success' : false,'message' : 'contact Number is required.'})
        }

          var userProfile = await User.findOne({_id:req.params.userId});
          userProfile.fullName = req.body.fullName;
          userProfile.email = req.body.email;
          userProfile.contactNumber = req.body.contactNumber;
           var oldPassword = await bcrypt.compare(req.body.oldPassword, userProfile.password);
          
           if(oldPassword == true){
            let salt = bcrypt.genSaltSync(saltRounds);
            let hash = bcrypt.hashSync(req.body.newPassword, salt);
            userProfile.password = hash;
            console.log(userProfile.password)
            console.log(hash)
           }else{
           return res.send({'Success':false,'message':'Old Password is not correct'})
           }
          // userProfile.password = Cryptr.decrypt(req.body.password)
          
          // console.log(userProfile)
          userProfile.save();
          return res.send({'Success':true,'message':'Added Successfully User Profile',userProfile})
           
      }catch(error){
         return res.send({'Success' : false,'message' : error.message})
      }
   },

   

   



}