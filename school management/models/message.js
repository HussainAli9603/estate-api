let mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({
    messageBy: {
        type: String
    },
    title: {
        type: String
    },
    recName: {
        type: String,
        default:"0"
    },
    recipient: {
        type: String,
        required: true,
        // unique: true
    },
    sendTo: {
        type: String
    },
    message: {
        type: String
    },
   
},{ timestamps: true });

module.exports = mongoose.model('message', messageSchema);