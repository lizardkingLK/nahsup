const Schedule = require('./Schedule')


const ScheduleDao = {
    
    // ADD SCHEDULE
    addSchedule: (dayCount, workingDays,stime, duration,wtime,callback ) => {
        const newSchedule = new Schedule({
            working_days_count: dayCount,
            working_days: workingDays,
            Working_time: wtime,
            starting_time:stime,
            Working_duration: duration
        })
      
            newSchedule.save().then(r => callback(r)).catch(err => {
                console.error(err);
                callback({ success: false })
            })
        
    },
    // LOAD SCHEDULES
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
    editSchedule: (_id,edayCount, eworkingDays,estime, eduration,ewtime,callback ) => {
        Schedule.findOneAndUpdate({ _id: _id}, {
            $set: {
                working_days_count: edayCount,
                working_days: eworkingDays,
                starting_time: estime,
                Working_time: ewtime,
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