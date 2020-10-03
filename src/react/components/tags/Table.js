import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Radio
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

const TagsTable = ({ tags, loading, handleRadioChange }) => {
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
            <Table className={classes.table} aria-label="tags table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Tag Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tags.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                <Radio
                                    checked={selectedValue === row.id}
                                    onChange={handleChange}
                                    value={row.id}
                                    color="primary"
                                    name="radio-button-student"
                                    inputProps={{ 'aria-label': row.id }}
                                />
                                {row.tname}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default TagsTable;
