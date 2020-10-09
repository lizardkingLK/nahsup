import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, TextField } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

import Table from './Table';
import Pagination from './Pagination';
import AddConSession from "./AddConSession";
import DeleteConSession from "./DeleteConSession";

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
    pagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    pref: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}))

const ConsecutiveSessions = () => {
    const classes = useStyles();
    const [sessions, setSessions] = React.useState([]);
    const [conSessions, setConSessions] = React.useState([]);
    const [conSessionAddSuccess, setConSessionAddSuccess] = React.useState(
        { type: 'info', msg: 'Enter two sessions lecture & tute' }
    );

    const [loading, setLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [conSessionsPerPage] = React.useState(20);

    // get current sessions
    const indexOfLastSession = currentPage * conSessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - conSessionsPerPage;
    const currentSessions = conSessions.slice(indexOfFirstSession, indexOfLastSession);

    const [selected, setSelected] = React.useState('');
    const [editable, setEditable] = React.useState('');

    const [sessionA, setSessionA] = React.useState('');
    const [sessionB, setSessionB] = React.useState('');

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleSubmit = async () => {
        if (sessionA.length === 0)
            setConSessionAddSuccess({ type: 'warning', msg: 'Please Enter lecture ' })
        else if (sessionB.length === 0)
            setConSessionAddSuccess({ type: 'warning', msg: 'Please Enter tute' })
        else {
            console.log(sessionA)
            console.log(sessionB)
            ipcRenderer.send(channels.ADD_CONSECUTIVE, { load: [sessionA, sessionB] });
            await ipcRenderer.on(channels.ADD_CONSECUTIVE, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.ADD_CONSECUTIVE);
                const { success } = arg;
                if (success) {
                    setConSessionAddSuccess({
                        type: 'success',
                        msg: `Consecutive Session Added Successfully`
                    });
                    setSessionA('');
                    setSessionB('');
                    sessionsUpdated();
                }
                else {
                    setConSessionAddSuccess({
                        type: 'error',
                        msg: `Consecutive Sesson Not Added`
                    });
                    setSessionA('');
                    setSessionB('');
                }
            })
        }
    }

    const fetchSessions = async () => {
        await ipcRenderer.send(channels.LOAD_SESSIONS);

        ipcRenderer.on(channels.LOAD_SESSIONS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_SESSIONS);
            const rs = arg;
            setSessions(rs);
        });
    }

    const fetchConSessions = async () => {
        await ipcRenderer.send(channels.LOAD_CONSECUTIVE);

        ipcRenderer.on(channels.LOAD_CONSECUTIVE, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_CONSECUTIVE);
            const rs = arg;
            setConSessions(rs);
        });
    }

    // useeffect => runs when mounted and also when content gets updated
    React.useEffect(() => {
        fetchSessions();
        fetchConSessions();
    }, []);

    // refresh table
    const sessionsUpdated = () => {
        fetchSessions();
        fetchConSessions();
    }

    // session selection changed
    const handleRadioChange = (value) => {
        setSelected(value);
        let tConSessions = conSessions;
        const edit = tConSessions.filter(l => (l.id === value))[0];
        setEditable(edit);
    }

    return (
        <div className="sessions">
            <div className={classes.row}>
                <IconButton
                    size="small"
                    color="primary"
                    component="span"
                    onClick={() => sessionsUpdated()}
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
                    loading={loading}
                    setLoading={setLoading}
                    currentSessions={currentSessions}
                    sessions={sessions}
                    handleRadioChange={handleRadioChange}
                />
            </div>

            <div className={classes.pagination}>
                <Pagination
                    conSessionsPerPage={conSessionsPerPage}
                    totalSessions={conSessions.length}
                    paginate={paginate}
                />
            </div>

            <div className={classes.row}>
                <AddConSession
                    sessions={sessions}
                    sessionA={sessionA}
                    setSessionA={setSessionA}
                    sessionB={sessionB}
                    setSessionB={setSessionB}
                    conSessionAddSuccess={conSessionAddSuccess}
                    handleSubmit={handleSubmit}
                    setConSessionAddSuccess={setConSessionAddSuccess}
                />

                <DeleteConSession
                    selected={selected}
                    setSelected={setSelected}
                    sessionsUpdated={sessionsUpdated}
                />
            </div>
        </div>
    )
}



export default ConsecutiveSessions