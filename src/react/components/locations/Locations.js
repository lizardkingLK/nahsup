import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, TextField } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import Skeleton from '@material-ui/lab/Skeleton';

import Table from './Table';
import Pagination from './Pagination';
import AdvancedSearch from './AdvancedSearch';
import AddLocation from './AddLocation';
import DeleteLocation from './DeleteLocation';
import EditLocation from './EditLocation';
import Preferences from './Preferences';

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
        marginTop: theme.spacing(3),
        minWidth: 650,
    },
    pref: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 200,
    },
    pagination: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }
}))

const createData = (rID, rType, bID, capacity, id) => {
    return { rID, rType, bID, capacity, id };
}

const Locations = () => {
    const classes = useStyles();
    const [locations, setLocations] = React.useState([]);
    const [buildings, setBuildings] = React.useState([]);
    const [tags, setTags] = React.useState([]);
    const [subjects, setSubjects] = React.useState([]);
    const [lecturers, setLecturers] = React.useState([]);
    const [groupIDs, setGroupIDs] = React.useState([]);
    const [subGroupIDs, setSubGroupIDs] = React.useState([]);
    const [sessions, setSessions] = React.useState([]);

    const [loading, setLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [locationsPerPage] = React.useState(5);
    const [selected, setSelected] = React.useState('');
    const [editable, setEditable] = React.useState('');

    // get current locations
    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations = locations.slice(indexOfFirstLocation, indexOfLastLocation);

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const fetchLocations = async () => {
        setLoading(true);
        await ipcRenderer.send(channels.LOAD_ROOMS);

        ipcRenderer.on(channels.LOAD_ROOMS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_ROOMS);
            const rs = arg;
            const rsArray = rs.map(r => createData(r.rID, r.rType, r.bID, r.capacity, r.id))
            setLocations(rsArray);
        });
        setLoading(false);
    }

    const fetchBuildings = async () => {
        ipcRenderer.send(channels.LOAD_BUILDINGS);

        ipcRenderer.on(channels.LOAD_BUILDINGS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_BUILDINGS);
            const bs = arg;
            setBuildings(bs);
        });
    }

    const fetchTags = async () => {
        ipcRenderer.send(channels.LOAD_TAGS);

        ipcRenderer.on(channels.LOAD_TAGS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_TAGS);
            const ts = arg;
            setTags(ts);
        });
    }

    const fetchSubjects = async () => {
        ipcRenderer.send(channels.LOAD_SUBJECTS);

        ipcRenderer.on(channels.LOAD_SUBJECTS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_SUBJECTS);
            const ss = arg;
            setSubjects(ss);
        });
    }

    const fetchLecturers = async () => {
        ipcRenderer.send(channels.LOAD_LECTURERS);

        ipcRenderer.on(channels.LOAD_LECTURERS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_LECTURERS);
            const ls = arg;
            setLecturers(ls);
        });
    }

    const fetchGroupIDs = async () => {
        ipcRenderer.send(channels.LOAD_GROUPID);

        ipcRenderer.on(channels.LOAD_GROUPID, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_GROUPID);
            const gids = arg;
            setGroupIDs(gids);
        });
    }

    const fetchSubGroupIDs = async () => {
        ipcRenderer.send(channels.LOAD_SUBGROUPID);

        ipcRenderer.on(channels.LOAD_SUBGROUPID, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_SUBGROUPID);
            const sgids = arg;
            setSubGroupIDs(sgids);
        });
    }

    const fetchSessions = async () => {
        ipcRenderer.send(channels.LOAD_SESSIONS);

        ipcRenderer.on(channels.LOAD_SESSIONS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_SESSIONS);
            const sess = arg;
            setSessions(sess);
        });
    }

    // useeffect => runs when mounted and also when content gets updated
    React.useEffect(() => {
        fetchBuildings();
        fetchLocations();
        fetchTags();
        fetchSubjects();
        fetchLecturers();
        fetchGroupIDs();
        fetchSubGroupIDs();
        fetchSessions();
    }, []);

    // refresh table
    const locationsUpdated = () => {
        fetchLocations();
    }

    // location selection changed
    const handleRadioChange = (value) => {
        setSelected(value);
        let tLocations = locations;
        const edit = tLocations.filter(l => (l.id === value))[0];
        setEditable(edit);
    }

    // prompted building for advanced search
    const filterChanged = async (value) => {
        console.log(value)
        setLoading(true);
        await ipcRenderer.send(channels.LOAD_ROOMS);

        ipcRenderer.on(channels.LOAD_ROOMS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_ROOMS);
            const rs = arg;
            const rsArray = rs.map(r => createData(r.rID, r.rType, r.bID, r.capacity, r.id))
            setLocations(rsArray.filter(l => l.bID === value));
        });
        setLoading(false);
    }

    // search handle
    const handleChange = async (e) => {
        e.preventDefault();
        const keyword = e.target.value;
        if (keyword) {
            setLoading(true);
            await ipcRenderer.send(channels.SEARCH_ROOMS, { keyword });

            ipcRenderer.on(channels.SEARCH_ROOMS, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.SEARCH_ROOMS);
                const rs = arg;
                const rsArray = rs.map(r => createData(r.rID, r.rType, r.bID, r.capacity, r.id))
                setLocations(rsArray);
            });
            setLoading(false);
        }
    }

    return (
        <div className="locations">
            <div className={classes.row}>
                <AdvancedSearch
                    buildings={buildings}
                    filterChanged={filterChanged}
                />
                <IconButton
                    size="small"
                    color="primary"
                    component="span"
                    onClick={fetchLocations}
                >
                    <RefreshIcon />
                </IconButton>
                <form noValidate autoComplete="off" onSubmit={handleChange}>
                    <div>
                        <TextField
                            id="search_location"
                            size="small"
                            label="Search Locations..."
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>

            {!loading ? (
                <>
                    <div className={classes.row}>
                        <Table
                            locations={currentLocations}
                            loading={loading}
                            handleRadioChange={handleRadioChange}
                        />
                    </div>

                    <div className={classes.pagination}>
                        <Pagination
                            locationsPerPage={locationsPerPage}
                            totalLocations={locations.length}
                            paginate={paginate}
                        />
                    </div>
                </>
            ) : (
                    <>
                        <div className={classes.row}>
                            <Skeleton variant="rect" width={650} height={450} />
                            <Skeleton width={200} />
                        </div>
                    </>
                )}

            <div className={classes.row}>
                <EditLocation
                    buildings={buildings}
                    selected={selected}
                    setSelected={setSelected}
                    locationsUpdated={locationsUpdated}
                    rid={editable.rID}
                    type={editable.rType}
                    bid={editable.bID}
                    cap={editable.capacity}
                    lid={editable.id}
                />
                <DeleteLocation
                    selected={selected}
                    locationsUpdated={locationsUpdated}
                />
                <AddLocation
                    locationsUpdated={locationsUpdated}
                    buildings={buildings}
                    fetchBuildings={fetchBuildings}
                />
                <Preferences
                    locations={locations}
                    tags={tags}
                    subjects={subjects}
                    lecturers={lecturers}
                    groupIDs={groupIDs}
                    subGroupIDs={subGroupIDs}
                    sessions={sessions}
                />
            </div>
        </div>
    )
}

export default Locations;