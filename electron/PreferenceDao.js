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
    // EDIT PREFERENCE ON UNAVAILABILITIES
    editPreferenceOnUnavailabilities: (preference, callback) => {
        const rID = preference.rID
        const load = preference.unavailabilities
        Preference.findOneAndUpdate({ rID: rID }, {
            $set: {
                lastUpdated: new Date().toISOString(),
            },
            $push: { unavailabilities: load }
        }, { useFindAndModify: false })
            .then(() => {
                callback(true)
            }).catch(err => {
                callback(false)
            })
    },
    // // LOAD PREFERENCES
    loadPreferences: (callback) => {
        Preference.find().lean().then(ps => callback(ps))
    },
}

module.exports = LocationDao