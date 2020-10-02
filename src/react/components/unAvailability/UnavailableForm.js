import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, Select, MenuItem,
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
        minWidth: 600
    },
    columnContent: {
        margin: theme.spacing(2),
    },
}))

export default function UnavailableForm({
    unavailableDay, setUnavailableDay, unavailableTimeF, setUnavailableTimeF, unavailableTimeT, setUnavailableTimeT
}) {
    const classes = useStyles();

    let hrs = [];
    for (let i = 0; i < 24; i++)
        for (let j = 0; j < 2; j++)
            if (j === 0)
                i < 10 ? hrs.push(`0${i}:00`) : hrs.push(`${i}:00`)
            else
                i < 10 ? hrs.push(`0${i}:30`) : hrs.push(`${i}:30`)

    return (
        <div>
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
                    {(unavailableTimeF.length !== 0) ?
                        (hrs.splice(hrs.indexOf(unavailableTimeF) + 1)).map((t, i) => (
                            <MenuItem key={i} value={t}>{t}</MenuItem>
                        )) :
                        hrs.map((t, i) => (
                            <MenuItem key={i} value={t}>{t}</MenuItem>
                        ))}
                </Select>
            </div>
        </div>
    )
}
