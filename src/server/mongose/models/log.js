const mongose = require('mongoose');

const LogSchema = new mongose.Schema({
    hostname: String,
    startTime: Date,
    startTimeLocal: String,
    userID: String,
    pid: Number,
    data: {
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
        img: String
    }
})

var Log = mongose.model('Log', LogSchema);

module.exports = Log;