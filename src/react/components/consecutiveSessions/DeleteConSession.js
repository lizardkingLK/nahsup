import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';

import { channels } from '../../../shared/constants';
const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
    myAlert: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}))

export default function DeleteConSession({ selected, setSelected, sessionsUpdated }) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState({
        state: false, type: 'warning', msg: 'Do you want to delete this Session?'
    });

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
        setDeleteSuccess({
            state: false, type: 'warning', msg: 'Do you want to delete this Session?'
        });
    };

    const acceptClose = async () => {
        await ipcRenderer.send(channels.DELETE_CONSECUTIVE, { selected });
        ipcRenderer.on(channels.DELETE_CONSECUTIVE, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.DELETE_CONSECUTIVE);
            const { success } = arg;
            if (success) {
                setDeleteSuccess({
                    state: true, type: 'success', msg: 'Consecutive Session Deleted Successfully!'
                });
                sessionsUpdated();
            }
            else
                setDeleteSuccess({
                    state: false, type: 'error', msg: 'Consecutive Session Not Deleted.'
                });
        });
    };

    return (
        <div>
            <IconButton
                size="medium"
                color="primary"
                component="span"
                disabled={selected === ''}
                onClick={handleClickOpen}
            >
                <DeleteIcon />
            </IconButton>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="delete-dialog-title"
                aria-describedby="delete-dialog-description"
            >
                <DialogTitle id="delete-dialog-title">Delete Con Session</DialogTitle>
                <DialogContent>
                    <div className={classes.myAlert}>
                        <Alert severity={deleteSuccess.type}>
                            {deleteSuccess.msg}
                        </Alert>
                    </div>
                </DialogContent>
                <DialogActions>
                    {!deleteSuccess.state
                        ?
                        <>
                            <Button color="primary" onClick={acceptClose}>
                                Yes
                            </Button>
                            <Button onClick={handleClose} color="primary" autoFocus>
                                No
                            </Button>
                        </>
                        :
                        <>
                            <Button onClick={handleClose} color="primary">
                                Close
                            </Button>
                        </>
                    }
                </DialogActions>
            </Dialog>
        </div>
    );
}
