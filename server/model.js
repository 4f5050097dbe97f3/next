const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    roomId: String,
    passcode: String,
    headcount: Number,
    game: [String],
    status: [String],

}, { timestamps: true })


module.exports = mongoose.model('Room', schema)
