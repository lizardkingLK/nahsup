import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Table from './Table';
import Pagination from './Pagination';

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

const createData = (rID, bID, capacity) => {
    return { rID, bID, capacity };
}

const Locations = () => {
    const classes = useStyles();

    const [locations, setLocations] = useState([
        createData('A501', 'A-Block', 120),
        createData('B502', 'B-Block', 120),
        createData('N3B-plcab', 'New Building', 60),
        createData('B502', 'B-Block', 120),
        createData('N3B-plcab', 'New Building', 60),
        createData('A501', 'A-Block', 120),
        createData('N3B-plcab', 'New Building', 60),
        createData('A501', 'A-Block', 120),
        createData('B502', 'B-Block', 120),
    ]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [locationsPerPage] = useState(3);

    // get current locations
    const indexOfLastLocation = currentPage * locationsPerPage;
    const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
    const currentLocations = locations.slice(indexOfFirstLocation, indexOfLastLocation);

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="locations">
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
                >
                    <EditIcon />
                </IconButton>
                <IconButton
                    size="medium"
                    color="primary"
                    component="span"
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    size="medium"
                    color="primary"
                    component="span"
                >
                    <AddIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Locations