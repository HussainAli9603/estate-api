let mongoose = require('mongoose');

let paymentPlansSchema = new mongoose.Schema({
     images:[{
        type:String
    }],
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property",
    },

},{ timestamps: true });

module.exports = mongoose.model('PaymentPlans', paymentPlansSchema);