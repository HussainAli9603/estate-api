let mongoose = require('mongoose');

let floorPlansSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    images: [{
        type: String
    }],
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    }
   
},{ timestamps: true });

module.exports = mongoose.model('FloorPlans', floorPlansSchema);