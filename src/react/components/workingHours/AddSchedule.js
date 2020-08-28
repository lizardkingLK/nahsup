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
import AddIcon from '@material-ui/icons/Add';

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
        textAlign: 'right',
        marginRight: theme.spacing(2),
    }
}))

export default function AddSchedule({ scheduleUpdated }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dayCount, setdayCount] = React.useState(0);
    const [wdays, setWdays] = React.useState([]);
    const [hrs, setHrs] = React.useState(0);
    const [mins, setMins] = React.useState(0);
    const [duration, setDuration] = React.useState('One Hour');
    const [scheduleAddSuccess, setScheduleAddSuccess] = React.useState({ type: 'info', msg: 'Enter Relavant Details.' });
    const [dayArr, setDayArr] = React.useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setScheduleAddSuccess({ type: 'info', msg: 'Enter Relavant Details' });
    };

    //Onclick add
    const handleAddSchedule = async () => {
        //Taking array to a string
        var workingDays = "";
        wdays.forEach(ele => {
            if (workingDays === "") {
                workingDays = ele;
            } else {
                workingDays = workingDays + ',' + ele;
            }
        });
        //validations
        if (dayCount === 0)
            setScheduleAddSuccess({ type: 'warning', msg: 'Please select at least one working day!' });
        else if (hrs === 0 && mins === 0)
            setScheduleAddSuccess({ type: 'warning', msg: 'Invalid working time per day!' });
        else {
            //Save to database
            ipcRenderer.send(channels.ADD_SCHEDULE, { dayCount, workingDays, hrs, mins, duration });
            await ipcRenderer.on(channels.ADD_SCHEDULE, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.ADD_SCHEDULE);
                const { success } = arg;
                if (success) {
                    setScheduleAddSuccess({ type: 'success', msg: `Schedule added!` });
                    setHrs(0);
                    setMins(0);
                    setdayCount(0);
                    setDuration('');
                    scheduleUpdated();
                    setWdays([]);
                    //Uncheck checkBoxes after edit
                    setDayArr([]);
                    setDayArr(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
                }
                else
                    setScheduleAddSuccess({ type: 'error', msg: 'Schedule not added' });
            })
        }
    }

    //CheckBox list render
    const daysOptions = dayArr.map((cur, ind) => {
        return (
            <InputLabel key={ind} id="roomType-simple-select-label" className={classes.myRowInput}>
                <Checkbox
                    size="small"
                    color="primary"
                    name={cur}
                    value={cur}
                    onChange={(e) => handleDaySelect(e)}
                />
                {cur}
            </InputLabel>

        )
    })

    //CheckBox on change
    const handleDaySelect = (event) => {
        let check = event.target.checked;
        let checked_day = event.target.value;

        if (check) {
            setWdays([...wdays, checked_day]);
            setdayCount(wdays.length + 1);
        } else {
            var index = wdays.indexOf(checked_day);
            if (index > -1) {
                wdays.splice(index, 1);
                setWdays([...wdays]);
                setdayCount(wdays.length);
            }
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
                <DialogTitle id="form-dialog-title">Add Schedule</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <DialogContentText>
                            Add a Schedule
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="capacity"
                            label="Number of Working days"
                            type="text"
                            name="dayCount"
                            value={dayCount}
                            disabled={true}
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
                                    value={hrs}
                                    className={classes.myRowInput}
                                    onChange={(e) => setHrs(e.target.value)}
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
                                    value={mins}
                                    className={classes.myRowInput}
                                    defaultValue="00"
                                    onChange={(e) => setMins(e.target.value)}
                                >
                                    <MenuItem value={0}>00</MenuItem>
                                    <MenuItem value={10}>10</MenuItem>
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
                                value={duration}
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
                        onClick={handleAddSchedule}
                    >
                        ADD
                    </Button>
                </div>
                <div className={classes.myAlert}>
                    <Alert severity={scheduleAddSuccess.type}>
                        {scheduleAddSuccess.msg}
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
