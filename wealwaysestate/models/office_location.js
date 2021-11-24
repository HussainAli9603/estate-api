let mongoose = require('mongoose');

let AddressSchema = new mongoose.Schema({
    location: {
        type: String,
        required: true,
    },
    title:{
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
 
},{ timestamps: true });

module.exports = mongoose.model('Address', AddressSchema);