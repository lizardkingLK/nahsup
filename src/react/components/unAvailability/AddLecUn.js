import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Select, MenuItem, Card, FormControl
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';

import UnavailableForm from './UnavailableForm';

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
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    myRowInput: {
        width: 100
    },
    myAlert: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
}))

export default function AddLecUn({ lecturers, sessionsUpdated }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [lecturer, setLecturer] = React.useState('');
    const [unavailableDay, setUnavailableDay] = React.useState('');
    const [unavailableTimeF, setUnavailableTimeF] = React.useState('');
    const [unavailableTimeT, setUnavailableTimeT] = React.useState('');
    const [lecUnAddSuccess, setLecUnAddSuccess] = React.useState({ type: 'info', msg: 'Enter Lecturer Info' });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setLecUnAddSuccess({ type: 'info', msg: 'Enter Lecturer Info' });
    };

    const handleSubmit = async () => {
        console.log(lecturer)
        console.log(unavailableDay)
        console.log(unavailableTimeF)
        console.log(unavailableTimeT)

        if (lecturer.length === 0)
            setLecUnAddSuccess({ type: 'warning', msg: 'Select a lecturer' })
        else if (unavailableDay.length === 0)
            setLecUnAddSuccess({ type: 'warning', msg: 'Select a day' })
        else if (unavailableTimeF.length === 0)
            setLecUnAddSuccess({ type: 'warning', msg: 'Select a start time' })
        else if (unavailableTimeT.length === 0)
            setLecUnAddSuccess({ type: 'warning', msg: 'Select a end time' })
        else {
            ipcRenderer.send(channels.EDIT_LECTURER, {
                load: {
                    eId: lecturer,
                    unavailableTime: { day: unavailableDay, from: unavailableTimeF, to: unavailableTimeT }
                }
            });
            await ipcRenderer.on(channels.EDIT_LECTURER, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.EDIT_LECTURER);
                const { success } = arg;
                if (success) {
                    setLecUnAddSuccess({
                        type: 'success',
                        msg: `Lecturer Time of unavailable Updated Successfully. ${unavailableDay}
                        from ${unavailableTimeF} to ${unavailableTimeT}`
                    });
                    setLecturer('');
                    setUnavailableDay('');
                    setUnavailableTimeF('');
                    setUnavailableTimeT('');
                    sessionsUpdated('Lecturer');
                }
                else {
                    setLecUnAddSuccess({
                        type: 'error',
                        msg: `Lecturer Time of unavailable Not Updated.`
                    });
                    setLecturer('');
                    setUnavailableDay('');
                    setUnavailableTimeF('');
                    setUnavailableTimeT('');
                }
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
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Unavailable Time Slot</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <FormControl className={classes.formControl} fullWidth>
                            <InputLabel id="building-simple-select-label">Lecturer</InputLabel>
                            <Select
                                labelId="building-simple-select-label"
                                id="building-simple-select"
                                value={lecturer}
                                onChange={(e) => setLecturer(e.target.value)}
                            >
                                {lecturers.map(s => (
                                    <MenuItem key={s.id} value={s.eId}>{s.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                        <UnavailableForm
                            unavailableDay={unavailableDay}
                            setUnavailableDay={setUnavailableDay}
                            unavailableTimeF={unavailableTimeF}
                            setUnavailableTimeF={setUnavailableTimeF}
                            unavailableTimeT={unavailableTimeT}
                            setUnavailableTimeT={setUnavailableTimeT}
                        />

                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleSubmit}
                        >
                            ADD
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={lecUnAddSuccess.type}>
                                {lecUnAddSuccess.msg}
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
