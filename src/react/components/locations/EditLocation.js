import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import EditIcon from '@material-ui/icons/Edit';

import { channels } from '../../../shared/constants';
const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
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
    myRowInputs: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: theme.spacing(1),
    },
    myRowInput: {
        width: 100
    },
    myAlert: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}))

export default function EditLocation({ buildings, selected, locationsUpdated, rid, type, bid, cap, lid }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [newRoomID, setNewRoomID] = React.useState('');
    const [roomType, setRoomType] = React.useState('');
    const [buildingID, setBuildingID] = React.useState('');
    const [capacity, setCapacity] = React.useState(0);
    const [roomEditSuccess, setRoomEditSuccess] = React.useState({ type: 'info', msg: 'Enter Room Info.' });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setRoomEditSuccess({ type: 'info', msg: 'Enter Room Info.' });
    };

    const handleEditRoom = async () => {
        if (newRoomID.length === 0)
            setRoomEditSuccess({ type: 'warning', msg: 'Room ID not entered' });
        else if (roomType.length === 0)
            setRoomEditSuccess({ type: 'warning', msg: 'Type not selected' });
        else if (buildingID.length === 0)
            setRoomEditSuccess({ type: 'warning', msg: 'Building not selected' });
        else if (capacity === 0)
            setRoomEditSuccess({ type: 'warning', msg: 'Capacity not entered' });
        else {
            ipcRenderer.send(channels.EDIT_ROOM, { newRoomID, roomType, buildingID, capacity, lid });
            await ipcRenderer.on(channels.EDIT_ROOM, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.EDIT_ROOM);
                const { success } = arg;
                if (success) {
                    setRoomEditSuccess({ type: 'success', msg: 'Location editted.' });
                    setNewRoomID('');
                    setRoomType('');
                    setBuildingID('');
                    setCapacity(0);

                    locationsUpdated();
                }
                else
                    setRoomEditSuccess({ type: 'error', msg: 'Location not editted' });
            })
        }
    }

    return (
        <div>
            <IconButton
                size="medium"
                color="primary"
                component="span"
                disabled={selected === ''}
                onClick={handleClickOpen}
            >
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Location</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <DialogContentText>
                            Edit Room
                        </DialogContentText>

                        <div className={classes.myRowInput}>
                            <TextField
                                margin="dense"
                                id="roomID"
                                label="Room ID"
                                type="text"
                                value={newRoomID}
                                onChange={(e) => setNewRoomID(e.target.value)}
                            />
                            <Typography variant="caption" component="h3">{rid}</Typography>
                        </div>
                        <div className={classes.myRowInput}>
                            <InputLabel id="roomType-simple-select-label" className={classes.myRowInput}>
                                <Typography variant="caption" component="h6">
                                    Room Type
                                    </Typography>
                            </InputLabel>
                            <Select
                                labelId="roomType-simple-select-label"
                                id="roomType-simple-select"
                                value={roomType}
                                className={classes.myRowInput}
                                onChange={(e) => setRoomType(e.target.value)}
                            >
                                <MenuItem value='Lecture Hall'>Lecture Hall</MenuItem>
                                <MenuItem value='Laboratory'>Laboratory</MenuItem>
                            </Select>
                            <Typography variant="caption" component="h3">{type}</Typography>
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
                            >
                                {buildings.map(b => (
                                    <MenuItem key={b.id} value={b.bID}>{b.bID}</MenuItem>
                                ))}
                            </Select>
                            <Typography variant="caption" component="h3">{bid}</Typography>
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
                        <Typography variant="caption" component="h3">{cap}</Typography>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleEditRoom}
                        >
                            EDIT
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={roomEditSuccess.type}>
                                {roomEditSuccess.msg}
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
