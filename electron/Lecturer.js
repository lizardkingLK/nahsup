const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LecturerSchema = new Schema({
    eId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    dep: {
        type: String,
        required: true
    },
    center: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true
    },
    level: {
        type: String,
        required: true
    },
    rank: {
        type: String,
        required: true
    },
    unavailableTime: {
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

LecturerSchema.index({ eId: "text" })

module.exports = Lecturer = mongoose.model('lecturer', LecturerSchema)