let mongoose = require('mongoose');

let examSchema = new mongoose.Schema({
    examName: {
        type: String
    },
    subjectType: {
        type: String
    },
    selectClass:{
        type: String
    },
    selectSection:{
        type: String
    },
    selectTime:{
        type: String
    },
    selectDate:{
      type: String	
    }
   
},{ timestamps: true });

module.exports = mongoose.model('Exam', examSchema);