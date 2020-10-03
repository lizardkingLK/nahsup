import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, IconButton, Card, TextField
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';

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

export default function AddTag({ tagsUpdated }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [tagName, setTagName] = React.useState([]);
    const [tagAddSuccess, setTagAddSuccess] = React.useState({ type: 'info', msg: 'Enter Tag Details' })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAddTag = async () => {
        if (tagName.length === 0)
            setTagAddSuccess({ type: 'warning', msg: 'Tag Name not entered' });
        else {
            ipcRenderer.send(channels.ADD_TAG, { tagName });
            await ipcRenderer.on(channels.ADD_TAG, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.ADD_TAG);
                const { success } = arg;
                if (success) {
                    setTagAddSuccess({ type: 'success', msg: `Tag added: ${tagName}` });
                    setTagName('');
                    setTagAddSuccess({ type: 'success', msg: 'Tag added Successfully!' })

                    tagsUpdated();
                }
                else
                    setTagAddSuccess({ type: 'error', msg: 'Tag not added' });
            })
        }
    }

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
                <DialogTitle id="form-dialog-title">Add Tag</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <DialogContentText>
                            Add Tag
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="tagName"
                            label="Tag Name"
                            type="text"
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleAddTag}
                        >
                            ADD
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={tagAddSuccess.type}>
                                {tagAddSuccess.msg}
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