let mongoose = require('mongoose');

let studentSchema = new mongoose.Schema({
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
    contactNumber: {
        type: Number
    },
    dateOfBirth : {
        type: String
    },
    roll : {
        type: String
    },
    bloodGroup : {
        type: String
    },
    class : {
        type: String
    },
    section : {
        type: String
    },
    admissionId : {
        type: String
    },
    bio:{
        type: String
    },
    parent:{
        type: String
    },
    address:{
        type: String
    },
    presentORabsent:[{
        present:{  type:String,  default:'false' },
    }],
    password:{
        type: String
    },
    roleId: {
      type: String,
      default:"Student" 
    },
    image: {
        type: String
    },
   
},{ timestamps: true });

module.exports = mongoose.model('Student', studentSchema);