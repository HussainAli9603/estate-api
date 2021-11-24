let mongoose = require('mongoose');

let usersSchema = new mongoose.Schema({
    full_name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact_number: {
        type: Number,
        unique: true
    },
    password: {
        type: String,
    },
    status :{
        type: Boolean,
        default: false
    },
    online_status :{
        type: Boolean,
        default: false
    },
    otp_code: {
        type: Number,
        default : 0
    },
    reset_password_token:{
        type : String
    },
    reset_password_expires:{
        type : String
    },
    profile_pic:{
        type:String,
        default: 'uploads/profile/default-pic.jpg'
    },
    last_login:{
        type:Date
    },
  
   
},{ timestamps: true });

module.exports = mongoose.model('Users', usersSchema);