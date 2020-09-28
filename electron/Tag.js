const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
});


module.exports = Tag = mongoose.model('tag', TagSchema)