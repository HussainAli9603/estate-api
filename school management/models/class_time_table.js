let mongoose = require('mongoose');

let classTimeTableSchema = new mongoose.Schema({
    subjectName: {
        type: String
    },
     class: {
        type: String
    },
    code: {
        type: String
    },
     subjectCode: {
        type: String
    },
    day: {
        type: String
    },
    section: {
        type: String
    },
    teacher: {
        type: String
    },
    time: {
        type: String
    },
    date: {
        type: String
    },
},{ timestamps: true });

module.exports = mongoose.model('ClassTimeTable', classTimeTableSchema);
