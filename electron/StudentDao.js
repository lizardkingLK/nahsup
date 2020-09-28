const Student = require('./Student')
const GroupId = require('./GroupId')
const SubGroupId = require('./SubGroupId')

const StudentDao = {

    // ADD STUDENT
    addStudent: (yearNo, semNo, programmeName, groupId, subGroupId, callback) => {
        const newStudent = new Student({
            year: yearNo,
            sem: semNo,
            programme: programmeName,
            group: groupId,
            subGroup: subGroupId
        })

        newStudent.save().then(r => callback(r))
    },
    // LOAD STUDENTS
    loadStudents: (callback) => {
        Student.find().lean().then(rs => callback(rs))
    },
    // SEARCH STUDENTS
    searchStudents: (keyword, callback) => {
        Student.find({ $text: { $search: keyword } })
            .then(rs => {
                if (rs)
                    callback(rs)
                else
                    callback([])
            })
    },

    // DELETE Student
    deleteStudent: (id, callback) => {
        Student.findById(id)
            .then(r => {
                Student.deleteOne(r)
                    .then(() => {
                        callback({ success: true })
                    })
                    .catch(err => {
                        console.error(err);
                        callback({ success: false })
                    })
            });
    },
    // ADD GROUP ID
    addGroupId: (grpid, unavlblHrs, callback) => {
        const newGroupId = new GroupId({
            groupId: grpid,
            unavailableHours: unavlblHrs,
        })

        newGroupId.save().then(r => callback(r))
    },
    // LOAD GROUP ID
    loadGroupId: (callback) => {
        GroupId.find().lean().then(rs => callback(rs))
    },
    // ADD SUB GROUP ID
    addSubGroupId: (sbGrpid, sUnavlblHrs, callback) => {
        const newSubGroupId = new SubGroupId({
            subGroupId: sbGrpid,
            unavailableHours: sUnavlblHrs
        })

        newSubGroupId.save().then(r => callback(r))
    },
    // LOAD SUB GROUP ID
    loadSubGroupId: (callback) => {
        GroupId.find().lean().then(rs => callback(rs))
    },

    // FIND GROUP ID
    findGroupId: (gid, callback) => {
        GroupId.find({ groupId: gid }).lean()
            .then(rs => callback(rs))
    },

    // FIND SUB GROUP ID
    findSubGroupId: (sgid, callback) => {
        SubGroupId.find({ subGroupId: sgid }).lean()
            .then(rs => callback(rs))
    },
}

module.exports = StudentDao