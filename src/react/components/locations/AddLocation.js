import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, IconButton, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel, Select,
    MenuItem, Card
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';

import { channels } from '../../../shared/constants';
const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        margin: theme.spacing(1),
    },
    sides: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        minWidth: 240,
    },
    myInput: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        minWidth: 200,
    },
    myAlert: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}))

export default function AddLocation({ locationsUpdated, buildings, fetchBuildings }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [newBuilding, setNewBuilding] = React.useState('');
    const [newRoomID, setNewRoomID] = React.useState('');
    const [roomType, setRoomType] = React.useState('');
    const [buildingID, setBuildingID] = React.useState('');
    const [capacity, setCapacity] = React.useState(0);
    const [buildingAddSuccess, setBuildingAddSuccess] = React.useState({ type: 'info', msg: 'Enter Building ID' });
    const [roomAddSuccess, setRoomAddSuccess] = React.useState({ type: 'info', msg: 'Enter Room Info.' });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(function () {
            setBuildingAddSuccess({ type: 'info', msg: 'Enter Building ID' });
            setRoomAddSuccess({ type: 'info', msg: 'Enter Room Info.' });
        }, 1000)
    };

    const handleAddBuilding = async () => {
        if (newBuilding.length === 0)
            setBuildingAddSuccess({ type: 'warning', msg: 'Building ID not entered' });
        else {
            ipcRenderer.send(channels.ADD_BUILDING, { newBuilding });
            await ipcRenderer.on(channels.ADD_BUILDING, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.ADD_BUILDING);
                const { success } = arg;
                if (success) {
                    setBuildingAddSuccess({ type: 'success', msg: `Building added: ${newBuilding}` });
                    fetchBuildings();
                    setNewBuilding('');
                }
                else
                    setBuildingAddSuccess({ type: 'error', msg: 'Building not added' });
            })
        }
    }

    const handleAddRoom = async () => {
        if (newRoomID.length === 0)
            setRoomAddSuccess({ type: 'warning', msg: 'Room ID not entered' });
        else if (roomType.length === 0)
            setRoomAddSuccess({ type: 'warning', msg: 'Type not selected' });
        else if (buildingID.length === 0)
            setRoomAddSuccess({ type: 'warning', msg: 'Building not selected' });
        else if (capacity === 0)
            setRoomAddSuccess({ type: 'warning', msg: 'Capacity not entered' });
        else {
            ipcRenderer.send(channels.ADD_ROOM, { newRoomID, roomType, buildingID, capacity });
            await ipcRenderer.on(channels.ADD_ROOM, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.ADD_ROOM);
                const { success } = arg;
                if (success) {
                    setRoomAddSuccess({ type: 'success', msg: `Location added: ${newRoomID}` });
                    setNewRoomID('');
                    setRoomType('');
                    setBuildingID('');
                    setCapacity(0);

                    locationsUpdated();
                }
                else
                    setRoomAddSuccess({ type: 'error', msg: 'Room not added' });
            })
        }
    }

    return (
        <div>
            <IconButton
                size="medium"
                color="primary"
                component="span"
                onClick={handleClickOpen}
            >
                <AddIcon />
            </IconButton>
            <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Location</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <DialogContentText>
                            Add Building
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="buildingID"
                            label="Building ID"
                            type="text"
                            value={newBuilding}
                            onChange={(e) => setNewBuilding(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleAddBuilding}
                        >
                            ADD
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={buildingAddSuccess.type}>
                                {buildingAddSuccess.msg}
                            </Alert>
                        </div>
                    </Card>
                    <Card className={classes.sides} variant="outlined">
                        <DialogContentText>
                            Add Room
                        </DialogContentText>

                        <div>
                            <TextField
                                margin="dense"
                                id="roomID"
                                label="Room ID"
                                type="text"
                                value={newRoomID}
                                onChange={(e) => setNewRoomID(e.target.value)}
                                fullWidth
                            />
                        </div>
                        <div>
                            <InputLabel id="roomType-simple-select-label">
                                <Typography variant="caption" component="h6">
                                    Room Type
                                    </Typography>
                            </InputLabel>
                            <Select
                                labelId="roomType-simple-select-label"
                                id="roomType-simple-select"
                                value={roomType}
                                onChange={(e) => setRoomType(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value='Lecture Hall'>Lecture Hall</MenuItem>
                                <MenuItem value='Laboratory'>Laboratory</MenuItem>
                            </Select>
                        </div>

                        <div className={classes.myInput}>
                            <InputLabel id="building-simple-select-label">
                                <Typography variant="caption" component="h6">
                                    Building ID
                                </Typography>
                            </InputLabel>
                            <Select
                                labelId="building-simple-select-label"
                                id="building-simple-select"
                                className={classes.myInput}
                                value={buildingID}
                                onChange={(e) => setBuildingID(e.target.value)}
                                fullWidth
                            >
                                {buildings.map(b => (
                                    <MenuItem key={b.id} value={b.bID}>{b.bID}</MenuItem>
                                ))}
                            </Select>
                        </div>
                        <TextField
                            margin="dense"
                            id="capacity"
                            label="Capacity"
                            type="text"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleAddRoom}
                        >
                            ADD
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={roomAddSuccess.type}>
                                {roomAddSuccess.msg}
                            </Alert>
                        </div>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
