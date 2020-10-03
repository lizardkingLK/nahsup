import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, IconButton, Card, TextField, Select, MenuItem,
    InputLabel, Checkbox
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

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

export default function AddSchedule({ scheduleUpdated }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [dayCount, setdayCount] = React.useState(0);
    const [wdays, setWdays] = React.useState([]);
    const [duration, setDuration] = React.useState('One Hour');
    const [scheduleAddSuccess, setScheduleAddSuccess] = React.useState({ type: 'info', msg: 'Enter Relavant Details.' });
    const [dayArr, setDayArr] = React.useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
    const [stime, setStime] = React.useState(new Date());
    const [wtime, setWtime] = React.useState("2018-01-01T18:30:00.000Z");
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setScheduleAddSuccess({ type: 'info', msg: 'Enter Relavant Details' });
    };

    //Onclick add
    const handleAddSchedule = async () => {
        var workHrs = new Date(wtime).getHours();
        var workMins = new Date(wtime).getMinutes();
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
        else if (workHrs >= 14)
            setScheduleAddSuccess({ type: 'warning', msg: 'Working time must be less than 14:00 Hrs' });
        else if (workHrs === 0 && workMins === 0)
            setScheduleAddSuccess({ type: 'warning', msg: 'Please select Working time' });
        else if (workHrs < 2)
            setScheduleAddSuccess({ type: 'warning', msg: 'Working time is too small' });
        else {
            //Save to database
            ipcRenderer.send(channels.ADD_SCHEDULE, { dayCount, workingDays, stime, duration, wtime });
            await ipcRenderer.on(channels.ADD_SCHEDULE, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.ADD_SCHEDULE);
                const { success } = arg;
                if (success) {
                    setScheduleAddSuccess({ type: 'success', msg: `Schedule added!` });
                    setdayCount(0);
                    setDuration("One Hour");
                    scheduleUpdated();
                    setWdays([]);
                    setStime("2018-01-01T18:30:00.000Z");
                    setWtime("2018-01-01T18:30:00.000Z");
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
                        <TextField
                            margin="dense"
                            id="capacity"
                            label="Number of Working days(Selected Automatically)"
                            type="text"
                            name="dayCount"
                            value={dayCount}
                            disabled={true}
                            onChange={(e) => setdayCount(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <div className={classes.myInput}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    label="Start Time"
                                    placeholder="08:00 AM"
                                    mask="__:__ _M"
                                    value={stime}
                                    onChange={date => setStime(date)}
                                    fullWidth

                                />

                            </MuiPickersUtilsProvider>
                        </div>
                        <div className={classes.myInput}>
                            <InputLabel id="building-simple-select-label">
                                <Typography variant="caption" component="h6">
                                    Working time per day(With Lunch)
                                </Typography>
                            </InputLabel>

                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardTimePicker
                                    ampm={false}
                                    placeholder="00:00"
                                    format="HH:mm"
                                    mask="__:__"
                                    openTo={"hours"}
                                    value={wtime}
                                    onChange={date => setWtime(date)}
                                    fullWidth
                                />
                            </MuiPickersUtilsProvider>

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
                                fullWidth
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
                <Button
                    size="small"
                    variant="outlined"
                    onClick={handleAddSchedule}
                >
                    ADD
                </Button>
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
