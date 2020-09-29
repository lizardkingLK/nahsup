const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = new Schema({

    year: {
        type: Number,
        required: true
    },
    sem: {
        type: Number,
        required: true
    },
    programme: {
        type: String,
        required: true
    },
    group: {
        type: String,
        required: true
    },
    subGroup: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    groupIdLabel: {
        type: String,
        default: null
    },
    subGroupIdLabel: {
        type: String,
        default: null
    }
});

// eslint-disable-next-line no-undef
module.exports = Student = mongoose.model('student', StudentSchema)