import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import TextField from '@material-ui/core/TextField';

import Table from './Table';
import Pagination from './Pagination';
import AddStudent from './AddStudent';
import DeleteStudent from './DeleteStudent';
import EditStudent from './EditStudent';

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
    const [studentsPerPage] = useState(5);
    const [selected, setSelected] = useState('');
    const [editable, setEditable] = useState('');

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
        setSelected(value);
        let tStudents = students;
        const edit = tStudents.filter(s => (s.id === value))[0];
        setEditable(edit);
        console.log(edit)
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
                <EditStudent
                    selected={selected}
                    studentsUpdated={studentsUpdated}
                    year={editable.year}
                    sem={editable.sem}
                    programme={editable.programme}
                    group={editable.group}
                    subGroup={editable.subGroup}
                    id={editable.id}
                />
                <DeleteStudent selected={selected} studentsUpdated={studentsUpdated} />
                <AddStudent studentsUpdated={studentsUpdated} />
            </div>

        </div>
    )
}

export default Students