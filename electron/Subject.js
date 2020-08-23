const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SubjectSchema = new Schema({
    subCode: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    sem: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lecHrs: {
        type: Number,
        required: true
    },
    tuteHrs: {
        type: Number,
        required: true
    },
    labHrs: {
        type: Number,
        required: true
    },
    evalHrs: {
        type: Number,
        required: true
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

module.exports = Subject = mongoose.model('subject', SubjectSchema)