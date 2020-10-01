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

const Posts = ({ loading, handleRadioChange }) => {
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
            <Table className={classes.table} aria-label="lecturers table">
                <TableHead>
                    <TableRow>
                        <TableCell>Lecturer</TableCell>
                        <TableCell align="right">Unavailable Time Slot</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                        <TableRow>
                            <TableCell >kasun</TableCell>
                            <TableCell align="right">3-5</TableCell>
                        </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Posts;
