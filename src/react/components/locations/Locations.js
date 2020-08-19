import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Table from './Table';
import Pagination from './Pagination';
import AdvancedSearch from './AdvancedSearch';
import AddLocation from './AddLocation';

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

const createData = (rID, rType, bID, capacity, id) => {
    return { rID, rType, bID, capacity, id };
}

const Locations = () => {
    const classes = useStyles();
    const [locations, setLocations] = useState([]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [locationsPerPage] = useState(3);
    const [selected, setSelected] = useState('');

    // get current locations
    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations = locations.slice(indexOfFirstLocation, indexOfLastLocation);

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    // useeffect => runs when mounted and also when content gets updated
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

    useEffect(() => {
        fetchLocations();
    }, []);

    // refresh table
    const locationsUpdated = () => {
        fetchLocations();
    }

    // location selection changed
    const handleRadioChange = (value) => {
        console.log(value)
        setSelected(value)
    }

    // prompted building for advanced search
    const filterChanged = (value) => {
        console.log(value)
        setLocations(locations.filter(l => l.bID === value));
    }

    return (
        <div className="locations">
            <div className={classes.row}>
                <AdvancedSearch
                    filterChanged={filterChanged}
                />
                <IconButton
                    size="small"
                    color="primary"
                    component="span"
                    disabled={selected === ''}
                >
                    <InfoIcon />
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
                <IconButton
                    size="medium"
                    color="primary"
                    component="span"
                    disabled={selected === ''}
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    size="medium"
                    color="primary"
                    component="span"
                    disabled={selected === ''}
                >
                    <DeleteIcon />
                </IconButton>
                <AddLocation locationsUpdated={locationsUpdated} />
            </div>
        </div>
    )
}

export default Locations