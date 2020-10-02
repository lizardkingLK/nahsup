import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    IconButton, Radio, TextField, Tooltip
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

import LecTable from './LecTable';
import SesTable from './SesTable';
import GroupTable from './GroupTable';
import SubGroupTable from './SubGroupTable';
import Pagination from './Pagination';

import AddLecUn from "./AddLecUn";
import AddSesUn from "./AddSesUn";
import AddGroupUn from "./AddGroupUn";
import AddSubGroupUn from "./AddSubGroupUn";

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

const Unavailability = () => {
    const classes = useStyles();
    const [context, setContext] = useState('Lecturer');
    const [groupIds, setGroupIds] = useState([]);
    const [subGroupIds, setSubGroupIds] = useState([]);

    // lecturers + table + pagination
    const [lecturers, setLecturers] = useState([]);
    const fetchLecturers = async () => {
        await ipcRenderer.send(channels.LOAD_LECTURERS);

        ipcRenderer.on(channels.LOAD_LECTURERS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_LECTURERS);
            setLecturers(arg);
        });
    }
    const [currentPageL, setCurrentPageL] = useState(1);
    const [lecturersPerPage] = useState(5);
    const indexOfLastLecturer = currentPageL * lecturersPerPage;
    const indexOfFirstLecturer = indexOfLastLecturer - lecturersPerPage;
    const currentLecturers = lecturers.slice(indexOfFirstLecturer, indexOfLastLecturer);
    const paginateL = (pageNumber) => setCurrentPageL(pageNumber);

    // sessions + table + pagination
    const [sessions, setSessions] = useState([]);
    const fetchSessions = async () => {
        await ipcRenderer.send(channels.LOAD_SESSIONS);

        ipcRenderer.on(channels.LOAD_SESSIONS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_SESSIONS);
            const rs = arg;
            setSessions(rs);
        });
    }
    const [currentPageSe, setCurrentPageSe] = useState(1);
    const [sessionsPerPage] = useState(3);
    const indexOfLastSession = currentPageSe * sessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
    const currentSessions = sessions.slice(indexOfFirstSession, indexOfLastSession);
    const paginateSe = (pageNumber) => setCurrentPageSe(pageNumber);

    const fetchGroupIds = async () => {
        await ipcRenderer.send(channels.LOAD_GROUPID);

        ipcRenderer.on(channels.LOAD_GROUPID, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_GROUPID);
            const rs = arg;
            setGroupIds(rs);
        });
    }

    const fetchSubGroupIds = async () => {
        await ipcRenderer.send(channels.LOAD_SUBGROUPID);

        ipcRenderer.on(channels.LOAD_SUBGROUPID, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_SUBGROUPID);
            const rs = arg;
            setSubGroupIds(rs);
        });
    }

    // useeffect => runs when mounted and also when content gets updated
    useEffect(() => {
        fetchSubGroupIds();
        fetchGroupIds();
        fetchLecturers();
        fetchSessions();
    }, []);

    // refresh table
    const sessionsUpdated = (context) => {
        switch (context) {
            case 'Lecturer':
                fetchLecturers();
                break;
            case 'Session':
                fetchSessions();
                break;
            case 'GroupId':
                fetchGroupIds();
                break;
            case 'SubGroupId':
                fetchSubGroupIds();
                break;
            default:
                break;
        }
    }

    return (
        <div className="sessions">
            <div className={classes.row}>
                <IconButton
                    size="small"
                    color="primary"
                    component="span"
                >
                    <RefreshIcon />
                </IconButton>
                <div>
                    <Tooltip title="Lecturer">
                        <Radio
                            checked={context === 'Lecturer'}
                            onChange={(e) => setContext(e.target.value)}
                            color="primary"
                            size="small"
                            value="Lecturer"
                            name="radio-button-lec"
                            inputProps={{ 'aria-label': 'Lecturer' }}
                        />
                    </Tooltip>
                    <Tooltip title="Session">
                        <Radio
                            checked={context === 'Session'}
                            onChange={(e) => setContext(e.target.value)}
                            color="primary"
                            size="small"
                            value="Session"
                            name="radio-button-ses"
                            inputProps={{ 'aria-label': 'Session' }}
                        />
                    </Tooltip>
                    <Tooltip title="GroupId">
                        <Radio
                            checked={context === 'GroupId'}
                            onChange={(e) => setContext(e.target.value)}
                            color="primary"
                            size="small"
                            value="GroupId"
                            name="radio-button-group"
                            inputProps={{ 'aria-label': 'GroupId' }}
                        />
                    </Tooltip>
                    <Tooltip title="SubGroupId">
                        <Radio
                            checked={context === 'SubGroupId'}
                            onChange={(e) => setContext(e.target.value)}
                            color="primary"
                            size="small"
                            value="SubGroupId"
                            name="radio-button-subgroup"
                            inputProps={{ 'aria-label': 'SubGroupId' }}
                        />
                    </Tooltip>
                </div>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="search_location"
                            size="small"
                            label="Search..."
                        />
                    </div>
                </form>
            </div>

            {context === 'Lecturer' ? (
                <>
                    <div className={classes.row}>
                        <LecTable lecturers={currentLecturers} />
                    </div>
                    <div className={classes.row}>
                        <Pagination
                            rowsPerPage={lecturersPerPage}
                            totalRows={lecturers.length}
                            paginate={paginateL}
                        />
                    </div>
                    <div className={classes.row}>
                        <AddLecUn lecturers={lecturers} />
                    </div>
                </>
            ) : context === 'Session' ? (
                <>
                    <div className={classes.row}>
                        <SesTable sessions={currentSessions} />
                    </div>
                    <div className={classes.row}>
                        <Pagination
                            rowsPerPage={sessionsPerPage}
                            totalRows={sessions.length}
                            paginate={paginateSe}
                        />
                    </div>
                    <div className={classes.row}>
                        <AddSesUn sessions={sessions} />
                    </div>
                </>
            ) : context === 'GroupId' ? (
                <>
                    <div className={classes.row}>
                        <GroupTable

                        />
                    </div>
                    <div className={classes.row}>
                        <AddGroupUn groupIds={groupIds} />
                    </div>
                </>
            ) : (
                            <>
                                <div className={classes.row}>
                                    <SubGroupTable

                                    />
                                </div>
                                <div className={classes.row}>
                                    <AddSubGroupUn subGroupIds={subGroupIds} />
                                </div>
                            </>
                        )}
        </div>
    )
}



export default Unavailability