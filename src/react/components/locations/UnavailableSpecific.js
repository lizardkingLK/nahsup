import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete, Alert } from '@material-ui/lab';
import {
    Button, Typography, TextField, Card, Select, MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: theme.spacing(1),
    },
    column: {
        margin: theme.spacing(1),
    },
    columnContent: {
        margin: theme.spacing(2),
    },
    columnContentReversed: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: theme.spacing(2),
    },
    table: {
        marginTop: theme.spacing(2),
        minWidth: 650,
    },
}))

export default function UnavailableSpecific({
    locations, setRoom, unavailableDay, setUnavailableDay, unavailableTimeF, setUnavailableTimeF,
    unavailableTimeT, setUnavailableTimeT, addSuccess, handleSubmit
}) {
    const classes = useStyles();

    const customLocations = locations.map((l) => {
        const firstLetter = l.bID[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...l,
        };
    });

    let hrs = [];
    for (let i = 0; i < 24; i++)
        for (let j = 0; j < 2; j++)
            if (j === 0)
                i < 10 ? hrs.push(`0${i}:00`) : hrs.push(`${i}:00`)
            else
                i < 10 ? hrs.push(`0${i}:30`) : hrs.push(`${i}:30`)

    return (
        <Card className={classes.column} variant="outlined">
            <Typography variant="body1" className={classes.columnContent} color="primary">
                Unavailability specific
            </Typography>
            <div className={classes.columnContent}>
                <Typography variant="body2">
                    You can select a room and then add Day & Time of Unavailability.
                </Typography>
            </div>
            <div className={classes.columnContent}>
                <Autocomplete
                    id="grouped-locations"
                    options={customLocations.sort((a, b) => -b.bID.localeCompare(a.firstLetter))}
                    groupBy={(l) => l.bID}
                    getOptionLabel={(l) => `${l.rID} - ${l.rType}`}
                    onChange={(e, newValue) => setRoom(newValue.rID)}
                    style={{ width: 300 }}
                    size="small"
                    disableClearable
                    renderInput={(params) => <TextField {...params} label="Select Room..." />}
                />
            </div>
            <div className={classes.columnContent}>
                <Typography variant="body2">
                    Select Unavailable Day
                </Typography>
            </div>
            <div className={classes.columnContent}>
                <Select
                    labelId="day-select-label"
                    id="day-select"
                    value={unavailableDay}
                    style={{ width: 300 }}
                    onChange={(e) => setUnavailableDay(e.target.value)}
                >
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                        <MenuItem key={i} value={d}>{d}</MenuItem>
                    ))}
                </Select>
            </div>
            <div className={classes.columnContent}>
                <Typography variant="body2">
                    Select Unavailable Time - From
                </Typography>
            </div>
            <div className={classes.columnContent}>
                <Select
                    labelId="time-select-from-label"
                    id="time-select-from"
                    value={unavailableTimeF}
                    style={{ width: 300 }}
                    onChange={(e) => setUnavailableTimeF(e.target.value)}
                >
                    {hrs.map((t, i) => (
                        <MenuItem key={i} value={t}>{t}</MenuItem>
                    ))}
                </Select>
            </div>
            <div className={classes.columnContent}>
                <Typography variant="body2">
                    Select Unavailable Time - To
                </Typography>
            </div>
            <div className={classes.columnContent}>
                <Select
                    labelId="time-select-to-label"
                    id="time-select-to"
                    value={unavailableTimeT}
                    style={{ width: 300 }}
                    onChange={(e) => setUnavailableTimeT(e.target.value)}
                >
                    {hrs.map((t, i) => (
                        <MenuItem key={i} value={t}>{t}</MenuItem>
                    ))}
                </Select>
            </div>
            <div className={classes.columnContent}>
                <Alert severity={addSuccess.type}>
                    {addSuccess.msg}
                </Alert>
            </div>
            <div className={classes.columnContentReversed}>
                <Button onClick={(e) => handleSubmit(e, 'UNAVAILABILITIES')} color="primary">
                    DONE
                </Button>
            </div>
        </Card>
    )
}
