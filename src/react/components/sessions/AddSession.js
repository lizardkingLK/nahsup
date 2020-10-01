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
import AddIcon from '@material-ui/icons/Add';
import FormControl from '@material-ui/core/FormControl';

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
        paddingLeft: theme.spacing(1),
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

export default function AddSession({ sessionsUpdated, lecturers, subjects, students }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [lecNames, setLecNames] = React.useState([]);

    const [prof, setProf] = React.useState('');
    const [lec, setLec] = React.useState('');
    const [ins, setIns] = React.useState('');

    const [tag, setTag] = React.useState('');
    const [subName, setSubName] = React.useState('');
    const [subCode, setSubCode] = React.useState('');
    const [groupIdSub, setGroupIdSub] = React.useState('');
    const [studentCount, setStudentCount] = React.useState('');
    const [Duration, setDuration] = React.useState('');
    const [sessionAddSuccess, setSessionAddSuccess] = React.useState({ type: 'info', msg: 'Enter Session Info' });

    const lecSel = (e, type) => {
        const val = e.target.value;
        switch (type) {
            case 'prof':
                setProf(val)
                break;
            case 'lec':
                setLec(val)
                break;
            case 'ins':
                setIns(val)
                break;
            default:
                break;
        }

        setLecNames([...lecNames, val]);
        console.log(lecNames)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSessionAddSuccess({ type: 'info', msg: 'Enter Session Info' });
    };

    const handleAddSession = async () => {
        if (lecNames.length === 0)
            setSessionAddSuccess({ type: 'warning', msg: 'Lecturer name not entered' });
        else if (tag.length === 0)
            setSessionAddSuccess({ type: 'warning', msg: 'Tag not entered' });
        else if (subName.length === 0)
            setSessionAddSuccess({ type: 'warning', msg: 'Subject name not entered' });
        else if (subCode.length === 0)
            setSessionAddSuccess({ type: 'warning', msg: 'Subject code not entered' });
        else if (groupIdSub.length === 0)
            setSessionAddSuccess({ type: 'warning', msg: 'Group/Sub Group Id not entered' });
        else if (studentCount.length === 0)
            setSessionAddSuccess({ type: 'warning', msg: 'Student count not entered' });
        else if (Duration.length === 0)
            setSessionAddSuccess({ type: 'warning', msg: 'Duration not entered' });
        else {
            ipcRenderer.send(channels.ADD_SESSION, { lecNames, tag, subName, subCode, groupIdSub, studentCount, Duration });
            await ipcRenderer.on(channels.ADD_SESSION, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.ADD_SESSION);
                const { success } = arg;
                if (success) {
                    setSessionAddSuccess({ type: 'success', msg: `Session added ` });
                    setLecNames([]);
                    setTag('')
                    setSubName('')
                    setSubCode('')
                    setGroupIdSub('')
                    setStudentCount('')
                    setDuration('')
                    setLec('')
                    setProf('')
                    setIns('')

                    sessionsUpdated();
                }
                else
                    setSessionAddSuccess({ type: 'error', msg: 'Session not added' });
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
                <DialogTitle id="form-dialog-title">Add Session</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">

                        <InputLabel id="professor-simple-select-label" fullWidth>
                            <Typography variant="caption" component="h6">
                                Professor/ Assistant Professor
                            </Typography>
                        </InputLabel>
                        <Select
                            labelId="professor-simple-select-label"
                            id="professor-simple-select"
                            value={prof}
                            className={classes.myInput}
                            onChange={(e) => lecSel(e, 'prof')}
                            fullWidth
                        >
                            {(lecturers.filter(l => (l.level === '1' || l.level === '2')).map(p => {
                                return (
                                    <MenuItem key={p._id} value={p.name}>{p.name}</MenuItem>
                                )
                            }))}
                        </Select>

                        <InputLabel id="lecturer-simple-select-label" fullWidth>
                            <Typography variant="caption" component="h6">
                                Senior Lecturer(HG)/ Senior Lecturer/ Lecturer/ Assistant Lecturer
                            </Typography>
                        </InputLabel>
                        <Select
                            labelId="lecturer-simple-select-label"
                            id="lecturer-simple-select"
                            className={classes.myInput}
                            value={lec}
                            onChange={(e) => lecSel(e, 'lec')}
                            fullWidth
                        >
                            {(lecturers.filter(l => (l.level === '4' || l.level === '5' || l.level === '3' || l.level === '6')).map(p => {
                                return (
                                    <MenuItem key={p._id} value={p.name}>{p.name}</MenuItem>
                                )
                            }))}
                        </Select>

                        <InputLabel id="instructor-simple-select-label" fullWidth>
                            <Typography variant="caption" component="h6">
                                Instructor
                            </Typography>
                        </InputLabel>
                        <Select
                            labelId="instructor-simple-select-label"
                            id="instructor-simple-select"
                            className={classes.myInput}
                            value={ins}
                            onChange={(e) => lecSel(e, 'ins')}
                            fullWidth
                        >
                            {(lecturers.filter(l => l.level === '7').map(p => {
                                return (
                                    <MenuItem key={p._id} value={p.name}>{p.name}</MenuItem>
                                )
                            }))}
                        </Select>

                        <InputLabel id="subject-simple-select-label" fullWidth>
                            <Typography variant="caption" component="h6">
                                Subject
                            </Typography>
                        </InputLabel>
                        <Select
                            labelId="subject-simple-select-label"
                            id="subject-simple-select"
                            className={classes.myInput}
                            value={subName}
                            onChange={(e) => setSubName(e.target.value)}
                            fullWidth
                        >

                            {(subjects.map(s => {
                                return (
                                    <MenuItem key={s._id} value={s.name}>{s.name}</MenuItem>
                                )
                            }))}

                        </Select>

                        <InputLabel id="subjectCode-simple-select-label" fullWidth>
                            <Typography variant="caption" component="h6">
                                Subject Code
                            </Typography>
                        </InputLabel>
                        <Select
                            labelId="subjectCode-simple-select-label"
                            id="subjectCode-simple-select"
                            className={classes.myInput}
                            value={subCode}
                            onChange={(e) => setSubCode(e.target.value)}
                            fullWidth
                        >
                            {(subjects.filter(s => s.name === subName).map(s => {
                                return (
                                    <MenuItem key={s._id} value={s.subCode}>{s.subCode}</MenuItem>
                                )
                            }))}
                        </Select>

                        <InputLabel id="tag-simple-select-label" fullWidth>
                            <Typography variant="caption" component="h6">
                                Tag
                            </Typography>
                        </InputLabel>
                        <Select
                            labelId="tag-simple-select-label"
                            id="tag-simple-select"
                            className={classes.myInput}
                            value={tag}
                            onChange={(e) => setTag(e.target.value)}
                            fullWidth
                        >
                            <MenuItem value='Lecture'>Lecture</MenuItem>
                            <MenuItem value='Tutorial'>Tutorial</MenuItem>
                            <MenuItem value='Practical'>Practical</MenuItem>
                        </Select>

                        <InputLabel id="groupIdSub-simple-select-label" fullWidth>
                            <Typography variant="caption" component="h6">
                                Group Id
                            </Typography>
                        </InputLabel>
                        <FormControl className={classes.formControl} fullWidth disabled={(tag === '') ? false : (tag === 'Lecture' || tag === 'Tutorial') ? false : true}>
                            <Select
                                labelId="groupIdSub-simple-select-label"
                                id="groupIdSub-simple-select"
                                className={classes.myInput}
                                value={groupIdSub}
                                onChange={(e) => setGroupIdSub(e.target.value)}
                                fullWidth
                            >
                                {(students.map(s => {
                                    return (
                                        <MenuItem key={s._id} value={s.groupIdLabel}>{s.groupIdLabel}</MenuItem>
                                    )
                                }))}
                            </Select>
                        </FormControl>

                        <InputLabel id="groupIdSub-simple-select-label" fullWidth>
                            <Typography variant="caption" component="h6">
                                Sub Group Id
                            </Typography>
                        </InputLabel>
                        <FormControl className={classes.formControl} fullWidth disabled={(tag === '') ? false : (tag === 'Practical') ? false : true}>
                            <Select
                                labelId="groupIdSub-simple-select-label"
                                id="groupIdSub-simple-select"
                                className={classes.myInput}
                                value={groupIdSub}
                                onChange={(e) => setGroupIdSub(e.target.value)}
                                fullWidth
                            >
                                {(students.map(s => {
                                    return (
                                        <MenuItem key={s._id} value={s.subGroupIdLabel}>{s.subGroupIdLabel}</MenuItem>
                                    )
                                }))}
                            </Select>
                        </FormControl>

                        <TextField
                            margin="dense"
                            id="studentCount"
                            label="Student Count"
                            type="text"
                            value={studentCount}
                            onChange={(e) => setStudentCount(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />

                        <TextField
                            margin="dense"
                            id="Duration"
                            label="Duration"
                            type="text"
                            value={Duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />

                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleAddSession}
                        >
                            ADD
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={sessionAddSuccess.type}>
                                {sessionAddSuccess.msg}
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
