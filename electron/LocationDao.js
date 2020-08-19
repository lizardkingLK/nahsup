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
    }
}

module.exports = LocationDao