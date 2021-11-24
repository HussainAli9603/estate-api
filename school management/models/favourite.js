let mongoose = require('mongoose');

let favouriteSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
    },
    vehicle_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehical",
    }
},{ timestamps: true });

module.exports = mongoose.model('Favourite', favouriteSchema);