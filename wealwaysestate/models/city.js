let mongoose = require('mongoose');

let citySchema = new mongoose.Schema({
    title: {
        type: String
    },
    countryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Country",
    }
},{ timestamps: true });

module.exports = mongoose.model('City', citySchema);
