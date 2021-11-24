let mongoose = require('mongoose');

let mainSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    Icon: [{
        type: String,
        default : "",
    }],
    status: {
        type: String,
        default : "",// yes or length
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    }
   
},{ timestamps: true });

module.exports = mongoose.model('MainFeature', mainSchema);