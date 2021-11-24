let mongoose = require('mongoose');

let socialContactSchema = new mongoose.Schema({
    email: {
        type: String,
        default: ""
    },
    call: {
        type: String,
        default: ""
    },
    sms: {
        type: String,
        default: ""
    },
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    }
   
},{ timestamps: true });

module.exports = mongoose.model('SocialContact', socialContactSchema);
