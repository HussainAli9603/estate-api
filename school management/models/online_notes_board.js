let mongoose = require('mongoose');

let notesBoardSchema = new mongoose.Schema({
    title: {
        type: String
    },
    details: {
        type: String
    },
    postedBy: {
        type: String
    },
    date: {
        type: String
    }
},{ timestamps: true });

module.exports = mongoose.model('notesBoard', notesBoardSchema);