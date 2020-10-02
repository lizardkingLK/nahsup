import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardContent, Box, Button } from '@material-ui/core';

import MyChart from './MyChart';

import { channels } from '../../../shared/constants';
const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(1),
    },
    rowv2: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        padding: theme.spacing(1),
    },
    column: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: theme.spacing(1),
    },
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    myCard: {
        minWidth: '100%',
        margin: theme.spacing(1),
    },
    title: {
        fontSize: 14,
        fontWeight: 800,
    },
    body: {
        fontSize: 18,
    },
}));

export default function Statistics() {
    const classes = useStyles();
    const [buildings, setBuildings] = React.useState([]);
    const [rooms, setRooms] = React.useState([]);
    const [labs, setLabs] = React.useState([]);
    const [lectureHalls, setLectureHalls] = React.useState([]);

    const fetchBuildings = async () => {
        await ipcRenderer.send(channels.LOAD_BUILDINGS);
        ipcRenderer.on(channels.LOAD_BUILDINGS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_BUILDINGS);
            const bs = arg;
            setBuildings(bs);
        });
    }

    const fetchLocations = async () => {
        await ipcRenderer.send(channels.LOAD_ROOMS);
        ipcRenderer.on(channels.LOAD_ROOMS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_ROOMS);
            const rs = arg;
            setRooms(rs);
            setLectureHalls(rs.filter(r => r.rType === 'Lecture Hall'));
            setLabs(rs.filter(r => r.rType === 'Laboratory'));
        });
    }

    useEffect(() => {
        fetchBuildings();
        fetchLocations();
    }, [])

    return (
        <>
            {/* Lecturers */}


            {/* Locations */}
            <Box component="span" m={1} className={classes.row}>
                <Typography className={classes.title} color="textPrimary">
                    Statistical data on buildings, labs, lecture halls
                </Typography>
            </Box>
            <Box component="span" m={1} className={classes.column}>
                <Card className={classes.myCard} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Buildings
                                        </Typography>
                        <div className={classes.rowv2} >
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                Building ID
                                        </Typography>
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                # of rooms
                                        </Typography>
                        </div>
                        <hr />
                        {buildings.map(b => {
                            const bRooms = rooms.filter(r => r.bID === b.bID);
                            const bLabs = bRooms.filter(b => b.rType === 'Laboratory');
                            const bLecHalls = bRooms.filter(b => b.rType === 'Lecture Hall');
                            return (
                                <div key={Math.random()}>
                                    <div className={classes.rowv2}>
                                        <Typography className={classes.body} color="textSecondary" gutterBottom>
                                            • {b.bID}
                                        </Typography>
                                        <Typography className={classes.body} color="textSecondary" gutterBottom>
                                            {bRooms.length}
                                        </Typography>
                                    </div>
                                    <div className={classes.rowv2}>
                                        <Typography className={classes.body} color="textSecondary" gutterBottom>
                                            {bLabs.length} labs
                                                    </Typography>
                                        <Typography className={classes.body} color="textSecondary" gutterBottom>
                                            {bLecHalls.length} lecHalls
                                                    </Typography>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                        <div className={classes.rowv2}>
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                Total Rooms
                                        </Typography>
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                {rooms.length}
                            </Typography>
                        </div>
                        <div className={classes.rowv2}>
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                Total Buildings
                                        </Typography>
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                {buildings.length}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
                <Card className={classes.myCard} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Labs
                        </Typography>
                        <div className={classes.rowv2} >
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                Lab ID
                            </Typography>
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                capacity
                            </Typography>
                        </div>
                        <hr />
                        {labs.map(l => {
                            return (
                                <div key={Math.random()}>
                                    <div className={classes.rowv2}>
                                        <Typography className={classes.body} color="textSecondary" gutterBottom>
                                            • {l.rID}
                                        </Typography>
                                        <Typography className={classes.body} color="textSecondary" gutterBottom>
                                            {l.capacity}
                                        </Typography>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                        <div className={classes.rowv2}>
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                Total Labs
                                        </Typography>
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                {labs.length}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
                <Card className={classes.myCard} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Lecture Halls
                                    </Typography>
                        <div className={classes.rowv2} >
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                Lecture Hall ID
                                        </Typography>
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                capacity
                                        </Typography>
                        </div>
                        <hr />
                        {lectureHalls.map(l => {
                            return (
                                <div key={Math.random()}>
                                    <div className={classes.rowv2}>
                                        <Typography className={classes.body} color="textSecondary" gutterBottom>
                                            • {l.rID}
                                        </Typography>
                                        <Typography className={classes.body} color="textSecondary" gutterBottom>
                                            {l.capacity}
                                        </Typography>
                                    </div>
                                    <hr />
                                </div>
                            )
                        })}
                        <div className={classes.rowv2}>
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                Total Lecture Halls
                            </Typography>
                            <Typography className={classes.body} color="textSecondary" gutterBottom>
                                {lectureHalls.length}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Box>
            <Box component="span" m={1} className={classes.row}>
                <Typography className={classes.title} color="textPrimary">
                    Chart - Buildings against its Rooms
                </Typography>
            </Box>
            <Box component="span" m={1} className={classes.row}>
                <MyChart data={buildings.map(b => {
                    return (
                        { name: b.bID, value: rooms.filter(r => r.bID === b.bID).length }
                    )
                })} />
            </Box>

            {/* Students */}


            {/* Subjects */}


        </>
    );
}
