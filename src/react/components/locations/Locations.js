import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Table from './Table';
import Pagination from './Pagination';
import AdvancedSearch from './AdvancedSearch';
import AddLocation from './AddLocation';
import DeleteLocation from './DeleteLocation';
import EditLocation from './EditLocation';

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

const createData = (rID, rType, bID, capacity, id) => {
    return { rID, rType, bID, capacity, id };
}

const Locations = () => {
    const classes = useStyles();
    const [locations, setLocations] = useState([]);
    const [buildings, setBuildings] = useState([]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [locationsPerPage] = useState(3);
    const [selected, setSelected] = useState('');
    const [editable, setEditable] = useState('');

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

    // useeffect => runs when mounted and also when content gets updated
    useEffect(() => {
        fetchLocations();
        fetchBuildings();
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
        console.log(edit)
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

            <div className={classes.row}>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.pref}
                >
                    <Typography variant="caption" component="h3">
                        Lecturer Preferences
                </Typography>
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.pref}
                >
                    <Typography variant="caption" component="h3">
                        Group Preferences
                </Typography>
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.pref}
                >
                    <Typography variant="caption" component="h3">
                        Session Preferences
                </Typography>
                </Button>
            </div>

            <div className={classes.row}>
                <EditLocation
                    buildings={buildings}
                    selected={selected}
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
            </div>
        </div>
    )
}

export default Locations;