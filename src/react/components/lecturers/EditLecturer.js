import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, IconButton, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputLabel,
    Select, MenuItem, Card
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
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

export default function EditLecturer({ selected, lecturersUpdated, ueId, uname, ufaculty, udep, ucenter, ubuilding, ulevel, urank, id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [eId, setEId] = React.useState('');
    const [name, setName] = React.useState('');
    const [faculty, setFaculty] = React.useState('');
    const [dep, setDep] = React.useState('');
    const [center, setCenter] = React.useState('');
    const [building, setBuilding] = React.useState('');
    const [level, setLevel] = React.useState('');
    const [rank, setRank] = React.useState('');
    const [lecturerEditSuccess, setLecturerEditSuccess] = React.useState({ type: 'info', msg: 'Enter Lecturer Info' });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setLecturerEditSuccess({ type: 'info', msg: 'Enter Lecturer Info' });
    };

    const handleEditLecturer = async () => {
        if (eId.length === 0)
            setLecturerEditSuccess({ type: 'warning', msg: 'Lecturer ID not entered' });
        else if (name.length === 0)
            setLecturerEditSuccess({ type: 'warning', msg: 'Lecturer name not entered' });
        else if (faculty.length === 0)
            setLecturerEditSuccess({ type: 'warning', msg: 'Faculty not entered' });
        else if (dep.length === 0)
            setLecturerEditSuccess({ type: 'warning', msg: 'Department not entered' });
        else if (center.length === 0)
            setLecturerEditSuccess({ type: 'warning', msg: 'Center not entered' });
        else if (building.length === 0)
            setLecturerEditSuccess({ type: 'warning', msg: 'Building not entered' });
        else if (level.length === 0)
            setLecturerEditSuccess({ type: 'warning', msg: 'Level not entered' });
        else if (rank.length === 0)
            setLecturerEditSuccess({ type: 'warning', msg: 'Rank not entered' });
        else {
            ipcRenderer.send(channels.EDIT_LECTURERS, { eId, name, faculty, dep, center, building, level, rank, id });
            await ipcRenderer.on(channels.EDIT_LECTURERS, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.EDIT_LECTURERS);
                const { success } = arg;
                if (success) {
                    setLecturerEditSuccess({ type: 'success', msg: `Lecturer edited ` });
                    setEId('');
                    setName('')
                    setFaculty('')
                    setDep('')
                    setCenter('')
                    setBuilding('')
                    setLevel('')
                    setRank('')

                    lecturersUpdated();
                }
                else
                    setLecturerEditSuccess({ type: 'error', msg: 'Lecturer not edited' });
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
                <DialogTitle id="form-dialog-title">Edit Lecturer</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <DialogContentText>
                            Edit Lecturer
                        </DialogContentText>

                        <div>
                            <TextField
                                margin="dense"
                                id="eID"
                                label="Lecturer ID"
                                type="text"
                                value={eId}
                                onChange={(e) => setEId(e.target.value)}
                                fullWidth
                            />
                            <Typography variant="caption" component="h3">{ueId}</Typography>
                        </div>

                        <div>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                fullWidth
                            />
                            <Typography variant="caption" component="h3">{uname}</Typography>
                        </div>
                        <div>
                            <InputLabel id="faculty-simple-select-label" fullWidth>
                                <Typography variant="caption" component="h6">
                                    Faculty
                                    </Typography>
                            </InputLabel>
                            <Select
                                labelId="faculty-simple-select-label"
                                id="faculty-simple-select"
                                value={faculty}
                                className={classes.myInput}
                                onChange={(e) => setFaculty(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value='Computing'>Computing</MenuItem>
                                <MenuItem value='Engineering'>Engineering</MenuItem>
                                <MenuItem value='Business'>Business</MenuItem>
                                <MenuItem value='Humanities and Sciences'>Humanities and Sciences</MenuItem>
                            </Select>
                            <Typography variant="caption" component="h3">{ufaculty}</Typography>
                        </div>

                        <div>
                            <InputLabel id="department-simple-select-label" fullWidth>
                                <Typography variant="caption" component="h6">
                                    Department
                                </Typography>
                            </InputLabel>
                            <Select
                                labelId="department-simple-select-label"
                                id="department-simple-select"
                                className={classes.myInput}
                                value={dep}
                                onChange={(e) => setDep(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value='SLIIT'>SLIIT</MenuItem>
                                <MenuItem value='NSBM'>NSBM</MenuItem>
                            </Select>
                            <Typography variant="caption" component="h3">{udep}</Typography>
                        </div>

                        <div>
                            <InputLabel id="center-simple-select-label" fullWidth>
                                <Typography variant="caption" component="h6">
                                    Center
                                </Typography>
                            </InputLabel>
                            <Select
                                labelId="center-simple-select-label"
                                id="center-simple-select"
                                className={classes.myInput}
                                value={center}
                                onChange={(e) => setCenter(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value='malabe'>Malabe</MenuItem>
                                <MenuItem value='kandy'>Kandy</MenuItem>
                                <MenuItem value='metro'>Metro</MenuItem>
                                <MenuItem value='kurunagle'>Kurunagle</MenuItem>
                                <MenuItem value='jaffna'>Jaffna</MenuItem>
                                <MenuItem value='matara'>Matara</MenuItem>
                            </Select>
                            <Typography variant="caption" component="h3">{ucenter}</Typography>
                        </div>

                        <div>
                            <InputLabel id="building-simple-select-label" fullWidth>
                                <Typography variant="caption" component="h6">
                                    Building
                                </Typography>
                            </InputLabel>
                            <Select
                                labelId="building-simple-select-label"
                                id="building-simple-select"
                                className={classes.myInput}
                                value={building}
                                onChange={(e) => setBuilding(e.target.value)}
                                fullWidth
                            >
                                <MenuItem value='newBuilding'>New Building</MenuItem>
                                <MenuItem value='d-block'>D-block</MenuItem>
                                <MenuItem value='c-block'>C-block</MenuItem>
                                <MenuItem value='a-block'>A-block</MenuItem>
                                <MenuItem value='b-block'>B-block</MenuItem>
                                <MenuItem value='e-block'>E-block</MenuItem>
                            </Select>
                            <Typography variant="caption" component="h3">{ubuilding}</Typography>
                        </div>

                        <div>
                            <TextField
                                margin="dense"
                                id="level"
                                label="Level"
                                type="text"
                                value={level}
                                onChange={(e) => setLevel(e.target.value)}
                                className={classes.myInput}
                                fullWidth
                            />
                            <Typography variant="caption" component="h3">{ulevel}</Typography>
                        </div>
                        <TextField
                            margin="dense"
                            id="rank"
                            label="Rank"
                            type="text"
                            value={rank}
                            onChange={(e) => setRank(e.target.value)}
                            className={classes.myInput}
                            fullWidth
                        />
                        <Typography variant="caption" component="h3">{urank}</Typography>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleEditLecturer}
                        >
                            EDIT
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={lecturerEditSuccess.type}>
                                {lecturerEditSuccess.msg}
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
