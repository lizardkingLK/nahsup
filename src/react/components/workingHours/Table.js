import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';

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

const SchedulesTable = ({ schedules, loading, handleRadioChange }) => {
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
            <Table className={classes.table} aria-label="locations table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">Working Day Count</TableCell>
                        <TableCell align="center">Working Days</TableCell>
                        <TableCell align="center">Working Time</TableCell>
                        <TableCell align="center">Time Slot Duration</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schedules.map(row => (
                        <TableRow key={row._id}>
                            <TableCell component="th" scope="row">
                                <Radio
                                    checked={selectedValue === row._id}
                                    onChange={handleChange}
                                    value={row._id}
                                    color="primary"
                                    name="radio-button-location"
                                    inputProps={{ 'aria-label': row._id }}
                                />
                            </TableCell>
                            <TableCell align="center">{row.dayCount}</TableCell>
                            <TableCell align="center">{row.workingDays}</TableCell>
                            <TableCell align="center">{row.hrs} : {row.mins} Hrs</TableCell>
                            <TableCell align="center">{row.duration}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SchedulesTable;
