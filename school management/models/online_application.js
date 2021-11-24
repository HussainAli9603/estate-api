let mongoose = require('mongoose');

let applicationSchema = new mongoose.Schema({
    applicationFor: {
        type: String
    },
    title: {
        type: String
    },
    studentName: {
        type: String
    },
    email: {
        type: String,
       
    },
    contactNumber: {
        type: Number
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
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

module.exports = mongoose.model('onlineApplication', applicationSchema);