let mongoose = require('mongoose');

let assignSubjectSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    assignSubject: {
        type: String
    },
    subjectClass: {
        type: String
    },
    section: {
        type: String
    },
    email: {
        type: String
    },
    image: {
        type: String
    },
   
},{ timestamps: true });

module.exports = mongoose.model('AssignSubject', assignSubjectSchema);
