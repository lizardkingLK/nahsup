import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Autocomplete, Alert } from '@material-ui/lab';
import {
    Button, Typography, TextField, Select, MenuItem,
    Card,
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

export default function TagsSpecific({ locations, tags, tag, setTag, setRoom, addSuccess, handleSubmit }) {
    const classes = useStyles();

    const customLocations = locations.map((l) => {
        const firstLetter = l.bID[0].toUpperCase();
        return {
            firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
            ...l,
        };
    });

    return (
        <Card className={classes.column} variant="outlined">
            <Typography variant="body1" className={classes.columnContent} color="primary">
                Tags specific
            </Typography>
            <div className={classes.columnContent}>
                <Typography variant="body2">
                    You can select a room and then add tag to it.
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
                    Select Tag
                </Typography>
            </div>
            <div className={classes.columnContent}>
                <Select
                    labelId="tag-select-label"
                    id="tag-select"
                    value={tag}
                    style={{ width: 300 }}
                    onChange={(e) => setTag(e.target.value)}
                >
                    {tags.map(t => (
                        <MenuItem key={t.name} value={t.name}>{t.name}</MenuItem>
                    ))}
                </Select>
            </div>
            <div className={classes.columnContent}>
                <Alert severity={addSuccess.type}>
                    {addSuccess.msg}
                </Alert>
            </div>
            <div className={classes.columnContentReversed}>
                <Button onClick={(e) => handleSubmit(e, 'TAGS')} color="primary">
                    DONE
                </Button>
            </div>
        </Card>
    )
}
