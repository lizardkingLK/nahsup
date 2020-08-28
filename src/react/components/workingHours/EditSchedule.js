import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography, Checkbox } from '@material-ui/core';
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
    },
    myRightAlign: {
        textAlign: 'center'
    }
}))

export default function EditSchedule({ selected, scheduleUpdated, _id, dayCount, workingDays, hrs, mins, duration }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [wdays, setWdays] = React.useState([]);
    const [edayCount, setdayCount] = React.useState('');
    const [ehrs, setEhrs] = React.useState(0);
    const [emins, setMins] = React.useState(0);
    const [eduration, setDuration] = React.useState('');
    const [scheduleEditSuccess, setScheduleEditSuccess] = React.useState({ type: 'info', msg: 'Enter Room Info.' });
    const dayArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const handleClickOpen = () => {
        setOpen(true);
        handleWorkingDays();
        setMins(mins);
        setEhrs(hrs);
        setdayCount(dayCount);
        setDuration(duration);
    };

    const handleClose = () => {
        setOpen(false);
        setScheduleEditSuccess({ type: 'info', msg: 'Enter Room Info.' });
    };

    //Split working days from string and send to 'handleCheckBoxes'
    const handleWorkingDays = () => {
        const d_array = workingDays.split(',');
        handleCheckBoxes(d_array);
    };

    //Create day objects and insert into wdays array
    const handleCheckBoxes = (d_array) => {
        var count = 0;
        wdays.splice(0, 7);
        dayArr.forEach(ele1 => {
            if (d_array.includes(ele1)) {
                const day = {
                    id: wdays.length,
                    name: ele1,
                    check: true
                }
                wdays.push(day);
                count++;
            } else {
                const day = {
                    id: wdays.length,
                    name: ele1,
                    check: false
                }
                wdays.push(day);
            }
        });
        setdayCount(count);
        setWdays(wdays);
    };

    //Onclick Edit
    const handleEditSchedule = async () => {
        //Taking array to a string
        var eworkingDays = "";
        wdays.forEach(ele => {
            if (eworkingDays === "" && ele.check === true) {
                eworkingDays = ele.name;
            } else if (ele.check === true) {
                eworkingDays = eworkingDays + ',' + ele.name;
            }
        });
        //validations
        if (dayCount === 0)
            setScheduleEditSuccess({ type: 'warning', msg: 'Please select at least one working day!' });
        else if (hrs === 0 && mins === 0)
            setScheduleEditSuccess({ type: 'warning', msg: 'Invalid working time per day!' });
        else {
            //Save to database
            ipcRenderer.send(channels.EDIT_SCHEDULE, { _id, edayCount, eworkingDays, ehrs, emins, eduration });
            scheduleUpdated();
            await ipcRenderer.on(channels.EDIT_SCHEDULE, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.EDIT_SCHEDULE);
                const { success } = arg;
                if (success) {
                    setScheduleEditSuccess({ type: 'success', msg: 'Schedule edited.' });
                    setdayCount(0);
                    setEhrs(0);
                    setMins(0);
                    setDuration('');
                    scheduleUpdated();
                    uncheckCheckBoxes();
                }
                else
                    setScheduleEditSuccess({ type: 'error', msg: 'Schedule not edited' });
            })
        }
    }

    //Uncheck all checkBoxes when edited
    const uncheckCheckBoxes = () => {
        wdays.map(item => item.check = false)
        setWdays([...wdays]);
    }

    //Handle checkbox selections
    const handleDaySelect = (event, id) => {
        var count = 0;
        wdays.forEach(item => {
            if (item.id === id) {
                if (item.check === false)
                    item.check = true;
                else
                    item.check = false;
            }
            if (item.check === true)
                count++;
        })
        setWdays([...wdays]);
        setdayCount(count);
    }

    //CheckBox list render
    let daysOptions = wdays.map((cur) => {
        return (
            <InputLabel key={cur.id} id="roomType-simple-select-label" className={classes.myRowInput}>
                <Checkbox
                    size="small"
                    color="primary"
                    name={cur.name}
                    checked={cur.check}
                    onChange={(e) => handleDaySelect(e, cur.id)}
                />
                {cur.name}
            </InputLabel>
        )
    }
    );

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
                <DialogTitle id="form-dialog-title">Edit Schedule</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <DialogContentText>
                            Edit Schedule
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="capacity"
                            label="Number of Working days(Change automatically)"
                            type="text"
                            name="dayCount"
                            disabled={true}
                            value={edayCount}
                            onChange={(e) => setdayCount(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <InputLabel id="roomType-simple-select-label" >
                            <Typography variant="caption" component="h6">
                                Working time per day(Including lunch)
                            </Typography>
                        </InputLabel>
                        <div className={classes.myRowInputs}>
                            <div className={classes.myRowInput}>
                                <InputLabel id="roomType-simple-select-label" className={classes.myRowInput}>
                                    <Typography variant="caption" component="h6">
                                        Hrs
                                    </Typography>
                                </InputLabel>

                                <Select
                                    labelId="roomType-simple-select-label"
                                    id="roomType-simple-select"
                                    value={ehrs}
                                    className={classes.myRowInput}
                                    onChange={(e) => setEhrs(e.target.value)}
                                >
                                    <MenuItem value='0'>0</MenuItem>
                                    <MenuItem value='1'>1</MenuItem>
                                    <MenuItem value='2'>2</MenuItem>
                                    <MenuItem value='3'>3</MenuItem>
                                    <MenuItem value='4'>4</MenuItem>
                                    <MenuItem value='5'>5</MenuItem>
                                    <MenuItem value='6'>6</MenuItem>
                                    <MenuItem value='7'>7</MenuItem>
                                    <MenuItem value='8'>8</MenuItem>
                                    <MenuItem value='9'>9</MenuItem>
                                    <MenuItem value='10'>10</MenuItem>
                                    <MenuItem value='11'>11</MenuItem>
                                    <MenuItem value='12'>12</MenuItem>
                                    <MenuItem value='13'>13</MenuItem>
                                    <MenuItem value='14'>14</MenuItem>
                                </Select>
                            </div>
                            <div className={classes.myRowInput}>
                                <InputLabel id="roomType-simple-select-label" className={classes.myRowInput}>
                                    <Typography variant="caption" component="h6">
                                        Mins
                                    </Typography>
                                </InputLabel>
                                <Select
                                    labelId="roomType-simple-select-label"
                                    id="roomType-simple-select"
                                    value={emins}
                                    className={classes.myRowInput}
                                    defaultValue="00"
                                    onChange={(e) => setMins(e.target.value)}
                                >
                                    <MenuItem value='0'>00</MenuItem>
                                    <MenuItem value='10'>10</MenuItem>
                                    <MenuItem value='20'>20</MenuItem>
                                    <MenuItem value='30'>30</MenuItem>
                                    <MenuItem value='40'>40</MenuItem>
                                    <MenuItem value='50'>50</MenuItem>

                                </Select>
                            </div>
                        </div>
                        <div className={classes.myInput}>
                            <InputLabel id="building-simple-select-label">
                                <Typography variant="caption" component="h6">
                                    Time slot duration
                                </Typography>
                            </InputLabel>
                            <Select
                                labelId="building-simple-select-label"
                                id="building-simple-select"
                                className={classes.myInput}
                                value={eduration}
                                onChange={(e) => setDuration(e.target.value)}
                            >
                                <MenuItem value='One Hour'>One Hour</MenuItem>
                                <MenuItem value='Thirty mins'>Thirty mins</MenuItem>
                            </Select>
                        </div>
                    </Card>
                    <Card className={classes.sides} variant="outlined">
                        <Typography variant="caption" component="h6">
                            Select Working Days
                        </Typography>
                        {daysOptions}
                    </Card>
                </DialogContent>
                <div className={classes.myRightAlign}>
                    <Button
                        size="small"
                        variant="outlined"
                        onClick={handleEditSchedule}
                    >
                        Edit
                    </Button>
                </div>
                <div className={classes.myAlert}>
                    <Alert severity={scheduleEditSuccess.type}>
                        {scheduleEditSuccess.msg}
                    </Alert>
                </div>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
