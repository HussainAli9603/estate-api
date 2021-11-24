let mongoose = require('mongoose');

let hostelSchema = new mongoose.Schema({
    roomName: {
        type: String
    },
    roomNumber: {
        type: String
    },
    roomType: {
        type: String,
        // required: true,
        // unique: true
    },
    NoOfBed: {
        type: Number
    },
    price: {
        type: String,
        default:"0"
    },
   
},{ timestamps: true });

module.exports = mongoose.model('Hostel', hostelSchema);
