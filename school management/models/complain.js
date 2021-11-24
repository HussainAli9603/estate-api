let mongoose = require('mongoose');

let complainSchema = new mongoose.Schema({
    complainFor: {
        type: String
    },
    complainBy: {
        type: String
    },
    studentName: {
        type: String
    },
    parent: {
        type: String
    },
    class: {
        type: String
    },
    section: {
        type: String
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    contactNumber: {
        type: Number
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parent",
    },
    bio: {
        type: String,
        default:"0"
    },
    image: {
        type: String,
        default: 'default-pic.png'

    },
   
},{ timestamps: true });

module.exports = mongoose.model('complainFor', complainSchema);