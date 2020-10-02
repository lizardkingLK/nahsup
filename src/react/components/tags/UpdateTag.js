import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
import EditIcon from '@material-ui/icons/Edit';

import { channels } from '../../../shared/constants';
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
        paddingRight: theme.spacing(1),
    },
    myRowInput: {
        width: 100
    },
    myAlert: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}))

export default function EditTag({ selected, tagsUpdated, name, lid }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [tagName, setTagName] = React.useState('');
    const [tagEditSuccess, setTagEditSuccess] = React.useState({ type: 'info', msg: 'Enter Tag Info.' });

    /*const setTag = () => {
        console.log("Accessed setTag");
        setTagName(selected);
    };*/

    const handleClickOpen = () => {
        console.log("accessed func")
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTagEditSuccess({ type: 'info', msg: 'Enter Tag Info.' });
    };

    const handleEditTag = async () => {
        if (tagName.length === 0)
            setTagEditSuccess({ type: 'warning', msg: 'Name not entered' });
        else {
            ipcRenderer.send(channels.EDIT_TAG, { tagName, lid });
            await ipcRenderer.on(channels.EDIT_TAG, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.EDIT_TAG);
                const { success } = arg;
                if (success) {
                    setTagEditSuccess({ type: 'success', msg: 'Tag Updated.' });
                    setTagName('');
                    setTagEditSuccess({ type: 'success', msg: 'Tag editted Successfully!' })

                    tagsUpdated();
                }
                else
                    setTagEditSuccess({ type: 'error', msg: 'Tag not Updated' });
            })
        }
    }

    return (
        <div>
            <IconButton
                size="medium"
                color="primary"
                component="span"
                disabled={selected === ''}
                onClick={handleClickOpen}
            >
                <EditIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Tag</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <div className={classes.myRowInputs}>
                            <div className={classes.myRowInput}>
                                <TextField
                                    margin="dense"
                                    id="tagName"
                                    label="Name"
                                    type="text"
                                    value={tagName}
                                    onChange={(e) => setTagName(e.target.value)}
                                />
                                <Typography variant="caption" component="h3">{name}</Typography>
                            </div>
                        </div>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleEditTag}
                        >
                            Update
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={tagEditSuccess.type}>
                                {tagEditSuccess.msg}
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
