import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Drawer, AppBar, Toolbar, CssBaseline, Typography, Divider, IconButton, List, ListItem, ListItemText, ListItemIcon
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import Welcome from '../welcome/Welcome';
import Lecturers from '../lecturers/Lecturers';
import Locations from '../locations/Locations';
import Sessions from '../sessions/Sessions';
import Statistics from '../statistics/Statistics';
import Students from '../students/Students';
import Subjects from '../subjects/Subjects';
import Tags from '../tags/Tags';
import WorkingHours from '../workingHours/WorkingHours';
import Unavailability from '../unAvailability/Unavailability';
import ParallelSessions from '../parallelSessions/ParallelSessions';
import ConsecutiveSessions from '../consecutiveSessions/ConsecutiveSessions';
import GenerateTT from '../generateTT/generateTT';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    img: {
        width: '25px',
        height: '25px',
        display: 'block'
    }
}));

const tabs = [
    {
        label: 'Lecturers',
        imgPath:
            require('../../images/lecturers.svg'),
        component: Lecturers
    },
    {
        label: 'Locations',
        imgPath:
            require('../../images/locations.svg'),
        component: Locations
    },
    {
        label: 'Statistics',
        imgPath:
            require('../../images/statistics.svg'),
        component: Statistics
    },
    {
        label: 'Students',
        imgPath:
            require('../../images/students.svg'),
        component: Students
    },
    {
        label: 'Subjects',
        imgPath:
            require('../../images/subjects.svg'),
        component: Subjects
    },
    {
        label: 'Tags',
        imgPath:
            require('../../images/tags.svg'),
        component: Tags
    },
    {
        label: 'Working Hours',
        imgPath:
            require('../../images/working_hours.svg'),
        component: WorkingHours
    },
    {
        label: 'Sessions',
        imgPath:
            require('../../images/sessions.svg'),
        component: Sessions
    },
    {
        label: 'Consecutive Sessions',
        imgPath:
            require('../../images/cons.svg'),
        component: ConsecutiveSessions
    },
    {
        label: 'Parallel Sessions',
        imgPath:
            require('../../images/para.svg'),
        component: ParallelSessions
    },
    {
        label: 'Unavailability',
        imgPath:
            require('../../images/unavail.svg'),
        component: Unavailability
    },
    {
        label: 'Generate Time Table',
        imgPath:
            require('../../images/undraw_time_management_30iu.svg'),
        component: GenerateTT
    }
]

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [label, setLabel] = React.useState('');

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {tabs.map((tab, index) => (
                        <ListItem button key={index} onClick={() => setLabel(tab.label)}>
                            <ListItemIcon>
                                <img className={classes.img} alt={tab.label} src={tab.imgPath} />
                            </ListItemIcon>
                            <ListItemText primary={tab.label} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography variant="body1" component="h1" color="primary">
                    {label}
                </Typography>
                <div>
                    {!label ?
                        <Welcome /> :
                        <>
                            {tabs.map((t, i) => {
                                if (t.label === label)
                                    return (
                                        <div key={i}>
                                            <t.component />
                                        </div>
                                    )
                                else
                                    return null
                            })}
                        </>
                    }
                </div>
            </main>
        </div>
    );
}
