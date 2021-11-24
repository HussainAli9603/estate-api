let mongoose = require('mongoose');

let dmcSchema = new mongoose.Schema({
    studentName: {
        type: String
    },
    roll : {
        type: String
    },
    class : {
        type: String
    },
    section : {
        type: String
    },
    parent:{
        type: String
    },
    image: {
        type: String
    },
   
},{ timestamps: true });

module.exports = mongoose.model('DMC', dmcSchema);