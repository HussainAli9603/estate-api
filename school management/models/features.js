let mongoose = require('mongoose');

let featuresSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    Icon:{
        type: String,
        default : "",
    },
    status: {
        type: String,
        default : "",// yes or length
    },
    vehical_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehical",
    }
   
},{ timestamps: true });

module.exports = mongoose.model('features', featuresSchema);