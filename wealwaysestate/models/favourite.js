let mongoose = require('mongoose');

let favouriteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    }
},{ timestamps: true });

module.exports = mongoose.model('Favourite', favouriteSchema);