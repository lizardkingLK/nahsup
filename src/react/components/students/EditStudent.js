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

export default function EditSubject({ selected, studentsUpdated, year, sem, programme, group, subGroup, id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [yearNo, setYearNo] = React.useState('');
    const [semNo, setSemNo] = React.useState('');
    const [programmeName, setProgrammeName] = React.useState('');
    const [groupId, setGroupId] = React.useState(0);
    const [subGroupId, setSubGroupId] = React.useState(0);

    const [studentEditSuccess, setStudentEditSuccess] = React.useState({ type: 'info', msg: 'Enter Student Info.' });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setStudentEditSuccess({ type: 'info', msg: 'Enter Student Info.' });
    };

    const handleEditStudent = async () => {
        if (yearNo.length === 0)
            setStudentEditSuccess({ type: 'warning', msg: 'year not entered' });
        else if (semNo.length === 0)
            setStudentEditSuccess({ type: 'warning', msg: 'semester not entered' });
        else if (programmeName.length === 0)
            setStudentEditSuccess({ type: 'warning', msg: 'programme not entered' });
        else if (groupId.length === 0)
            setStudentEditSuccess({ type: 'warning', msg: 'group not entered' });
        else if (subGroupId.length === 0)
            setStudentEditSuccess({ type: 'warning', msg: 'sub group not entered' });
        else {
            ipcRenderer.send(channels.EDIT_STUDENT, {
                yearNo, semNo, programmeName, groupId, subGroupId, id
            });
            await ipcRenderer.on(channels.EDIT_STUDENT, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.EDIT_STUDENT);
                const { success } = arg;
                if (success) {
                    setStudentEditSuccess({ type: 'success', msg: 'Student edited.' });
                    setYearNo('');
                    setSemNo('');
                    setProgrammeName('');
                    setGroupId(0);
                    setSubGroupId(0);

                    studentsUpdated();
                }
                else
                    setStudentEditSuccess({ type: 'success', msg: 'Student edited' });
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

                        <TextField
                            margin="dense"
                            id="yearNo"
                            label="Year"
                            type="text"
                            value={yearNo}
                            className={classes.myInput}
                            onChange={(e) => setYearNo(e.target.value)}
                        />
                        <Typography variant="caption" component="h3">{year}</Typography>

                        <TextField
                            margin="dense"
                            id="name"
                            label="Semester"
                            type="text"
                            value={semNo}
                            onChange={(e) => setSemNo(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <Typography variant="caption" component="h3">{sem}</Typography>

                        <TextField
                            margin="dense"
                            id="lecHrs"
                            label="Programme"
                            type="text"
                            value={programmeName}
                            onChange={(e) => setProgrammeName(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <Typography variant="caption" component="h3">{programme}</Typography>

                        <TextField
                            margin="dense"
                            id="tuteHrs"
                            label="Group"
                            type="text"
                            value={groupId}
                            onChange={(e) => setGroupId(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <Typography variant="caption" component="h3">{group}</Typography>

                        <TextField
                            margin="dense"
                            id="labHrs"
                            label="Sub Group"
                            type="text"
                            value={subGroupId}
                            onChange={(e) => setSubGroupId(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <Typography variant="caption" component="h3">{subGroup}</Typography>

                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleEditStudent}
                        >
                            EDIT
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={studentEditSuccess.type}>
                                {studentEditSuccess.msg}
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
