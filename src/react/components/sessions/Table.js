import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, Grid, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio
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

const Posts = ({ sessions, loading, handleRadioChange }) => {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        handleRadioChange(e.target.value);
    }

    if (loading) {
        return <Typography variant="caption" component="h3" >Loading Table...</Typography>
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="sessions table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Sessions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sessions.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                <Grid item xs={12} md={6}>
                                    <div className={classes.demo}>
                                        <List >
                                            <ListItem>
                                                <Radio
                                                    checked={selectedValue === row.id}
                                                    onChange={handleChange}
                                                    value={row.id}
                                                    color="primary"
                                                    name="radio-button-location"
                                                    inputProps={{ 'aria-label': row.id }}
                                                />

                                                {(row.lecName).map(ln => (ln + ", ")
                                                )}<br />
                                                {row.subName} ({row.subCode})<br />
                                                {row.tag}<br />
                                                {row.groupIdSub}<br />
                                                {row.studentCount} ({row.Duration})
                                                </ListItem>
                                        </List>
                                    </div>
                                </Grid>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Posts;
