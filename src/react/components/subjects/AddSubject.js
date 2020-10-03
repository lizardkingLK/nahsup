import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Dialog, DialogActions, DialogContent, DialogTitle, Typography, Button, IconButton, Card, TextField, Select, MenuItem, InputLabel
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

export default function AddSubject({ subjectsUpdated }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [subjectCode, setSubjectCode] = React.useState('');
    const [subYear, setSubYear] = React.useState('');
    const [subSem, setSubSem] = React.useState('');
    const [subName, setSubName] = React.useState('');
    const [subLecHrs, setSubLecHrs] = React.useState(0);
    const [subTuteHrs, setSubTuteHrs] = React.useState(0);
    const [subLabHrs, setSubLabHrs] = React.useState(0);
    const [subEvalHrs, setSubEvalHrs] = React.useState(0);

    const [subjectAddSuccess, setSubjectAddSuccess] = React.useState({ type: 'info', msg: 'Enter Subject Info.' });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSubjectAddSuccess({ type: 'info', msg: 'Enter Subject Info.' });
    };

    const handleAddSubject = async () => {
        if (subjectCode.length === 0)
            setSubjectAddSuccess({ type: 'warning', msg: 'SubjectCode not entered' });
        else if (subYear.length === 0)
            setSubjectAddSuccess({ type: 'warning', msg: 'subYear not entered' });
        else if (subSem.length === 0)
            setSubjectAddSuccess({ type: 'warning', msg: 'subSem not entered' });
        else if (subName.length === 0)
            setSubjectAddSuccess({ type: 'warning', msg: 'subName not entered' });
        else if (subLecHrs === 0)
            setSubjectAddSuccess({ type: 'warning', msg: 'subLecHrs not entered' });
        else if (subTuteHrs === 0)
            setSubjectAddSuccess({ type: 'warning', msg: 'subTuteHrs not entered' });
        else if (subLabHrs === 0)
            setSubjectAddSuccess({ type: 'warning', msg: 'subLabHrs not entered' });
        else if (subEvalHrs === 0)
            setSubjectAddSuccess({ type: 'warning', msg: 'subEvalHrs not entered' });
        else {
            ipcRenderer.send(channels.ADD_SUBJECT, {
                subjectCode, subYear, subSem, subName, subLecHrs, subTuteHrs, subLabHrs, subEvalHrs
            });
            await ipcRenderer.on(channels.ADD_SUBJECT, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.ADD_SUBJECT);
                const { success } = arg;
                if (success) {
                    setSubjectAddSuccess({ type: 'success', msg: `Subject added: ${subjectCode}` });
                    setSubjectCode('');
                    setSubYear('');
                    setSubSem('');
                    setSubName('');
                    setSubLecHrs(0);
                    setSubTuteHrs(0);
                    setSubLabHrs(0);
                    setSubEvalHrs(0);

                    subjectsUpdated();
                }
                else
                    setSubjectAddSuccess({ type: 'error', msg: 'Subject not added' });
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
                <DialogTitle id="form-dialog-title">Add Subject</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <div className={classes.myRowInputs}>
                            <div className={classes.myRowInput}>
                                <TextField
                                    margin="dense"
                                    id="subCode"
                                    label="SubjectCode"
                                    type="text"
                                    value={subjectCode}
                                    onChange={(e) => setSubjectCode(e.target.value)}
                                />
                            </div>
                            <div className={classes.myRowInput}>
                                <InputLabel id="roomType-simple-select-label" className={classes.myRowInput}>
                                    <Typography variant="caption" component="h6">
                                        Subject Year
                                    </Typography>
                                </InputLabel>
                                <Select
                                    labelId="subYear-simple-select-label"
                                    id="subYear-simple-select"
                                    value={subYear}
                                    className={classes.myRowInput}
                                    onChange={(e) => setSubYear(e.target.value)}
                                >
                                    <MenuItem value='1'>1</MenuItem>
                                    <MenuItem value='2'>2</MenuItem>
                                    <MenuItem value='3'>3</MenuItem>
                                    <MenuItem value='4'>4</MenuItem>
                                </Select>
                            </div>
                        </div>
                        <div className={classes.myInput}>
                            <InputLabel id="semester-simple-select-label">
                                <Typography variant="caption" component="h6">
                                    Semester
                                </Typography>
                            </InputLabel>
                            <Select
                                labelId="semester-simple-select-label"
                                id="semester-simple-select"
                                className={classes.myInput}
                                value={subSem}
                                onChange={(e) => setSubSem(e.target.value)}
                            >
                                <MenuItem value='1'>1</MenuItem>
                                <MenuItem value='2'>2</MenuItem>
                            </Select>
                        </div>
                        <TextField
                            margin="dense"
                            id="name"
                            label="Subject Name"
                            type="text"
                            value={subName}
                            onChange={(e) => setSubName(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="lecHrs"
                            label="Lecture Hrs"
                            type="text"
                            value={subLecHrs}
                            onChange={(e) => setSubLecHrs(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="tuteHrs"
                            label="Tute Hrs"
                            type="text"
                            value={subTuteHrs}
                            onChange={(e) => setSubTuteHrs(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="labHrs"
                            label="Lab Hrs"
                            type="text"
                            value={subLabHrs}
                            onChange={(e) => setSubLabHrs(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="evalHrs"
                            label="Eval Hrs"
                            type="text"
                            value={subEvalHrs}
                            onChange={(e) => setSubEvalHrs(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleAddSubject}
                        >
                            ADD
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={subjectAddSuccess.type}>
                                {subjectAddSuccess.msg}
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
