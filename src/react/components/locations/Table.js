import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

const Posts = ({ locations, loading }) => {
    const classes = useStyles();

    if (loading) {
        return <Typography variant="caption" component="h3" >Loading Table...</Typography>
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="locations table">
                <TableHead>
                    <TableRow>
                        <TableCell>Building ID</TableCell>
                        <TableCell align="right">Room ID</TableCell>
                        <TableCell align="right">Capacity</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {locations.map((row) => (
                        <TableRow key={row.rID}>
                            <TableCell component="th" scope="row">
                                {row.rID}
                            </TableCell>
                            <TableCell align="right">{row.bID}</TableCell>
                            <TableCell align="right">{row.capacity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Posts;
