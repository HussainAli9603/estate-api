let mongoose = require('mongoose');

let resultSTDSchema = new mongoose.Schema({
    stdName: {
        type: String
    },
    ExamName: {
        type: String
    },
    subject: {
        type: String
    },
    rollNumber:{
        type: String
    },
    class: {
        type: String
    },
    parent:{
        type: String
    },
    obtMarks:{
        type: String
    },
    totalMarks:{
        type: String
    },
    grade:{
        type: String
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    comment:{
        type: String
    },
    
   
},{ timestamps: true });

module.exports = mongoose.model('StudentResult', resultSTDSchema);