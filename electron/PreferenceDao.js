const Preference = require('./Preference')

const LocationDao = {
    // FIND PREFERENCE
    findPreference: (rID, callback) => {
        Preference.find({ rID: rID })
            .lean().then(rs => callback(rs))
    },
    // ADD PREFERENCE
    addPreference: (preference, callback) => {
        const newPreference = new Preference({
            rID: preference.rID,
            tags: preference.tags,
            subjects: preference.subjects,
            lecturers: preference.lecturers,
            groups: preference.groups,
            sessions: preference.sessions,
            lastUpdated: preference.lastUpdated
        })

        newPreference.save().then(p => callback(p))
    },
    // EDIT PREFERENCE ON TAGS
    editPreferenceOnTags: (preference, callback) => {
        const rID = preference.rID
        const load = preference.tags
        Preference.findOneAndUpdate({ rID: rID }, {
            $set: {
                lastUpdated: new Date().toISOString(),
            },
            $push: { tags: load }
        }, { useFindAndModify: false })
            .then(() => {
                callback(true)
            }).catch(err => {
                callback(false)
            })
    },
    // EDIT PREFERENCE ON SUBJECTS
    editPreferenceOnSubjects: (preference, callback) => {
        const rID = preference.rID
        const load = preference.subjects
        Preference.findOneAndUpdate({ rID: rID }, {
            $set: {
                lastUpdated: new Date().toISOString(),
            },
            $push: { subjects: load }
        }, { useFindAndModify: false })
            .then(() => {
                callback(true)
            }).catch(err => {
                callback(false)
            })
    },
    // EDIT PREFERENCE ON LECTURERS
    editPreferenceOnLecutrers: (preference, callback) => {
        const rID = preference.rID
        const load = preference.lecturers
        Preference.findOneAndUpdate({ rID: rID }, {
            $set: {
                lastUpdated: new Date().toISOString(),
            },
            $push: { lecturers: load }
        }, { useFindAndModify: false })
            .then(() => {
                callback(true)
            }).catch(err => {
                callback(false)
            })
    },
    // EDIT PREFERENCE ON GROUPS
    editPreferenceOnGroups: (preference, callback) => {
        const rID = preference.rID
        const load = preference.groups
        Preference.findOneAndUpdate({ rID: rID }, {
            $set: {
                lastUpdated: new Date().toISOString(),
            },
            $push: { groups: load }
        }, { useFindAndModify: false })
            .then(() => {
                callback(true)
            }).catch(err => {
                callback(false)
            })
    },
    // EDIT PREFERENCE ON SESSIONS
    editPreferenceOnSessions: (preference, callback) => {
        const rID = preference.rID
        const load = preference.sessions
        Preference.findOneAndUpdate({ rID: rID }, {
            $set: {
                lastUpdated: new Date().toISOString(),
            },
            $push: { sessions: load }
        }, { useFindAndModify: false })
            .then(() => {
                callback(true)
            }).catch(err => {
                callback(false)
            })
    },
    // // LOAD BUILDINGS
    // loadBuildings: (callback) => {
    //     Building.find().lean().then(bs => callback(bs))
    // },
    // // ADD ROOM
    // addRoom: (newRoomID, roomType, buildingID, capacity, callback) => {
    //     const newRoom = new Room({
    //         rID: newRoomID,
    //         rType: roomType,
    //         bID: buildingID,
    //         capacity: capacity
    //     })

    //     newRoom.save().then(r => callback(r))
    // },
    // // LOAD ROOMS
    // loadRooms: (callback) => {
    //     Room.find().lean().then(rs => callback(rs))
    // },
    // // SEARCH ROOMS
    // searchRooms: (keyword, callback) => {
    //     Room.find({ $text: { $search: keyword } })
    //         .then(rs => {
    //             if (rs)
    //                 callback(rs)
    //             else
    //                 callback([])
    //         })
    // },
    // // DELETE ROOM
    // deleteRoom: (id, callback) => {
    //     Room.findById(id)
    //         .then(r => {
    //             Room.deleteOne(r)
    //                 .then(() => {
    //                     callback({ success: true })
    //                 })
    //                 .catch(err => {
    //                     console.error(err);
    //                     callback({ success: false })
    //                 })
    //         });
    // },
    // // EDIT ROOM
    // editRoom: (newRoomID, roomType, buildingID, capacity, lid, callback) => {
    //     Room.findOneAndUpdate({ _id: lid }, {
    //         $set: {
    //             rID: newRoomID,
    //             rType: roomType,
    //             bID: buildingID,
    //             capacity: capacity
    //         }
    //     }, { useFindAndModify: false })
    //         .then(() => {
    //             callback({ success: true })
    //         }).catch(err => {
    //             console.error(err);
    //             callback({ success: false })
    //         })
    // }
}

module.exports = LocationDao