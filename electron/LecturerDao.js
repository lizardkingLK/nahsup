const Lecturer = require('./Lecturer')

const LecturerDao = {
    // ADD LECTURER
    addLecturer: (eId, name, faculty, dep, center, building, level, rank, callback) => {
        const newLecturer = new Lecturer({
            eId: eId,
            name: name,
            faculty: faculty,
            dep: dep,
            center: center,
            building: building,
            level: level,
            rank: rank
        })

        newLecturer.save().then(b => callback(b));
    },

    // LOAD LECTURER
    loadLecturers: (callback) => {
        Lecturer.find().lean().then(bs => callback(bs))
    },

    // DELETE LECTURER
    deleteLecturer: (id, callback) => {
        Lecturer.findById(id)
            .then(r => {
                Lecturer.deleteOne(r)
                    .then(() => {
                        callback({ success: true })
                    })
                    .catch(err => {
                        console.error(err);
                        callback({ success: false })
                    })
            });
    },

    // EDIT LECTURER
    editLecturer: (eId, name, faculty, dep, center, building, level, rank, id, callback) => {
        Lecturer.findOneAndUpdate({ _id: id }, {
            $set: {
                eId: eId,
                name: name,
                faculty: faculty,
                dep: dep,
                center: center,
                building: building,
                level: level,
                rank: rank
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

module.exports = LecturerDao