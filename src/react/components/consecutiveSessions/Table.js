import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, List, Grid, ListItem, Radio
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
}))

const Posts = ({ loading, setLoading, currentSessions, sessions, handleRadioChange }) => {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        handleRadioChange(e.target.value);
    }

    if (loading) {
        return <Typography variant="caption" component="h3" >Loading Table...</Typography>
    }

    const getSession = (id) => {
        return sessions.filter(s => s.id === id)[0]
    }

    console.log(currentSessions);


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="sessions table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell component="th">Updated On</TableCell>
                        <TableCell component="th">Session 1</TableCell>
                        <TableCell component="th">Session 2</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {currentSessions.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                <Radio
                                    checked={selectedValue === row.id}
                                    onChange={handleChange}
                                    value={row.id}
                                    color="primary"
                                    name="radio-button-location"
                                    inputProps={{ 'aria-label': row.id }}
                                />

                                {new Date(row.lastUpdated).toLocaleString()}
                            </TableCell>
                            {row.sessions.map(s => {
                                let se = getSession(s)
                                return se !== null ? (
                                    <TableCell key={se.id} component="th" scope="row">
                                        {(se.lecName).map(ln => (ln + ", ")
                                        )}<br />
                                        {se.subName} ({se.subCode})<br />
                                        {se.tag}<br />
                                        {se.groupIdSub}<br />
                                        {se.studentCount} ({se.Duration})
                                    </TableCell>
                                ) : (
                                        <TableCell key={s} component="th" scope="row">
                                            {s}
                                        </TableCell>
                                    )
                            })}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Posts;
