const mongoose = require('mongoose')

module.exports = async (callback) => {
    let uri = 'mongodb+srv://sndp:Ie81BF1o9Z9LfDgk@cluster0-mkvg6.mongodb.net/ttadmin';
    await mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, db) => {
        if (err) {
            callback({ success: false })
            console.log('ttadmin offline...')
            throw err
        }
        else {
            callback({ success: true })
            console.log('ttadmin online...', uri)
        }
    })
}

