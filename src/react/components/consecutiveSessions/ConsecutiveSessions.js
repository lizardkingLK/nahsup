import React, { useState,useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
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
    pref: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    }
}))

const createData = (lecName, tag, subName, subCode, groupIdSub, studentCount, Duration, id) => {
    return { lecName, tag, subName, subCode, groupIdSub, studentCount, Duration, id };
}

const ConsecutiveSessions = () => {
    const classes = useStyles();
    const [ConSessions, setConSessions] = useState([]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [ConSessionsPerPage] = useState(3);
    const [selected, setSelected] = useState('');
    const [editable, setEditable] = useState('');

    // get current sessions
    const indexOfLastSession = currentPage * ConSessionsPerPage;
    const indexOfFirstSession = indexOfLastSession - ConSessionsPerPage;
    const currentSessions = ConSessions.slice(indexOfFirstSession, indexOfLastSession);

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }


    // useeffect => runs when mounted and also when content gets updated
    useEffect(() =>  {

    },[]);

    // refresh table
    const sessionsUpdated = () => {

    }

    // session selection changed
    const handleRadioChange = (value) => {

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
                    handleRadioChange={handleRadioChange}
                />
            </div>

            <div className={classes.pagination}>
                <Pagination
                    ConSessionsPerPage={ConSessionsPerPage}
                    totalSessions={ConSessions.length}
                    paginate={paginate}
                />
            </div>


            <div className={classes.row}>
                <AddConSession
                />

                <DeleteConSession  />
            </div>
        </div>
    )
}



export default ConsecutiveSessions