let mongoose = require('mongoose');

let attendanceSchema = new mongoose.Schema({
    studentName: {
        type: String
    },
    section: {
        type: String
    },
    class: {
        type: String
    },
    roll: {
        type: String
    },
    subject: {
        type: String
    },
    teacherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher",
    },
    presentORabsent: {
        type: String,
        default:"Absent"
    },
    date:{
        type:String
    }
},{ timestamps: true });

module.exports = mongoose.model('Attendance', attendanceSchema);