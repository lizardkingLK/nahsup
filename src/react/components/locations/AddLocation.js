import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';

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
}))

export default function FormDialog() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [buildingID, setBuildingID] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setBuildingID(event.target.value);
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
                <DialogTitle id="form-dialog-title">Add Location</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <DialogContentText>
                            Add Building
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="buildingID"
                            label="Building ID"
                            type="text"
                            className={classes.myInput}
                            fullWidth
                        />
                        <Button
                            size="small"
                            variant="outlined"
                        >
                            ADD
                        </Button>
                    </Card>
                    <Card className={classes.sides} variant="outlined">
                        <DialogContentText>
                            Add Room
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="roomID"
                            label="Room ID"
                            type="text"
                            className={classes.myInput}
                            fullWidth
                        />
                        <InputLabel id="building-simple-select-label">
                            <Typography variant="caption" component="h6">
                                Building ID
                            </Typography>
                        </InputLabel>
                        <Select
                            labelId="building-simple-select-label"
                            id="building-simple-select"
                            value={buildingID}
                            className={classes.myInput}
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                        <TextField
                            margin="dense"
                            id="capacity"
                            label="Capacity"
                            type="text"
                            className={classes.myInput}
                            fullWidth
                        />
                        <Button
                            size="small"
                            variant="outlined"
                        >
                            ADD
                        </Button>
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
