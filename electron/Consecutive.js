const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConsecutiveSchema = new Schema({
    sessions: {
        type: Object,
        default: null
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = Consecutive = mongoose.model('consecutive', ConsecutiveSchema)