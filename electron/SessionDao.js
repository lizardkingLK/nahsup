const Session = require('./Session')

const SessionDao = {
    // ADD SESSION
    addSession: (lecNames, tag, subName, subCode, groupIdSub, studentCount, Duration, callback) => {
        const newSession = new Session({
            lecName: lecNames,
            tag: tag,
            subName: subName,
            subCode: subCode,
            groupIdSub: groupIdSub,
            studentCount: studentCount,
            Duration: Duration
        })

        newSession.save().then(b => callback(b));
    },

    // LOAD SESSION
    loadSessions: (callback) => {
        Session.find().lean().then(bs => callback(bs))
    },

    // SEARCH SESSIONS
    searchSessions: (keyword, callback) => {
        Session.find({ $text: { $search: keyword } })
            .then(se => {
                if (se)
                    callback(se)
                else
                    callback([])
            })
    },

    // DELETE SESSION
    deleteSession: (id, callback) => {
        Session.findById(id)
            .then(r => {
                Session.deleteOne(r)
                    .then(() => {
                        callback({ success: true })
                    })
                    .catch(err => {
                        console.error(err);
                        callback({ success: false })
                    })
            });
    },

    // EDIT SESSION ON UNAVAILABILITY
    editSessionOnUnavailability: (load, callback) => {
        const { id, unavailableTime } = load
        Session.findOneAndUpdate({ _id: id }, {
            $set: {
                unavailableTime: unavailableTime
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

module.exports = SessionDao