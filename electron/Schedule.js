const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ScheduleSchema = new Schema({
    working_days_count: {
        type: Number,
        required: true
    },
    working_days: {
        type: String
    },
    working_time_hrs: {
        type: Number,
        required: true
    },
    Working_time_mins: {
        type: Number,
        required: true
    },
    Working_duration: {
        type: String,
        required: true
    }
});

module.exports = Schedule = mongoose.model('schedule', ScheduleSchema)