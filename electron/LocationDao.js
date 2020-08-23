const Building = require('./Building')
const Room = require('./Room')

const LocationDao = {
    // ADD BUILDING
    addBuilding: (bID, callback) => {
        const newBuilding = new Building({
            bID: bID
        })

        newBuilding.save().then(b => callback(b))
    },
    // LOAD BUILDINGS
    loadBuildings: (callback) => {
        Building.find().lean().then(bs => callback(bs))
    },
    // ADD ROOM
    addRoom: (newRoomID, roomType, buildingID, capacity, callback) => {
        const newRoom = new Room({
            rID: newRoomID,
            rType: roomType,
            bID: buildingID,
            capacity: capacity
        })

        newRoom.save().then(r => callback(r))
    },
    // LOAD ROOMS
    loadRooms: (callback) => {
        Room.find().lean().then(rs => callback(rs))
    },
    // SEARCH ROOMS
    searchRooms: (keyword, callback) => {
        Room.find({ $text: { $search: keyword } })
            .then(rs => {
                if (rs)
                    callback(rs)
                else
                    callback([])
            })
    },
    // DELETE ROOM
    deleteRoom: (id, callback) => {
        Room.findById(id)
            .then(r => {
                Room.deleteOne(r)
                    .then(() => {
                        callback({ success: true })
                    })
                    .catch(err => {
                        console.error(err);
                        callback({ success: false })
                    })
            });
    },
    // EDIT ROOM
    editRoom: (newRoomID, roomType, buildingID, capacity, lid, callback) => {
        Room.findOneAndUpdate({ _id: lid }, {
            $set: {
                rID: newRoomID,
                rType: roomType,
                bID: buildingID,
                capacity: capacity
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

module.exports = LocationDao