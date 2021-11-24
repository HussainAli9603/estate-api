let mongoose = require('mongoose');

let expensesSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    parent: {
        type: String
    },
    gender: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contactNumber:{
        type: Number
    },
    roll:{
        type: String
    },
    class:{
        type: String
    },
    section:{
        type: String
    },
    expensesType:{
        type: String
    },
    amount:{
        type: String
    },
    IdNumber:{
        type: String
    },
    status:{
        type: String
    },
    date:{
      type: String	
    },
    image: {
        type: String
    },
   
},{ timestamps: true });

module.exports = mongoose.model('Expenses', expensesSchema);