import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio, Typography
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

const Posts = ({ lecturers, loading, handleRadioChange }) => {
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
            <Table className={classes.table} aria-label="lecturers table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Employee ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Faculty</TableCell>
                        <TableCell align="right">Department</TableCell>
                        <TableCell align="right">Center</TableCell>
                        <TableCell align="right">Building</TableCell>
                        <TableCell align="right">Level</TableCell>
                        <TableCell align="right">Rank</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {lecturers.map((row) => (
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
                                {row.eId}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.faculty}</TableCell>
                            <TableCell align="right">{row.dep}</TableCell>
                            <TableCell align="right">{row.center}</TableCell>
                            <TableCell align="right">{row.building}</TableCell>
                            <TableCell align="right">{row.level}</TableCell>
                            <TableCell align="right">{row.rank}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Posts;
