import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';

import Table from './Table';
import Pagination from './Pagination';
import AddSubject from './AddSubject';
import DeleteSubject from './DeleteSubject';
import EditSubject from './EditSubject';

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
        marginTop: theme.spacing(2),
        minWidth: 650,
    },
    pref: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 200,
    },
    labeledButton: {
        margin: theme.spacing(1),
    },
}))

const createData = (subCode, year, sem, name, lecHrs, tuteHrs, labHrs, evalHrs, id) => {
    return { subCode, year, sem, name, lecHrs, tuteHrs, labHrs, evalHrs, id };
}

const Subjects = () => {
    const classes = useStyles();
    const [subjects, setSubjects] = useState([]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [subjectsPerPage] = useState(5);
    const [selected, setSelected] = useState('');
    const [editable, setEditable] = useState('');

    // get current Subjects
    const indexOfLastSubject = currentPage * subjectsPerPage;
    const indexOfFirstSubject = indexOfLastSubject - subjectsPerPage;
    const currentSubjects = subjects.slice(indexOfFirstSubject, indexOfLastSubject);

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const fetchSubjects = async () => {
        setLoading(true);
        await ipcRenderer.send(channels.LOAD_SUBJECTS);

        ipcRenderer.on(channels.LOAD_SUBJECTS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_SUBJECTS);
            const rs = arg;
            const subArray = rs.map(r => createData(
                r.subCode, r.year, r.sem, r.name, r.lecHrs, r.tuteHrs, r.labHrs, r.evalHrs, r.id
            ))
            setSubjects(subArray);
        });
        setLoading(false);
    }

    // useeffect => runs when mounted and also when content gets updated
    useEffect(() => {
        fetchSubjects();
    }, []);

    // refresh table
    const subjectsUpdated = () => {
        fetchSubjects();
    }

    // subject selection changed
    const handleRadioChange = (value) => {
        setSelected(value);
        let tSubjects = subjects;
        const edit = tSubjects.filter(s => (s.id === value))[0];
        setEditable(edit);
        console.log(edit)
    }

    return (
        <div className="subjects">
            <div className={classes.row}>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.labeledButton}
                    startIcon={<SearchIcon />}
                >
                    Advanced
                </Button>
                <IconButton
                    size="small"
                    color="primary"
                    component="span"
                    onClick={fetchSubjects}
                >
                    <RefreshIcon />
                </IconButton>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="search_location"
                            size="small"
                            label="Search Locations..."
                        />
                    </div>
                </form>
            </div>

            <div className={classes.row}>
                <Table
                    subjects={currentSubjects}
                    loading={loading}
                    handleRadioChange={handleRadioChange}
                />
            </div>

            <div className={classes.pagination}>
                <Pagination
                    subjectsPerPage={subjectsPerPage}
                    totalSubjects={subjects.length}
                    paginate={paginate}
                />
            </div>

            <div className={classes.row}>
                <EditSubject
                    selected={selected}
                    subjectsUpdated={subjectsUpdated}
                    subCode={editable.subCode}
                    year={editable.year}
                    sem={editable.sem}
                    name={editable.name}
                    lecHrs={editable.lecHrs}
                    tuteHrs={editable.tuteHrs}
                    labHrs={editable.labHrs}
                    evalHrs={editable.evalHrs}
                    id={editable.id}
                />
                <DeleteSubject selected={selected} subjectsUpdated={subjectsUpdated} />
                <AddSubject subjectsUpdated={subjectsUpdated} />
            </div>
        </div>
    )
}

export default Subjects