let mongoose = require('mongoose');

let MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required : true
    },
    unRead : {
        type : Number,
        default : 1
    },

 
},{ timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);