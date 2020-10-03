import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';

// import { channels } from '../../../shared/constants';
// const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
    myAlert: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}))

export default function DeleteParSession({ selected }) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [deleteSuccess, setDeleteSuccess] = React.useState({
        state: false, type: 'warning', msg: 'Do you want to delete this Parallel Session?'
    });

    const handleClickOpen = () => {
        setOpen(true);
    };


    const handleClose = () => {
        setOpen(false);
        setDeleteSuccess({
            state: false, type: 'warning', msg: 'Do you want to delete this Parallel Session?'
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
                <DialogTitle id="delete-dialog-title">Delete Parallel Session</DialogTitle>
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
                            <Button color="primary" >
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
