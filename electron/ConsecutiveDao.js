const Consecutive = require('./Consecutive');

const ConsecutiveDao = {
    // ADD CONSECUTIVE SESSIONS
    addConSession: (session, callback) => {
        const newConSession = new Consecutive({
            sessions: session
        })

        newConSession.save().then(b => callback(b))
    },
    // LOAD CONSECUTIVE SESSOINS
    loadConSessions: (callback) => {
        Consecutive.find().lean().then(bs => callback(bs))
    },
    // DELETE CONSECUTIVE SESSOIN
    deleteConSession: (id, callback) => {
        Consecutive.findById(id)
            .then(r => {
                Consecutive.deleteOne(r)
                    .then(() => {
                        callback({ success: true })
                    })
                    .catch(err => {
                        console.error(err);
                        callback({ success: false })
                    })
            });
    },
}

module.exports = ConsecutiveDao