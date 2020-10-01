import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
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

export default function DeleteLecturer({ selected, lecturersUpdated }) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState({
        state: false, type: 'warning', msg: 'Do you want to delete this Lecturer?'
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const acceptClose = async () => {
        await ipcRenderer.send(channels.DELETE_LECTURERS, { selected });
        ipcRenderer.on(channels.DELETE_LECTURERS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.DELETE_LECTURERS);
            const { success } = arg;
            if (success)
                setDeleteSuccess({ state: true, type: 'success', msg: 'Lecturer Deleted Successfully!' });
            else
                setDeleteSuccess({ state: false, type: 'error', msg: 'Lecturer Not Deleted.' });
        });
    };

    const handleClose = () => {
        setOpen(false);
        setDeleteSuccess({
            state: false, type: 'warning', msg: 'Do you want to delete this Lecturer?'
        });
        lecturersUpdated();
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
                <DialogTitle id="delete-dialog-title">Delete Location</DialogTitle>
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
