let mongoose = require('mongoose');

let homeWorkSchema = new mongoose.Schema({
    teacherName: {
        type: String
    },
    homeworkType: {
        type: String
    },
    Class: {
        type: String
    },
    section: {
        type: String
    },
    message: {
        type: String
    },
    image: {
        type: String
    }
},{ timestamps: true });

module.exports = mongoose.model('Homeworks', homeWorkSchema);