import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';

import { channels } from '../../../shared/constants';
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import TableContainer from "@material-ui/core/TableContainer";
const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        margin: theme.spacing(1),
    },
    sides: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        minWidth: 240,
    },
    myInput: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        minWidth: 200,
    },
    myRowInputs: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    myRowInput: {
        width: 100
    },
    myAlert: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
}))

export default function AddConSession() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [ConSessionAddSuccess, setConSessionAddSuccess] = React.useState({ type: 'info', msg: 'Enter Session Info' });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setConSessionAddSuccess({ type: 'info', msg: 'Enter Consecutive Session Info' });
    };

    return (
        <div>
            <IconButton
                size="medium"
                color="primary"
                component="span"
                onClick={handleClickOpen}
            >
                <AddIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Consecutive Session</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <TableContainer component={Paper}>
                            <Table className={classes.table} aria-label="sessions table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Lecturers</TableCell>
                                        <TableCell align="left">Subject</TableCell>
                                        <TableCell align="left">Subject Code</TableCell>
                                        <TableCell align="left">Tag</TableCell>
                                        <TableCell align="left">Group Id / Sub Group Id</TableCell>
                                        <TableCell align="left">Student Count</TableCell>
                                        <TableCell align="left">Duration</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow >
                                            <TableCell>Lecturers</TableCell>
                                            <TableCell align="right">Subject</TableCell>
                                            <TableCell align="right">Subject Code</TableCell>
                                            <TableCell align="right">Tag</TableCell>
                                            <TableCell align="right">Group Id / Sub Group Id</TableCell>
                                            <TableCell align="right">Student Count</TableCell>
                                            <TableCell align="right">Duration</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Button
                            size="small"
                            variant="outlined"
                        >
                            ADD
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={ConSessionAddSuccess.type}>
                                {ConSessionAddSuccess.msg}
                            </Alert>
                        </div>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
