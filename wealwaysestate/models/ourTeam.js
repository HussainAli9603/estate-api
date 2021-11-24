let mongoose = require('mongoose');

let ourTeamSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required:true
    },
    bio: {
        type: String,
        required:true
    },
    images: [{
        type: String,
        required:true
    }]
},{ timestamps: true });

module.exports = mongoose.model('ourTeam', ourTeamSchema);