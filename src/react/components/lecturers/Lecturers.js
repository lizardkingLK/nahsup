import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from "@material-ui/icons/Refresh";

import Table from './Table';
import Pagination from './Pagination';
import AddLecturer from './AddLecturer';
import DeleteLecturer from "./DeleteLecturer";
import EditLecturer from "./EditLecturer";

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

const createData = (eId, name, faculty, dep, center, building, level, rank, id) => {
    return { eId, name, faculty, dep, center, building, level, rank, id };
}

const Lecturers = () => {
    const classes = useStyles();
    const [lecturers, setLecturers] = React.useState([]);

    const [loading, setLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [lecturersPerPage] = React.useState(5);
    const [selected, setSelected] = React.useState('');
    const [editable, setEditable] = React.useState('');

    // get current lecturers
    const indexOfLastLecturer = currentPage * lecturersPerPage;
    const indexOfFirstLecturer = indexOfLastLecturer - lecturersPerPage;
    const currentLecturers = lecturers.slice(indexOfFirstLecturer, indexOfLastLecturer);

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const fetchLecturers = async () => {
        setLoading(true);
        await ipcRenderer.send(channels.LOAD_LECTURERS);

        ipcRenderer.on(channels.LOAD_LECTURERS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_LECTURERS);
            const rs = arg;
            const rsArray = rs.map(r => createData(r.eId, r.name, r.faculty, r.dep, r.center, r.building, r.level, r.rank, r.id))
            setLecturers(rsArray);
        });
        setLoading(false);
    }

    // useeffect => runs when mounted and also when content gets updated
    React.useEffect(() => {
        fetchLecturers();
    }, []);

    // refresh table
    const lecturersUpdated = () => {
        fetchLecturers();
    }

    // lecturer selection changed
    const handleRadioChange = (value) => {
        setSelected(value);
        let tLecturers = lecturers;
        const edit = tLecturers.filter(l => (l.id === value))[0];
        setEditable(edit);
        console.log(edit)
    }

    return (
        <div className="lecturers">
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
                    onClick={fetchLecturers}
                >
                    <RefreshIcon />
                </IconButton>
                <form noValidate autoComplete="off">
                    <div>
                        <TextField
                            id="search_location"
                            size="small"
                            label="Search Lecturers..."
                        />
                    </div>
                </form>
            </div>

            <div className={classes.row}>
                <Table
                    lecturers={currentLecturers}
                    loading={loading}
                    handleRadioChange={handleRadioChange}
                />
            </div>

            <div className={classes.pagination}>
                <Pagination
                    lecturersPerPage={lecturersPerPage}
                    totalLecturers={lecturers.length}
                    paginate={paginate}
                />
            </div>


            <div className={classes.row}>

                <EditLecturer
                    selected={selected}
                    lecturersUpdated={lecturersUpdated}
                    ueId={editable.eId}
                    uname={editable.name}
                    ufaculty={editable.faculty}
                    udep={editable.dep}
                    ucenter={editable.center}
                    ubuilding={editable.building}
                    ulevel={editable.level}
                    urank={editable.rank}
                    id={editable.id}
                />
                <AddLecturer lecturersUpdated={lecturersUpdated} />
                <DeleteLecturer selected={selected} lecturersUpdated={lecturersUpdated} />


            </div>
        </div>
    )
}



export default Lecturers