import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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

export default function EditSubject({ selected, subjectsUpdated, subCode, year, sem, name, lecHrs, tuteHrs, labHrs, evalHrs, id }) {
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

    const [subjectEditSuccess, setSubjectEditSuccess] = React.useState({ type: 'info', msg: 'Enter Subject Info.' });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSubjectEditSuccess({ type: 'info', msg: 'Enter Subject Info.' });
    };

    const handleEditSubject = async () => {
        if (subjectCode.length === 0)
            setSubjectEditSuccess({ type: 'warning', msg: 'SubjectCode not entered' });
        else if (subYear.length === 0)
            setSubjectEditSuccess({ type: 'warning', msg: 'subYear not entered' });
        else if (subSem.length === 0)
            setSubjectEditSuccess({ type: 'warning', msg: 'subSem not entered' });
        else if (subName.length === 0)
            setSubjectEditSuccess({ type: 'warning', msg: 'subName not entered' });
        else if (subLecHrs === 0)
            setSubjectEditSuccess({ type: 'warning', msg: 'subLecHrs not entered' });
        else if (subTuteHrs === 0)
            setSubjectEditSuccess({ type: 'warning', msg: 'subTuteHrs not entered' });
        else if (subLabHrs === 0)
            setSubjectEditSuccess({ type: 'warning', msg: 'subLabHrs not entered' });
        else if (subEvalHrs === 0)
            setSubjectEditSuccess({ type: 'warning', msg: 'subEvalHrs not entered' });
        else {
            ipcRenderer.send(channels.EDIT_SUBJECT, {
                subjectCode, subYear, subSem, subName, subLecHrs, subTuteHrs, subLabHrs, subEvalHrs, id
            });
            await ipcRenderer.on(channels.EDIT_SUBJECT, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.EDIT_SUBJECT);
                const { success } = arg;
                if (success) {
                    setSubjectEditSuccess({ type: 'success', msg: 'Subject edited.' });
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
                    setSubjectEditSuccess({ type: 'error', msg: 'Subject not editted' });
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
                <DialogTitle id="form-dialog-title">Edit Subject</DialogTitle>
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
                                <Typography variant="caption" component="h3">{subCode}</Typography>
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
                                <Typography variant="caption" component="h3">{year}</Typography>
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
                            <Typography variant="caption" component="h3">{sem}</Typography>
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
                        <Typography variant="caption" component="h3">{name}</Typography>
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
                        <Typography variant="caption" component="h3">{lecHrs}</Typography>
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
                        <Typography variant="caption" component="h3">{tuteHrs}</Typography>
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
                        <Typography variant="caption" component="h3">{labHrs}</Typography>
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
                        <Typography variant="caption" component="h3">{evalHrs}</Typography>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleEditSubject}
                        >
                            EDIT
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={subjectEditSuccess.type}>
                                {subjectEditSuccess.msg}
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
