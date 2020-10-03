import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    labeledButton: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}))

export default function AdvancedSearch({ buildings, filterChanged }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [building, setBuilding] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const acceptClose = () => {
        setOpen(false);
        if (building.length !== 0)
            filterChanged(building)
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="contained"
                size="small"
                color="primary"
                className={classes.labeledButton}
                startIcon={<SearchIcon />}
                onClick={handleOpen}
            >
                Advanced
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Advanced Search</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Select Building ID (bID) and press Enter...
                    </DialogContentText>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="building-simple-select-label">Building</InputLabel>
                        <Select
                            labelId="building-simple-select-label"
                            id="building-simple-select"
                            value={building}
                            onChange={(e) => setBuilding(e.target.value)}
                        >
                            {buildings.map(b => (
                                <MenuItem key={b.id} value={b.bID}>{b.bID}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={acceptClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
