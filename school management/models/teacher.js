let mongoose = require('mongoose');

let teacherSchema = new mongoose.Schema({
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
    dateOfBirth:{
        type: String
    },
    IdNumber:{
        type: String
    },
    bloodGroup:{
        type: String
    },
    subject:{
        type: String
    },
    class:{
        type: String
    },
    section:{
        type: String
    },
    password:{
        type: String
    },
    bio:{
        type: String
    },
    address:{
        type: String
    },
    roleId: {
      type: String,
      default:"Teacher" 
    },
    image: {
        type: String
    },
   
},{ timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);