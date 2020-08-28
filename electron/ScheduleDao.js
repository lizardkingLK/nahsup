const Schedule = require('./Schedule')

const ScheduleDao = {
    // ADD SCHEDULE
    addSchedule: (dayCount, workingDays, hrs, mins, duration, callback) => {
        const newSchedule = new Schedule({
            working_days_count: dayCount,
            working_days: workingDays,
            working_time_hrs: hrs,
            Working_time_mins: mins,
            Working_duration: duration
        })
        newSchedule.save().then(r => callback(r)).catch(err => {
            console.error(err);
            callback({ success: false })
        })

    },
    // LOAD ROOMS
    loadSchedules: (callback) => {
        Schedule.find().lean().then(rs => callback(rs))
    },
    // SEARCH SCHEDULES
    searchSchedules: (keyword, callback) => {
        Schedule.find({ $text: { $search: keyword } })
            .then(rs => {
                if (rs)
                    callback(rs)
                else
                    callback([])
            })
    },
    // DELETE SCHEDULE
    deleteSchedule: (id, callback) => {
        Schedule.findById(id)
            .then(r => {
                Schedule.deleteOne(r)
                    .then(() => {
                        callback({ success: true })
                    })
                    .catch(err => {
                        console.error(err);
                        callback({ success: false })
                    })
            });
    },
    // EDIT SCHEDULE
    editSchedule: (_id, edayCount, eworkingDays, ehrs, emins, eduration, callback) => {
        Schedule.findOneAndUpdate({ _id: _id }, {
            $set: {
                working_days_count: edayCount,
                working_days: eworkingDays,
                working_time_hrs: ehrs,
                Working_time_mins: emins,
                Working_duration: eduration
            }
        }, { useFindAndModify: false })
            .then(() => {
                callback({ success: true })
            }).catch(err => {
                console.error(err);
                callback({ success: false })
            })
    }
}

module.exports = ScheduleDao