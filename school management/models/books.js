let mongoose = require('mongoose');

let bookSchema = new mongoose.Schema({
    bookName: {
        type: String
    },
    subject: {
        type: String
    },
    writterName: {
        type: String
    },
    class: {
        type: String
    },
    idNo: {
        type: String
    },
    publishDate: {
        type: String
    },
    uploadDate: {
        type: String,
        // required: true,
        // unique: true
    },
    image: {
        type: String
    },
   
},{ timestamps: true });

module.exports = mongoose.model('Book', bookSchema);
