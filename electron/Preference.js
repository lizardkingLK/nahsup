const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PreferenceSchema = new Schema({
    rID: {
        type: String,
        unique: true,
        required: true
    },
    tags: {
        type: Array,
        default: []
    },
    subjects: {
        type: Array,
        default: []
    },
    lecturers: {
        type: Array,
        default: []
    },
    groups: {
        type: Array,
        default: []
    },
    sessions: {
        type: Array,
        default: []
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
});

module.exports = Preference = mongoose.model('preference', PreferenceSchema)