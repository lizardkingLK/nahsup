import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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

export default function AdvancedSearch({ subjects, lecturers, searchFilter }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [subject, setSubject] = React.useState('');
    const [lecturer, setLecturer] = React.useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const acceptClose = () => {
        setOpen(false);
        if (subject.length !== 0 && lecturer.length !== 0)
            searchFilter({ subject, lecturer }, 'both')
        else {
            if (subject.length !== 0)
                searchFilter(subject, 'subject')
            if (lecturer.length !== 0)
                searchFilter(lecturer, 'lecturer')
        }

        setLecturer('')
        setSubject('')
    };

    const handleClose = () => {
        setOpen(false);

        setLecturer('')
        setSubject('')
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
                        Select Subject and press OK...
                    </DialogContentText>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="building-simple-select-label">Subject</InputLabel>
                        <Select
                            labelId="building-simple-select-label"
                            id="building-simple-select"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                        >
                            {subjects.map((s, i, arr) => {
                                return (
                                    <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>
                                )
                            })}
                        </Select>
                    </FormControl>
                </DialogContent>

                <DialogContent>
                    <DialogContentText>
                        Select Lecturer and press OK...
                    </DialogContentText>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="building-simple-select-label">Lecturer</InputLabel>
                        <Select
                            labelId="building-simple-select-label"
                            id="building-simple-select"
                            value={lecturer}
                            onChange={(e) => setLecturer(e.target.value)}
                        >
                            {lecturers.map(s => (
                                <MenuItem key={s.id} value={s.name}>{s.name}</MenuItem>
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
