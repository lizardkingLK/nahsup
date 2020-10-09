const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ConsecutiveSchema = new Schema({
    sessions: {
        type: Array,
        default: []
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

module.exports = Consecutive = mongoose.model('consecutive', ConsecutiveSchema)