const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BuildingSchema = new Schema({
    bID: {
        type: String,
        unique: true,
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

module.exports = Building = mongoose.model('building', BuildingSchema)