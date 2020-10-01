import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';

import TagSpecific from './TagsSpecific';
import SubjectsSpecific from './SubjectsSpecific';
import LecturersSpecific from './LecturersSpecific';

import { channels } from '../../../shared/constants';
const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: theme.spacing(1),
    },
    column: {
        margin: theme.spacing(1),
    },
    columnContent: {
        margin: theme.spacing(2),
    },
    columnContentReversed: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        margin: theme.spacing(2),
    },
    table: {
        marginTop: theme.spacing(2),
        minWidth: 650,
    },
}))

export default function Preferences({ locations, tags, subjects, lecturers }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    // tags
    const [roomT, setRoomT] = React.useState('');
    const [tagT, setTagT] = React.useState('');
    const [tagSpecificAddSuccess, setTagSpecificAddSuccess] = React.useState({ type: 'info', msg: 'Select Room & Tag' })

    // subjects
    const [roomS, setRoomS] = React.useState('');
    const [tagS, setTagS] = React.useState('');
    const [subjectS, setSubjectS] = React.useState('');
    const [subjectSpecificAddSuccess, setSubjectSpecificAddSuccess] = React.useState({ type: 'info', msg: 'Select Room, Tag & Subject' })

    // lecturers
    const [roomL, setRoomL] = React.useState('');
    const [lecturerL, setLecturerL] = React.useState('');
    const [lecturerSpecificAddSuccess, setLecturerSpecificAddSuccess] = React.useState({ type: 'info', msg: 'Select Room & Lecturer' })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setTimeout(function () {
            setRoomT('');
            setTagT('');
            setRoomS('');
            setTagS('');
            setSubjectS('');
            setRoomL('');
            setLecturerL('');
            setLecturerSpecificAddSuccess({ type: 'info', msg: 'Select Room & Lecturer' });
            setSubjectSpecificAddSuccess({ type: 'info', msg: 'Select Room, Tag & Subject' });
            setTagSpecificAddSuccess({ type: 'info', msg: 'Select Room & Tag' });
        }, 1000)
    };

    const handleSubmit = async (e, type) => {
        switch (type) {
            case 'TAGS':
                console.log(roomT)
                console.log(tagT)
                if (roomT.length === 0)
                    setTagSpecificAddSuccess({ type: 'warning', msg: 'Room not selected' });
                else if (tagT.length === 0)
                    setTagSpecificAddSuccess({ type: 'warning', msg: 'Tag not selected' });
                else {
                    // finds if the preference for room has added before
                    ipcRenderer.send(channels.FIND_PREFERENCE, { rID: roomT });
                    await ipcRenderer.on(channels.FIND_PREFERENCE, async (event, arg) => {
                        ipcRenderer.removeAllListeners(channels.FIND_PREFERENCE);
                        const { success } = arg;
                        if (success) {
                            // room has added before
                            // then update
                            ipcRenderer.send(channels.EDIT_PREFERENCE, {
                                type: 'TAGS',
                                load: {
                                    rID: roomT,
                                    tags: tagT
                                }
                            });
                            await ipcRenderer.on(channels.EDIT_PREFERENCE, (event, arg) => {
                                ipcRenderer.removeAllListeners(channels.EDIT_PREFERENCE);
                                const { success } = arg;
                                if (success) {
                                    setTagSpecificAddSuccess({ type: 'success', msg: `Preference Editted Successfully. ${tagT} for ${roomT}` });
                                    setRoomT('');
                                    setTagT('');

                                    // preferencesReload();
                                }
                                else {
                                    setTagSpecificAddSuccess({ type: 'error', msg: `Preference Already Available for ${tagT} for ${roomT}` });
                                    setRoomT('');
                                    setTagT('');

                                    // preferencesNotLoad();
                                }
                            })
                        }
                        else {
                            // room is a new
                            // then add
                            ipcRenderer.send(channels.ADD_PREFERENCE, {
                                load: {
                                    rID: roomT,
                                    tags: [tagT]
                                }
                            });
                            await ipcRenderer.on(channels.ADD_PREFERENCE, (event, arg) => {
                                ipcRenderer.removeAllListeners(channels.ADD_PREFERENCE);
                                const { success } = arg;
                                if (success) {
                                    setTagSpecificAddSuccess({ type: 'success', msg: `Preference Added Successfully. ${tagT} for ${roomT}` });
                                    setRoomT('');
                                    setTagT('');

                                    // preferencesReload();
                                }
                                else {
                                    setTagSpecificAddSuccess({ type: 'error', msg: `Preference Not Added.` });
                                    setRoomT('');
                                    setTagT('');

                                    // preferencesNotLoad();
                                }
                            })
                        }
                    })
                }
                break;
            case 'SUBJECTS':
                console.log(roomS)
                console.log(tagS)
                console.log(subjectS)
                if (roomS.length === 0)
                    setSubjectSpecificAddSuccess({ type: 'warning', msg: 'Room not selected' });
                else if (tagS.length === 0)
                    setSubjectSpecificAddSuccess({ type: 'warning', msg: 'Tag not selected' });
                else if (subjectS.length === 0)
                    setSubjectSpecificAddSuccess({ type: 'warning', msg: 'Subject not selected' });
                else {
                    // finds if the preference for room has added before
                    ipcRenderer.send(channels.FIND_PREFERENCE, { rID: roomS });
                    await ipcRenderer.on(channels.FIND_PREFERENCE, async (event, arg) => {
                        ipcRenderer.removeAllListeners(channels.FIND_PREFERENCE);
                        const { success } = arg;
                        if (success) {
                            // room has added before
                            // then update
                            ipcRenderer.send(channels.EDIT_PREFERENCE, {
                                type: 'SUBJECTS',
                                load: {
                                    rID: roomS,
                                    subjects: {
                                        tag: tagS,
                                        subject: subjectS
                                    }
                                }
                            });
                            await ipcRenderer.on(channels.EDIT_PREFERENCE, (event, arg) => {
                                ipcRenderer.removeAllListeners(channels.EDIT_PREFERENCE);
                                const { success } = arg;
                                if (success) {
                                    setSubjectSpecificAddSuccess(
                                        { type: 'success', msg: `Preference Editted Successfully. ${tagS} for ${subjectS} in ${roomS}` }
                                    );
                                    setRoomS('');
                                    setTagS('');
                                    setSubjectS('');

                                    // preferencesReload();
                                }
                                else {
                                    setSubjectSpecificAddSuccess({
                                        type: 'error', msg: `Preference Already Available ${tagS} for ${subjectS} in ${roomS}`
                                    });
                                    setRoomS('');
                                    setTagS('');
                                    setSubjectS('');

                                    // preferencesNotLoad();
                                }
                            })
                        }
                        else {
                            // room is a new
                            // then add
                            ipcRenderer.send(channels.ADD_PREFERENCE, {
                                load: {
                                    rID: roomS,
                                    subjects: [{
                                        tag: tagS,
                                        subject: subjectS
                                    }]
                                }
                            });
                            await ipcRenderer.on(channels.ADD_PREFERENCE, (event, arg) => {
                                ipcRenderer.removeAllListeners(channels.ADD_PREFERENCE);
                                const { success } = arg;
                                if (success) {
                                    setSubjectSpecificAddSuccess({
                                        type: 'success', msg: `Preference Added Successfully. ${tagS} for ${subjectS} in ${roomS}`
                                    });
                                    setRoomS('');
                                    setTagS('');
                                    setSubjectS('');

                                    // preferencesReload();
                                }
                                else {
                                    setSubjectSpecificAddSuccess({
                                        type: 'error', msg: `Preference Not Added.`
                                    });
                                    setRoomS('');
                                    setTagS('');
                                    setSubjectS('');

                                    // preferencesNotLoad();
                                }
                            })
                        }
                    })
                }
                break;
            case 'LECTURERS':
                console.log(roomL)
                console.log(lecturerL)
                if (roomL.length === 0)
                    setLecturerSpecificAddSuccess({ type: 'warning', msg: 'Room not selected' });
                else if (lecturerL.length === 0)
                    setLecturerSpecificAddSuccess({ type: 'warning', msg: 'Lecturer not selected' });
                else {
                    // finds if the preference for room has added before
                    ipcRenderer.send(channels.FIND_PREFERENCE, { rID: roomL });
                    await ipcRenderer.on(channels.FIND_PREFERENCE, async (event, arg) => {
                        ipcRenderer.removeAllListeners(channels.FIND_PREFERENCE);
                        const { success } = arg;
                        if (success) {
                            // room has added before
                            // then update
                            ipcRenderer.send(channels.EDIT_PREFERENCE, {
                                type: 'LECTURERS',
                                load: {
                                    rID: roomL,
                                    lecturers: lecturerL
                                }
                            });
                            await ipcRenderer.on(channels.EDIT_PREFERENCE, (event, arg) => {
                                ipcRenderer.removeAllListeners(channels.EDIT_PREFERENCE);
                                const { success } = arg;
                                if (success) {
                                    setLecturerSpecificAddSuccess({
                                        type: 'success', msg: `Preference Editted Successfully. ${lecturerL.name} for ${roomL}`
                                    });
                                    setRoomL('');
                                    setLecturerL('');

                                    // preferencesReload();
                                }
                                else {
                                    setLecturerSpecificAddSuccess({
                                        type: 'error', msg: `Preference Already Available for ${lecturerL.name} & ${roomL}`
                                    });
                                    setRoomL('');
                                    setLecturerL('');

                                    // preferencesNotLoad();
                                }
                            })
                        }
                        else {
                            // room is a new
                            // then add
                            ipcRenderer.send(channels.ADD_PREFERENCE, {
                                load: {
                                    rID: roomL,
                                    lecturers: [lecturerL]
                                }
                            });
                            await ipcRenderer.on(channels.ADD_PREFERENCE, (event, arg) => {
                                ipcRenderer.removeAllListeners(channels.ADD_PREFERENCE);
                                const { success } = arg;
                                if (success) {
                                    setLecturerSpecificAddSuccess({
                                        type: 'success', msg: `Preference Added Successfully. ${lecturerL.name} & ${roomL}`
                                    });
                                    setRoomL('');
                                    setLecturerL('');

                                    // preferencesReload();
                                }
                                else {
                                    setLecturerSpecificAddSuccess({
                                        type: 'error', msg: `Preference Not Added.`
                                    });
                                    setRoomL('');
                                    setLecturerL('');

                                    // preferencesNotLoad();
                                }
                            })
                        }
                    })
                }
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Button
                variant="outlined"
                size="small"
                color="primary"
                onClick={handleClickOpen}
            >
                <Typography variant="caption" component="h3">
                    Preferences
                </Typography>
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">
                    <Typography variant="button">
                        Manage Rooms
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To manage Preferences specifically sessions, subjects, groups & subgroups.
                    </DialogContentText>
                    <TagSpecific
                        locations={locations}
                        tags={tags}
                        tag={tagT}
                        setTag={setTagT}
                        setRoom={setRoomT}
                        addSuccess={tagSpecificAddSuccess}
                        handleSubmit={handleSubmit}
                    />
                    <SubjectsSpecific
                        locations={locations}
                        tags={tags}
                        subjects={subjects}
                        tag={tagS}
                        setTag={setTagS}
                        setRoom={setRoomS}
                        subject={subjectS}
                        setSubject={setSubjectS}
                        addSuccess={subjectSpecificAddSuccess}
                        handleSubmit={handleSubmit}
                    />
                    <LecturersSpecific
                        locations={locations}
                        lecturers={lecturers}
                        setRoom={setRoomL}
                        setLecturer={setLecturerL}
                        addSuccess={lecturerSpecificAddSuccess}
                        handleSubmit={handleSubmit}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
