import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import Card from '@material-ui/core/Card';
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

export default function AddStudent({ studentsUpdated }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [yearNo, setYearNo] = React.useState('');
    const [semNo, setSemNo] = React.useState('');
    const [programmeName, setProgrammeName] = React.useState('');
    const [groupId, setGroupId] = React.useState('');
    const [subGroupId, setSubGroupId] = React.useState('');
    const [group, setGroup] = React.useState('')
    const [studentAddSuccess, setStudentAddSuccess] = React.useState({ type: 'info', msg: 'Enter Student Details' })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setStudentAddSuccess({ type: 'info', msg: `Enter Student Details` });
    };

    useEffect(function () {
        setGroup(`Y${yearNo}.S${semNo}.${programmeName}.0${groupId}.${subGroupId}`)
    }, [yearNo, semNo, programmeName, groupId, subGroupId])

    const handleAddStudent = async () => {
        if (yearNo.length === 0)
            setStudentAddSuccess({ type: 'warning', msg: 'Year not entered' });
        else if (semNo.length === 0)
            setStudentAddSuccess({ type: 'warning', msg: 'Semester not entered' });
        else if (programmeName === 0)
            setStudentAddSuccess({ type: 'warning', msg: 'Programme not entered' });
        else if (groupId.length === 0)
            setStudentAddSuccess({ type: 'warning', msg: 'Group not entered' });
        else if (subGroupId.length === 0)
            setStudentAddSuccess({ type: 'warning', msg: 'Sub Group not entered' });
        else {
            ipcRenderer.send(channels.ADD_STUDENT, { yearNo, semNo, programmeName, groupId, subGroupId });
            await ipcRenderer.on(channels.ADD_STUDENT, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.ADD_STUDENT);
                const { success } = arg;
                if (success) {
                    setStudentAddSuccess({ type: 'success', msg: `Student added ` });
                    setYearNo('');
                    setSemNo('');
                    setProgrammeName('');
                    setGroupId('');
                    setSubGroupId('');

                    studentsUpdated();
                }
                else
                    setStudentAddSuccess({ type: 'error', msg: 'Student not added' });
            })
        }
    }

    const handleChange = (e, context) => {
        const value = e.target.value;
        switch (context) {
            case 'yearNo':
                setYearNo(value);
                break;
            case 'semNo':
                setSemNo(value);
                break;
            case 'programmeName':
                setProgrammeName(value);
                break;
            case 'groupId':
                setGroupId(value);
                break;
            case 'subGroupId':
                setSubGroupId(value);
                break;
            default:
                break;
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
                <DialogTitle id="form-dialog-title">Add Student</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <DialogContentText>
                            Add Student
                        </DialogContentText>
                        <TextField
                            margin="dense"
                            id="yearNo"
                            label="Year"
                            type="text"
                            value={yearNo}
                            onChange={(e) => handleChange(e, 'yearNo')}
                            className={classes.myInput}
                            fullWidth
                        />

                        <TextField
                            margin="dense"
                            id="semNo"
                            label="Semester"
                            type="text"
                            value={semNo}
                            onChange={(e) => handleChange(e, 'semNo')}
                            className={classes.myInput}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="programmeName"
                            label="Programme"
                            type="text"
                            value={programmeName}
                            onChange={(e) => handleChange(e, 'programmeName')}
                            className={classes.myInput}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="groupId"
                            label="Group No"
                            type="text"
                            value={groupId}
                            onChange={(e) => handleChange(e, 'groupId')}
                            className={classes.myInput}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="subGroupId"
                            label="Sub Group No"
                            type="text"
                            value={subGroupId}
                            onChange={(e) => handleChange(e, 'subGroupId')}
                            className={classes.myInput}
                            fullWidth
                        />
                        <TextField
                            margin="dense"
                            id="group"
                            label="group label"
                            type="text"
                            value={group}
                            className={classes.myInput}
                            disabled={true}
                            fullWidth
                        />
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleAddStudent}
                        >
                            ADD
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={studentAddSuccess.type}>
                                {studentAddSuccess.msg}
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
