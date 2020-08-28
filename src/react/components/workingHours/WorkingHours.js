import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';

import Table from './Table';
import Pagination from './Pagination';
import AddSchedule from './AddSchedule';
import DeleteSchedule from './DeleteSchedule';
import EditSchedule from './EditSchedule';

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

const createData = (_id, dayCount,workingDays,hrs,mins,duration) => {
    return { _id, dayCount,workingDays,hrs,mins,duration};
}

const WorkingHours = () => {
    const classes = useStyles();
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [schedulesPerPage] = useState(3);
    const [selected, setSelected] = useState('');
    const [editable, setEditable] = useState('');

    // get current Schedules
    const indexOfLastSchedule = currentPage * schedulesPerPage;
    const indexOfFirstSchedule = indexOfLastSchedule - schedulesPerPage;
    const currentSchedules = schedules.slice(indexOfFirstSchedule, indexOfLastSchedule);

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const fetchSchedules = async () => {
        setLoading(true);
        await ipcRenderer.send(channels.LOAD_SCHEDULE);

        ipcRenderer.on(channels.LOAD_SCHEDULE, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_SCHEDULE);
            const sh = arg;
            const shArray = sh.map(s => createData(s._id, s.dayCount,s.workingDays,s.hrs,s.mins,s.duration))
            setSchedules(shArray);
        });
        setLoading(false);
    }

   

    // useeffect => runs when mounted and also when content gets updated
    useEffect(() => {
        fetchSchedules();
      
    }, []);

    // refresh table
    const scheduleUpdated = () => {
        fetchSchedules();
    }

    // Schedule selection changed
    const handleRadioChange = (value) => {
        setSelected(value);
        let tSchedules = schedules;
        const edit = tSchedules.filter(l => (l._id === value))[0];
        setEditable(edit); 
    }



    return (
        <div className="locations">
            <div className={classes.row}>
                <IconButton
                    size="small"
                    color="primary"
                    component="span"
                    onClick={fetchSchedules}
                >
                    <RefreshIcon />
                </IconButton>
            </div>

            <div className={classes.row}>
                <Table
                    schedules={currentSchedules}
                    loading={loading}
                    handleRadioChange={handleRadioChange}
                />
            </div>

            <div className={classes.pagination}>
                <Pagination
                    schedulesPerPage={schedulesPerPage}
                    totalSchedules={schedules.length}
                    paginate={paginate}
                />
            </div>

            <div className={classes.row}>
                <EditSchedule
                    selected={selected}
                    scheduleUpdated={scheduleUpdated}
                    _id={editable._id}
                    dayCount={editable.dayCount}
                    workingDays={editable.workingDays}
                    hrs={editable.hrs}
                    mins={editable.mins}
                    duration={editable.duration} 
                />
                <DeleteSchedule
                    selected={selected}
                    scheduleUpdated={scheduleUpdated}
                />
                <AddSchedule
                    scheduleUpdated={scheduleUpdated}
                    Schedules={schedules}
                />
            </div>
        </div>
    )
}

export default WorkingHours