let mongoose = require('mongoose');

let callUsSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
 
},{ timestamps: true });

module.exports = mongoose.model('CallUs', callUsSchema);