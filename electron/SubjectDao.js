const Subject = require('./Subject')

const SubjectDao = {
    // ADD Subject
    addSubject: (subjectCode, subYear, subSem, subName, subLecHrs, subTuteHrs, subLabHrs, subEvalHrs, callback) => {
        const newSubject = new Subject({
            subCode: subjectCode,
            year: subYear,
            sem: subSem,
            name: subName,
            lecHrs: subLecHrs,
            tuteHrs: subTuteHrs,
            labHrs: subLabHrs,
            evalHrs: subEvalHrs
        })

        newSubject.save().then(b => callback(b))
    },
    // LOAD SUBJECTS
    loadSubjects: (callback) => {
        Subject.find().lean().then(bs => callback(bs))
    },
    // DELETE SUBJECT
    deleteSubject: (id, callback) => {
        Subject.findById(id)
            .then(r => {
                Subject.deleteOne(r)
                    .then(() => {
                        callback({ success: true })
                    })
                    .catch(err => {
                        console.error(err);
                        callback({ success: false })
                    })
            });
    },
    // EDIT SUBJECT
    editSubject: (subjectCode, subYear, subSem, subName, subLecHrs, subTuteHrs, subLabHrs, subEvalHrs, id, callback) => {
        Subject.findOneAndUpdate({ _id: id }, {
            $set: {
                subCode: subjectCode,
                year: subYear,
                sem: subSem,
                name: subName,
                lecHrs: subLecHrs,
                tuteHrs: subTuteHrs,
                labHrs: subLabHrs,
                evalHrs: subEvalHrs
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

module.exports = SubjectDao