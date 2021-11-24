let mongoose = require('mongoose');

let otherFacilitiesSchema = new mongoose.Schema({
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
        default : "",
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    }
   
},{ timestamps: true });

module.exports = mongoose.model('OtherFacilities', otherFacilitiesSchema);