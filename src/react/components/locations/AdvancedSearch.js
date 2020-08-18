import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';

const useStyles = makeStyles((theme) => ({
    labeledButton: {
        margin: theme.spacing(1),
    },
}))

export default function AdvancedSearch({ filterChanged }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [buildings, setBuildings] = useState([]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        filterChanged(e.target.innerHTML);
    }

    useEffect(() => {
        const fetchBuildings = () => {
            // const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setBuildings([
                'A-Block',
                'B-Block',
                'New Building',
            ]);
        }

        fetchBuildings();
    }, []);

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
                    <Autocomplete
                        id="combo-box-locations"
                        size="small"
                        options={buildings}
                        getOptionLabel={option => option}
                        style={{ width: 300 }}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} label="Select Building" variant="outlined" />}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
