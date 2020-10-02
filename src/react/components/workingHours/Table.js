import React,{ forwardRef, useImperativeHandle } from 'react';
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

const SchedulesTable =forwardRef(({ schedules, loading, handleRadioChange },ref) => {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState('');

    useImperativeHandle(
        ref,
        () => ({
            resetSelected() {
                setSelectedValue('');
            }
        }),
    )   
    
    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        handleRadioChange(e.target.value);
    }
   
    if (loading) {
        
        return <Typography variant="caption" component="h3" >Loading Table...</Typography>
    }

    const getHrs = (date) => {
        var res = new Date(date).getHours();
        return res;
    }
    const getMins = (mins) => {
        var res = new Date(mins).getMinutes();
        return res;
    }
    const getTime = (time) => {
        var hours = new Date(time).getHours();
        var minutes = new Date(time).getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="locations table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell align="center">Working Day<br></br> Count</TableCell>
                        <TableCell align="center">Working Days</TableCell>
                        <TableCell align="center">Starting<br></br> Time</TableCell>
                        <TableCell align="center">Working <br></br>Time</TableCell>
                        <TableCell align="center">Time Slot<br></br> Duration</TableCell>
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
                            <TableCell align="center">{getTime(row.stime)}</TableCell>
                            <TableCell align="center">{getHrs(row.wtime)}:{getMins(row.wtime)}  Hrs</TableCell>
                            <TableCell align="center">{row.duration}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
})

export default SchedulesTable;
