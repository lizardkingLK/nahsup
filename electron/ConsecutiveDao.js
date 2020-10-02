const Consecutive = require('./Consecutive');

const ConsecutiveDao = {
    // ADD BUILDING
    addConSession: (session, callback) => {
        const newConSession = new Consecutive({
            session: session
        })

        newConSession.save().then(b => callback(b))
    },
    // LOAD CONSECUTIVE SESSOINS
    loadConSessions: (callback) => {
        Consecutive.find().lean().then(bs => callback(bs))
    },
}

module.exports = ConsecutiveDao