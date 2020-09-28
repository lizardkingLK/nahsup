const Tag = require('./Tag')

const TagDao = {
    // ADD TAG
    addTag: ( tagName) => {
        const newTag = new Tag({
            name: tagName
        })

        newTag.save().then(r => callback(r))
    },
    // LOAD TAG
    loadTags: (callback) => {
        Tag.find().lean().then(rs => callback(rs))
    },
    // SEARCH TAG
    searchTags: (keyword, callback) => {
        Tag.find({ $text: { $search: keyword } })
            .then(rs => {
                if (rs)
                    callback(rs)
                else
                    callback([])
            })
    },
    // DELETE TAG
    deleteTag: (id, callback) => {
        Tag.findById(id)
            .then(r => {
                Tag.deleteOne(r)
                    .then(() => {
                        callback({ success: true })
                    })
                    .catch(err => {
                        console.error(err);
                        callback({ success: false })
                    })
            });
    },
    // EDIT TAG
    editTag: (tagName, lid, callback) => {
        console.log("accessed edit tag func")
        Tag.findOneAndUpdate({ _id: lid }, {
            $set: {
                name: tagName

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

module.exports = TagDao