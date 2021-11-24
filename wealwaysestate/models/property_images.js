let mongoose = require('mongoose');

let imagesSchema = new mongoose.Schema({
    images:[{
        type:String
    }],
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    },
   
   
},{ timestamps: true });

module.exports = mongoose.model('PropertyImages', imagesSchema);