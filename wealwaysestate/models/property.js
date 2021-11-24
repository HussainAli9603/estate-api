let mongoose = require('mongoose');

let propertySchema = new mongoose.Schema({
    title: {
        type: String
    },
    propertyId: {
        type: String
    },
    description: {
        type: String,
        default : ""
    },
    priceFrom: {
        type: String,
        default : ""
    },
    priceTo: {
        type: String,
        default: "",
    },
    fixedPrice: {
        type: String,
        default: "",
    },
    areaFrom: {
        type: String,
        default : "",
    },
    areaTo: {
        type: String,
        default: "",
    },
    fixedArea: {
        type: String,
        default: "",
    },
    areaUnit: {
        type: String,
        default: "",  // Marla , Kanal, Sq.Ft,
    },
    priceUnit: {
        type: String,
        default: "",  // Crore , lakh,
    },
    bedrooms: {
        type: String,
        default: "",  // total bedrooms
    },
    bathrooms: {
        type: String,
        default: "",  // total badrooms
    },
    flats: {
        type: String,
        default: "0",  // total Flats
    },
    type: {
        type: String,
        default: "",  // home,plots,commercials
    },
    location: {
        type: String,
        default: "",
    },
    developer: {
        type: String,
        default: "",
    },
    purpose: {
        type: String,
        default: "",
    },
    status : {
        type : String,
        default : 'Present', //Pending , Approved , Rejected
        // enum: ['Pending', 'Approved','Rejected']
    },
    isFeatured: {
        type: Boolean,  // true and false  true for featured property and false for all property without featured
        default :false
    },
    isRecommented: {
        type: Boolean,  // true and false  true for Recommented and false for nonRecommented without featured
        default :false
    },
    isActive : {
        type : Number,
        default : 1, //By default is Active will be one, Once the product is inActive then it will be 2
        enum: [0,1]
    },
    lat: {
        type:String,
        default : ""
    },
    lng: {
        type: String,
        default : ""
    },
    totalImages: {
        type: Number,
        default : "0"
    },
    images: [{
        type: String
    }],
    Icon: [{
        type: String
    }],
    // favourite:{
    //   type:Boolean,
    //   require:false
    // },
    // favourite:[{
    //     userId: {type: mongoose.Schema.Types.ObjectId,  ref: "Users",  }
    // }],
    
    
},{ timestamps: true });

module.exports = mongoose.model('Property', propertySchema);