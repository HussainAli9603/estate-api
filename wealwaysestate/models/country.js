let mongoose = require('mongoose');

let countrySchema = new mongoose.Schema({
    title: {
        type: String
    }
   
},{ timestamps: true });

module.exports = mongoose.model('Country', countrySchema);