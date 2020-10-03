import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, IconButton, Paper, Tabs, Tab, TextField, Typography, Accordion, AccordionSummary, AccordionDetails
} from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import Autocomplete from '@material-ui/lab/Autocomplete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Table from './Table';
import Pagination from './Pagination';

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
    }
}))

// const createData = (_id, dayCount, workingDays, stime, duration, wtime) => {
//     return { _id, dayCount, workingDays, stime, duration, wtime };
// }

const WorkingHours = () => {
    const classes = useStyles();
    const [schedule, setSchedule] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [schedulesPerPage] = React.useState(3);
    // const [selected, setSelected] = React.useState('');
    // const [editable, setEditable] = React.useState('');
    const [buildings, setBuildings] = React.useState([]);
    const [sessions, setSessions] = React.useState([]);
    const [locations, setLocations] = React.useState([]);
    const [lecturers, setLecturers] = React.useState([]);
    const [students, setStudents] = React.useState([]);
    const [buildingID, setBuildingID] = React.useState(null);
    const [lecturer, setLecturer] = React.useState(null);
    const [year, setYear] = React.useState(null);
    const [programme, setProgramme] = React.useState(null);
    // const [groupId, setGroupId] = React.useState(null);
    const [tabVal, setTabVal] = React.useState(0);
    // const [searchVal, setSearchVal] = React.useState('');

    // const [state, setState] = React.useState({
    //     age: '',
    //     name: 'hai',
    // });
    // const childRef = React.useRef();
    // get current Schedules
    const indexOfLastSchedule = currentPage * schedulesPerPage;
    const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
    const years = ["1", "2", "3", "4"];

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const fetchBuildings = async () => {
        var bs = [];
        ipcRenderer.send(channels.LOAD_BUILDINGS);

        ipcRenderer.on(channels.LOAD_BUILDINGS, async (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_BUILDINGS);
            bs = arg;

            setBuildings(bs);
        });
    }

    const fetchLocations = async () => {
        await ipcRenderer.send(channels.LOAD_ROOMS);
        ipcRenderer.on(channels.LOAD_ROOMS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_ROOMS);
            const rs = arg;
            setLocations(rs);
        });

    }
    const fetchLecturers = async () => {
        await ipcRenderer.send(channels.LOAD_LECTURERS);
        ipcRenderer.on(channels.LOAD_LECTURERS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_LECTURERS);
            const rs = arg;
            setLecturers(rs);
        });
    }

    const fetchSchedule = async () => {
        await ipcRenderer.send(channels.LOAD_SCHEDULE);
        ipcRenderer.on(channels.LOAD_SCHEDULE, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_SCHEDULE);
            const rs = arg;
            setSchedule(rs);
            // console.log(schedule);
        });
        setLoading(true);
    }

    const fetchStudents = async () => {
        await ipcRenderer.send(channels.LOAD_STUDENTS_FOR_TT);
        ipcRenderer.on(channels.LOAD_STUDENTS_FOR_TT, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_STUDENTS_FOR_TT);
            const rs = arg;
            setStudents(rs);
        });
    }

    const fetchSessions = async () => {
        await ipcRenderer.send(channels.LOAD_SESSIONS);
        ipcRenderer.on(channels.LOAD_SESSIONS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_SESSIONS);
            const rs = arg;
            setSessions(rs);
        });
    }

    // useeffect => runs when mounted and also when content gets updated
    React.useEffect(() => {
        fetchBuildings();
        fetchLocations();
        fetchLecturers();
        fetchStudents();
        fetchSessions();
        fetchSchedule();
    }, []);

    const scheduleUpdated = () => {
        // fetchSchedule();
    }

    // Schedule selection changed
    const handleChange = (event, newValue) => {
        setTabVal(newValue);
    };
    function StudentTT(props) {
        return <Paper className={classes.root}>
            <div className={classes.row}>

                <Autocomplete
                    id="combo-box-demo"
                    options={years}
                    size="small"
                    onChange={(_, val) => { setYear(val); }}
                    value={year}
                    style={{ width: '20%', margin: 5 }}
                    renderInput={(params) => <TextField  {...params} label="year & Semester" variant="outlined" />}
                />
                <Autocomplete
                    id="combo-box-demo"
                    options={students.filter(b => b.year === year)}
                    size="small"
                    onChange={(_, val) => { setProgramme(val); }}
                    getOptionLabel={(option) => option.programme}
                    value={programme}
                    style={{ width: '20%', margin: 5 }}
                    renderInput={(params) => <TextField  {...params} label="Program" variant="outlined" />}
                />

                <Autocomplete
                    id="combo-box-demo"
                    options={students.filter(b => b.year === year).map(r => r.groupIdLabel)}
                    size="small"
                    //getOptionLabel={(option) => option.group}

                    style={{ width: '20%', margin: 5 }}
                    renderInput={(params) => <TextField  {...params} label="Group" variant="outlined" />}
                />
                <Button variant="contained" color="primary" style={{ marginLeft: '15%' }}>
                    View
                </Button>
                <Button variant="contained" color="primary" >
                    Print
                </Button>
            </div>
        </Paper>;
    }

    function LecturerTT(props) {
        return <Paper className={classes.root}>
            <div className={classes.row}>
                <Autocomplete
                    id="combo-box-demo"
                    options={lecturers.map(option => option.name)}
                    size="small"
                    onChange={(_, val) => { setLecturer(val); }}
                    value={lecturer}
                    style={{ width: '20%', margin: 5 }}
                    renderInput={(params) => <TextField  {...params} label="Lecurer" variant="outlined" />}
                />
                <Button variant="contained" color="primary" onClick="viewTable" >
                    View
                </Button>
                <Button variant="contained" color="primary" >
                    Print
                </Button>
            </div>
        </Paper>;
    }

    function RoomTT(props) {
        return <Paper className={classes.root}>
            <div className={classes.row}>
                <Autocomplete
                    id="combo-box-demo"
                    options={buildings.map(option => option.bID)}
                    size="small"
                    onChange={(_, val) => { setBuildingID(val); }}
                    value={buildingID}
                    style={{ width: '20%', margin: 5 }}
                    renderInput={(params) => <TextField  {...params} label="Building" variant="outlined" />}
                />
                <Autocomplete
                    id="combo-box-demo"
                    options={locations.filter(b => b.bID === buildingID)}
                    size="small"
                    getOptionLabel={(option) => option.rID}
                    style={{ width: '20%', margin: 5 }}
                    renderInput={(params) => <TextField  {...params} label="Room" variant="outlined" />}
                />
                <Button variant="contained" color="primary" style={{ marginLeft: '25%' }} >
                    View
                </Button>
                <Button variant="contained" color="primary"  >
                    Print
                </Button>
            </div>
        </Paper>;
    }

    function Greeting(props) {
        const isLoggedIn = props.isLoggedIn;
        if (tabVal === 0) {
            return <StudentTT />;
        } else if (tabVal === 1) {
            return <LecturerTT />;
        } else {
            return <RoomTT />;
        }
    }

    return (
        <div className="locations">

            <div className={classes.row}>
                <IconButton
                    size="small"
                    color="primary"
                    component="span"
                >
                    <RefreshIcon />
                </IconButton>
            </div>

            <Paper className={classes.root}>
                <Tabs
                    value={tabVal}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Student" />
                    <Tab label="Lecturer" />
                    <Tab label="Room" />
                </Tabs>
            </Paper>

            <div className={classes.row}>
                {
                    schedule.length > 0 ? <Table
                        sessions={sessions}
                        schedule={schedule}

                        scheduleUpdated={scheduleUpdated}
                    // handleRadioChange={handleRadioChange}
                    // ref={childRef}
                    /> : <h1> Loading </h1>
                }
            </div>

            <div className={classes.pagination}>
                <Pagination
                    schedulesPerPage={schedulesPerPage}
                    paginate={paginate}
                />
            </div>

            <Greeting isLoggedIn={tabVal} />
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Conflicts</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export default WorkingHours