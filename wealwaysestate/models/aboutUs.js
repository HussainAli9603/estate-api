let mongoose = require('mongoose');

let aboutUsSchema = new mongoose.Schema({
    title: {
        type: String,
        // required: true
        default:''
    },
     description: {
        type: String,
        required: true
    }
},{ timestamps: true });

module.exports = mongoose.model('aboutUs', aboutUsSchema);