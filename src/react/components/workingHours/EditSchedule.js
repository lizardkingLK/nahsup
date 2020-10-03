import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, IconButton, Card, TextField, Select, MenuItem,
    InputLabel, Checkbox
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
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

export default function EditSchedule({ selected, scheduleUpdated, setSelected, _id, dayCount, workingDays, stime, duration, wtime }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [wdays, setWdays] = React.useState([]);
    const [edayCount, setdayCount] = React.useState('');
    const [eduration, setDuration] = React.useState('');
    const [scheduleEditSuccess, setScheduleEditSuccess] = React.useState({ type: 'info', msg: 'Enter Schedule Info.' });
    const dayArr = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const [estime, setStime] = React.useState(new Date());
    const [ewtime, setWtime] = React.useState(new Date());

    const handleClickOpen = () => {
        setOpen(true);
        handleWorkingDays();
        setStime(stime);
        setWtime(wtime);
        setdayCount(dayCount);
        setDuration(duration);
    };

    const handleClose = () => {
        setOpen(false);
        setScheduleEditSuccess({ type: 'info', msg: 'Enter Schedule Info.' });
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
        var workHrs = new Date(ewtime).getHours();
        var workMins = new Date(ewtime).getMinutes();
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
        if (edayCount === 0)
            setScheduleEditSuccess({ type: 'warning', msg: 'Please select at least one working day!' });
        else if (workHrs >= 14)
            setScheduleEditSuccess({ type: 'warning', msg: 'Working time must be less than 14:00 Hrs' });
        else if (workHrs === 0 && workMins === 0)
            setScheduleEditSuccess({ type: 'warning', msg: 'Please select Working time' });
        else if (workHrs < 2)
            setScheduleEditSuccess({ type: 'warning', msg: 'Working time is too small' });
        else {
            //Save to database
            ipcRenderer.send(channels.EDIT_SCHEDULE, { _id, edayCount, eworkingDays, estime, eduration, ewtime });
            scheduleUpdated();
            await ipcRenderer.on(channels.EDIT_SCHEDULE, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.EDIT_SCHEDULE);
                const { success } = arg;
                if (success) {
                    setScheduleEditSuccess({ type: 'success', msg: 'Schedule edited.' });
                    setdayCount(0);
                    setDuration("One Hour");
                    setStime("2018-01-01T18:30:00.000Z");
                    setWtime("2018-01-01T18:30:00.000Z");
                    setSelected('');
                    uncheckCheckBoxes();
                    scheduleUpdated();
                }
                else
                    setScheduleEditSuccess({ type: 'error', msg: 'Schedule not edited' });
            })
        }
    }

    //Uncheck all checkBoxes when edited
    const uncheckCheckBoxes = () => {
        wdays.map((item) => {
            item.check = false;
        })
        setWdays([...wdays]);
    }

    //Handle checkbox selections
    const handleDaySelect = (event, id) => {
        var count = 0;
        wdays.map(item => {
            if (item.id === id) {
                if (item.check === false) {
                    item.check = true;
                } else {
                    item.check = false;
                }
            }
            if (item.check === true) {
                count++;
            }
        })
        setWdays([...wdays]);
        setdayCount(count);
    }

    //CheckBox list render
    let daysOptions = wdays.map((cur) => {
        return (
            <InputLabel key={cur.id} className={classes.myRowInput}>
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

                        <TextField
                            label="Number of Working days(Selected Automatically)"
                            margin="dense"
                            id="capacity"
                            type="text"
                            name="dayCount"
                            disabled={true}
                            value={edayCount}
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
                                    value={estime}
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
                                    value={ewtime}
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
                                value={eduration}
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
                    onClick={handleEditSchedule}
                >
                    Edit
                        </Button>
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
