import React, { useEffect } from 'react';
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
import AddIcon from '@material-ui/icons/Add';

import { channels } from '../../../shared/constants';
import FormControl from "@material-ui/core/FormControl";
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
    }
}))

export default function AddSesUn() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [Lecturers, setLecturers] = React.useState([]);
    const [groupUnAddSuccess, setGroupUnAddSuccess] = React.useState({ type: 'info', msg: 'Enter Group Info' });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setGroupUnAddSuccess({ type: 'info', msg: 'Enter Group Info' });
    };

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

                        <FormControl className={classes.formControl}>
                            <InputLabel id="building-simple-select-label">Group Id</InputLabel>
                            <Select
                                labelId="building-simple-select-label"
                                id="building-simple-select"
                                value="ses"
                            >
                                <MenuItem value="group1">group1</MenuItem>
                                <MenuItem value="group2">group2</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            margin="dense"
                            id="timeSlot"
                            label="Time Slot"
                            type="text"
                            value="time"
                            className={classes.myInput}
                            fullWidth
                        />



                        <Button
                            size="small"
                            variant="outlined"
                        >
                            ADD
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={groupUnAddSuccess.type}>
                                {groupUnAddSuccess.msg}
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
