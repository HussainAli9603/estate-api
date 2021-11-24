let mongoose = require('mongoose');

let mapSchema = new mongoose.Schema({
    lat: {
        type: String,
        default: ""
    },
    lng: {
        type: String,
        default: ""
    },
   
},{ timestamps: true });

module.exports = mongoose.model('ContactMaps', mapSchema);
