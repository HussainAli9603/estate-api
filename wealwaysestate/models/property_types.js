let mongoose = require('mongoose');

let propertyTypesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    subTitle: {
        type: String,
        required: true,
    },
    priceFrom: {
        type: String,
        default : "",
    },
    priceTo: {
        type: String,
        default : "",
    },
    areaFrom: {
        type: String,
        default : "",
    },
    areaTo: {
        type: String,
        default: "",
    },
    areaUnit: {
        type: String,
        default: "",
    },
    priceUnit: {
        type: String,
        default: "",
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    }
   
},{ timestamps: true });

module.exports = mongoose.model('PropertyTypes', propertyTypesSchema);