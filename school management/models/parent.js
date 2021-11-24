let mongoose = require('mongoose');

let parentSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    
    gender: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber:{
        type: Number
    },
    occupation:{
        type: String
    },
    IdNumber:{
        type: String
    },
    bio:{
        type: String
    },
    address:{
        type: String
    },
    password:{
        type: String
    },
    roleId: {
      type: String,
      default:"Parent" 
    },
    image: {
        type: String
    },
   
},{ timestamps: true });

module.exports = mongoose.model('Parent', parentSchema);