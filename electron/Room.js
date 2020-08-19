const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
    rID: {
        type: String,
        required: true
    },
    rType: {
        type: String,
        required: true
    },
    bID: {
        type: String,
        required: true
    },
    capacity: {
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

module.exports = Room = mongoose.model('room', RoomSchema)