const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupIdSchema = new Schema({
    groupId: {
        type: String,
        unique: true,
        required: true
    },
    unavailableHours: {
        type: Object,
        default: null
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});

// eslint-disable-next-line no-undef
module.exports = GroupId = mongoose.model('groupId', GroupIdSchema)