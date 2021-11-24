let mongoose = require('mongoose');

let adminUserSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    username: {
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
    roleId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "adminRoles",
        type: String
        
    },
    password: {
        type: String
    },
    image: {
        type: String,
         default: 'uploads/profile/default-pic.jpg'
    },
   
},{ timestamps: true });

module.exports = mongoose.model('adminUser', adminUserSchema);