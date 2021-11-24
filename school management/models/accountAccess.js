let mongoose = require('mongoose');

let accountAccessSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    userType: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    IdNo: {
        type: Number
    }
},{ timestamps: true });

module.exports = mongoose.model('accountAccess', accountAccessSchema);