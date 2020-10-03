import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, List, Grid, ListItem
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

const Posts = ({ loading, handleRadioChange }) => {
    const classes = useStyles();

    if (loading) {
        return <Typography variant="caption" component="h3" >Loading Table...</Typography>
    }

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="sessions table">
                <TableHead>
                    <TableRow>
                        <TableCell>Consecutive Sessions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                        <TableCell component="th" scope="row">
                            <Grid item xs={12} md={6}>
                                <div className={classes.demo}>
                                    <List >
                                        <ListItem>
                                            Con Sessions
                                            </ListItem>
                                    </List>
                                </div>
                            </Grid>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Posts;
