let mongoose = require('mongoose');

let resultSchema = new mongoose.Schema({
    examName: {
        type: String
    },
    
    subject: {
        type: String
    },
    class:{
        type: String
    },
    roll:{
        type: String
    },
    grade:{
        type: String
    },
    percentage:{
        type: String
    },
    date: {
      type: String
    },
   
},{ timestamps: true });

module.exports = mongoose.model('Result', resultSchema);