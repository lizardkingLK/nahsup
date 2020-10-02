import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, List, ListItem
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

const Posts = ({ subGroupIds }) => {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="sessions table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>SubGroupId</TableCell>
                        <TableCell align="right">Unavailable Time Slot</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subGroupIds.map(row => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                <Grid item xs={12} md={6}>
                                    <div className={classes.demo}>
                                        <List>
                                            <ListItem>
                                                {row.subGroupId}
                                            </ListItem>
                                        </List>
                                    </div>
                                </Grid>
                            </TableCell>
                            <TableCell align="right">
                                {`${row.unavailableHours?.day} ${row.unavailableHours?.from} - ${row.unavailableHours?.to}`}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Posts;
