import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Table from './Table';
import Pagination from './Pagination';
import AddStudent from './AddStudent';
import DeleteStudent from './DeleteStudent';

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
    table: {
        minWidth: 650,
    },
    pref: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 200,
    }
}))

const createData = (year, sem, programme, group, subGroup, id) => {
    return { year, sem, programme, group, subGroup, id };
}

const Students = () => {
    const classes = useStyles();

    const [students, setStudents] = useState([]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [studentsPerPage] = useState(3);
    const [selected, setSelected] = useState('');

    // get current students
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const fetchStudents = async () => {
        setLoading(true);
        await ipcRenderer.send(channels.LOAD_STUDENTS);

        ipcRenderer.on(channels.LOAD_STUDENTS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_STUDENTS);
            const rs = arg;
            const rsArray = rs.map(r => createData(r.year, r.sem, r.programme, r.group, r.subGroup, r.id))
            setStudents(rsArray);
        });
        setLoading(false);
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    // refresh table
    const studentsUpdated = () => {
        fetchStudents();
    }

    // selected student changed
    const handleRadioChange = (value) => {
        console.log(value);
        setSelected(value);
    }


    // search handle
    const handleChange = async (e) => {
        e.preventDefault();
        const keyword = e.target.value;
        if (keyword) {
            setLoading(true);
            await ipcRenderer.send(channels.SEARCH_STUDENTS, { keyword });

            ipcRenderer.on(channels.SEARCH_STUDENTS, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.SEARCH_STUDENTS);
                const rs = arg;
                const rsArray = rs.map(r => createData(r.year, r.sem, r.programme, r.group, r.subGroup, r.id))
                setStudents(rsArray);
            });
            setLoading(false);
        }
    }

    return (
        <div className="students">
            <div className={classes.row}>
                <IconButton
                    size="small"
                    color="primary"
                    component="span"
                    onClick={fetchStudents}
                >
                    <RefreshIcon />
                </IconButton>
                <form noValidate autoComplete="off" onSubmit={handleChange}>
                    <div>
                        <TextField
                            id="search_student"
                            size="small"
                            label="Search Students..."
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>

            <div className={classes.row}>
                <Table
                    students={currentStudents}
                    loading={loading}
                    handleRadioChange={handleRadioChange}
                />
            </div>

            <div className={classes.pagination}>
                <Pagination
                    studentsPerPage={studentsPerPage}
                    totalStudents={students.length}
                    paginate={paginate}
                />
            </div>

            <div className={classes.row}>
                <DeleteStudent selected={selected} studentsUpdated={studentsUpdated} />
                <AddStudent studentsUpdated={studentsUpdated} />
            </div>

        </div>
    )
}




export default Students