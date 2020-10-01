const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SessionSchema = new Schema({
    lecName: {
        type: Array,
        required: true
    },
    tag: {
        type: String,
        required: true
    },
    subName: {
        type: String,
        required: true
    },
    subCode: {
        type: String,
        required: true
    },
    groupIdSub: {
        type: String,
        required: true
    },
    studentCount: {
        type: Number,
        required: true
    },
    Duration: {
        type: Number,
        required: true
    },
    unavailableTime:{
        type: String
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    availability: {
        type: Boolean,
        default: true
    }
});

module.exports = Session = mongoose.model('session', SessionSchema)