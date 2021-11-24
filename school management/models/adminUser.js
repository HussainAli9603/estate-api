let mongoose = require('mongoose');

let adminUserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber: {
        type: Number
    },
    occupation: {
        type: String
    },
    address: {
        type: String
    },
    bio: {
        type: String
    },
    roleId: {
        type: String,
        // default: 'Admin',
    },
    password: {
        type: String
    },
    image: {
        type: String
    },
   
},{ timestamps: true });

module.exports = mongoose.model('adminUser', adminUserSchema);