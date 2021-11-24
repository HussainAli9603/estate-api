let mongoose = require('mongoose');

let settingSchema = new mongoose.Schema({
    title: {
        type: String
    },
    image: {
        type: String,
    },
   
},{ timestamps: true });

module.exports = mongoose.model('Setting', settingSchema);