let mongoose = require('mongoose');

let examGradeSchema = new mongoose.Schema({
    gradeName: {
        type: String
    },
    gradePoint: {
        type: String
    },
    percentageFrom:{
        type: String
    },
    percentageUpTo:{
        type: String
    },
    comments:{
        type: String
    }
   
},{ timestamps: true });

module.exports = mongoose.model('ExamGrade', examGradeSchema);