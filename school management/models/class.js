let mongoose = require('mongoose');

let classSchema = new mongoose.Schema({
    teacherName: {
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
    IdNumber:{
        type: String
    },
    class:{
        type: String
    },
    section:{
        type: String
    },
    subject:{
        type: String
    },
    time:{
        type: String
    },
    date:{
      type: String	
    }
   
},{ timestamps: true });

module.exports = mongoose.model('Class', classSchema);