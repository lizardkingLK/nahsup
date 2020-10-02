import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import RefreshIcon from '@material-ui/icons/Refresh';

import Table from './Table';
import Pagination from './Pagination';
import AddSession from "./AddSession";
import DeleteSession from "./DeleteSession";
import AdvancedSearch from "./AdvancedSearch";

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
    labeledButton: {
        margin: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
    pref: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}))

const createData = (lecName, tag, subName, subCode, groupIdSub, studentCount, Duration, id) => {
    return { lecName, tag, subName, subCode, groupIdSub, studentCount, Duration, id };
}

const Sessions = () => {
    const classes = useStyles();
    const [sessions, setSessions] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [lc, setLc] = useState([]);
    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [sessionsPerPage] = useState(5);
    const [selected, setSelected] = useState('');
    const [editable, setEditable] = useState('');

    // get current sessions
    const indexOfLastSession = currentPage * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const fetchSessions = async () => {
        setLoading(true);
        await ipcRenderer.send(channels.LOAD_SESSIONS);

        ipcRenderer.on(channels.LOAD_SESSIONS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_SESSIONS);
            const rs = arg;
            const rsArray = rs.map(r => createData(r.lecName, r.tag, r.subName, r.subCode, r.groupIdSub, r.studentCount, r.Duration, r.id))
            setSessions(rsArray);
        });
        setLoading(false);
    }

    // useeffect => runs when mounted and also when content gets updated
    useEffect(() => {
        fetchSessions()

        const fetchLecturers = async () => {
            await ipcRenderer.send(channels.LOAD_LECTURERS);

            ipcRenderer.on(channels.LOAD_LECTURERS, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.LOAD_LECTURERS);
                setLc(arg);
            });
        }

        fetchLecturers()

        const fetchSubjects = async () => {
            await ipcRenderer.send(channels.LOAD_SUBJECTS);

            ipcRenderer.on(channels.LOAD_SUBJECTS, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.LOAD_SUBJECTS);
                setSubjects(arg);
            });
        }
        fetchSubjects();

        const fetchStudents = async () => {
            await ipcRenderer.send(channels.LOAD_STUDENTS);

            ipcRenderer.on(channels.LOAD_STUDENTS, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.LOAD_STUDENTS);
                setStudents(arg);
            });
            setLoading(false);
        }
        fetchStudents();

    }, []);

    // refresh table
    const sessionsUpdated = () => {
        fetchSessions();
    }

    // session selection changed
    const handleRadioChange = (value) => {
        setSelected(value);
        let tSessions = sessions;
        const edit = tSessions.filter(l => (l.id === value))[0];
        setEditable(edit);
    }

    //  advanced search
    const searchFilter = async (value, context) => {
        const newSessions = sessions;
        if (context === 'subject')
            setSessions(newSessions.filter(s => s.subName === value))
        else if (context === 'lecturer')
            setSessions(newSessions.filter(s => s.lecName.includes(value)))
        else
            setSessions(newSessions.filter(s => s.subName === value.subject && s.lecName.includes(value.lecturer)))
    }

    return (
        <div className="sessions">
            <div className={classes.row}>
                <AdvancedSearch
                    subjects={subjects}
                    lecturers={lc}
                    searchFilter={searchFilter}
                />
                <IconButton
                    size="small"
                    color="primary"
                    component="span"
                    onClick={fetchSessions}
                >
                    <RefreshIcon />
                </IconButton>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="search_location"
                            size="small"
                            label="Search Sessions..."
                        />
                    </div>
                </form>
            </div>

            <div className={classes.row}>
                <Table
                    sessions={currentSessions}
                    loading={loading}
                    handleRadioChange={handleRadioChange}
                />
            </div>

            <div className={classes.pagination}>
                <Pagination
                    sessionsPerPage={sessionsPerPage}
                    totalSessions={sessions.length}
                    paginate={paginate}
                />
            </div>


            <div className={classes.row}>
                <AddSession
                    sessionsUpdated={sessionsUpdated}
                    subjects={subjects}
                    lecturers={lc}
                    students={students}
                />

                <DeleteSession selected={selected} sessionsUpdated={sessionsUpdated} />
            </div>
        </div>
    )
}



export default Sessions