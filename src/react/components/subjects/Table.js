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

const SubjectsTable = ({ subjects, loading, handleRadioChange }) => {
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
            <Table className={classes.table} aria-label="subjects table">
                <TableHead>
                    <TableRow>
                        <TableCell>SubjectCode</TableCell>
                        <TableCell align="right">Year</TableCell>
                        <TableCell align="right">Semester</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">LecHrs</TableCell>
                        <TableCell align="right">TuteHrs</TableCell>
                        <TableCell align="right">LabHrs</TableCell>
                        <TableCell align="right">EvalHrs</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subjects.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                <Radio
                                    checked={selectedValue === row.id}
                                    onChange={handleChange}
                                    value={row.id}
                                    color="primary"
                                    name="radio-button-subject"
                                    inputProps={{ 'aria-label': row.id }}
                                />
                                {row.subCode}
                            </TableCell>
                            <TableCell align="right">{row.year}</TableCell>
                            <TableCell align="right">{row.sem}</TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.lecHrs}</TableCell>
                            <TableCell align="right">{row.tuteHrs}</TableCell>
                            <TableCell align="right">{row.labHrs}</TableCell>
                            <TableCell align="right">{row.evalHrs}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default SubjectsTable;
