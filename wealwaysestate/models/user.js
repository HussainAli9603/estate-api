let mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    bio: {
        type: String,
        default: ""
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    contactNumber: {
        type: Number,
        unique: true
    },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
        default : null
    },
    cityId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
        default : null
    },
    address: {
        type: String,
        default: ""
    },
    password: {
        type: String,
    },
 
    status :{
        type: Boolean,
        default: false
    },
    onlineStatus :{
        type: Boolean,
        default: false
    },
    OTPCOde: {
        type: Number,
        default : 0
    },
    resetPasswordToken:{
        type : String
    },
    resetPasswordExpires:{
        type : String
    },
    profilePic:{
        type:String,
        default: 'uploads/profile/default-pic.jpg'
    },
    lastLogin:{
        type:Date
    },
  
   
},{ timestamps: true });

module.exports = mongoose.model('Users', usersSchema);