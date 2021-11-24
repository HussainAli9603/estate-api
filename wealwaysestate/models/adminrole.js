let mongoose = require('mongoose');

let adminRoleSchema = new mongoose.Schema({
    title: {
        type: String
    }
},{ timestamps: true });

module.exports = mongoose.model('adminRoles', adminRoleSchema);