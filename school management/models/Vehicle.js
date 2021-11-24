let mongoose = require('mongoose');

let vehicalSchema = new mongoose.Schema({
    title: {
        type: String   // model,BMW,Civic
    },
    vehicle_id: {
        type: String
    },
    description: {
        type: String,
        default : ""
    },
    price: {
        type: String,
        default : "",
    },
    price_unit: {
        type: String,
        default : "",
    },
    year:{
        type: Number,
        default:0
    },
    color:{
        type: String,
        default:"",
    },
    type:{
        type: String,   //car, bus , truck etc  //Rent, Buy
        default:"",
    },
    fuel_type:{
        type: String,
        default:"",
    },
    mileage: {
        type: String,
        default : ""
    },
    mileage_unit: {
        type: String,
        default : ""
    },
    body_type:{
        type: String,
        default:"0",
    },
    location: {
        type: String,
        default : ""
    },
    purpose: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        default: "",
    },
    call: {
        type: String,
        default: "",
    },
    sms: {
        type: String,
        default: "",
    },
    total_images: {
        type: String,
        default: 0,
    },
    make: {
        type: String, // toyota,Honda,Nissan etc
        default: "",
    },
    is_recommented: {
        type: Boolean,  // true and false  true for Recommented and false for nonRecommented without featured
        default :false
    },
    lat: {
        type: String,
        default : ""
    },
    lng: {
        type: String,
        default : ""
    },
    status : {
        type : String,
        default : 'Presend', //Present , UnPresent,
    },
    images:{
        type:String
    },
    sliderImages:[{
        type:String
    }]
},{ timestamps: true });

module.exports = mongoose.model('Vehical', vehicalSchema);