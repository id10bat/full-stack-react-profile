const mongose = require('mongoose');

const PublicUser = new mongose.Schema({
    startTime: Date,
    startTimeLocal: String,
    userID: String,
    pid: Number,
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    img: String,
    head_story: String,
    story: String,
    content_about: String,
})

var Public = mongose.model('Public', PublicUser);

module.exports = Public;