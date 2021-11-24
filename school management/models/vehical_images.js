let mongoose = require('mongoose');

let imagesSchema = new mongoose.Schema({
    images:{
        type:String
    },
    vehical_Id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehical",
    },
   
   
},{ timestamps: true });

module.exports = mongoose.model('VehicalImages', imagesSchema);