import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

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
        minWidth: 250,
        margin: theme.spacing(1),
    },
    title: {
        fontSize: 14,
        fontWeight: 800,
    },
    body: {
        fontSize: 12,
    },
}));

export default function Statistics() {
    const classes = useStyles();
    const [buildings, setBuildings] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [labs, setLabs] = useState([]);
    const [lectureHalls, setLectureHalls] = useState([]);

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
        <div className={classes.row}>
            <div className={classes.root}>
                {/* Lecturers */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            Lecturers
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Lecturers
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                {/* Locations */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            Locations
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails className={classes.column}>
                        <Box component="span" m={1} className={classes.row}>
                            <Typography className={classes.title} color="textPrimary">
                                Statistical data on buildings, labs, lecture halls
                            </Typography>
                        </Box>
                        <Box component="span" m={1} className={classes.rowv2}>
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
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
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
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
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
                                <CardActions>
                                    <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                        </Box>
                    </AccordionDetails>
                </Accordion>

                {/* Students */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            Students
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Students
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                {/* Subjects */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            Subjects
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Subjects
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                {/* Working Hours */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            Working Hours
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Working Hours
                        </Typography>
                    </AccordionDetails>
                </Accordion>

                {/* Sessions */}
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>
                            Sessions
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Sessions
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
