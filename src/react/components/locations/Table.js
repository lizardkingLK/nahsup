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
        height: 340
    },
}))

const LocationsTable = ({ locations, loading, handleRadioChange }) => {
    const classes = useStyles();
    const [selectedValue, setSelectedValue] = React.useState('');

    const handleChange = (e) => {
        setSelectedValue(e.target.value);
        handleRadioChange(e.target.value);
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="locations table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Room ID</TableCell>
                        <TableCell align="right">Room Type</TableCell>
                        <TableCell align="right">Building ID</TableCell>
                        <TableCell align="right">Capacity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {locations.map(row => (
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
                                {row.rID}
                            </TableCell>
                            <TableCell align="right">{row.rType}</TableCell>
                            <TableCell align="right">{row.bID}</TableCell>
                            <TableCell align="right">{row.capacity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default LocationsTable;
