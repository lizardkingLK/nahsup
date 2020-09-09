import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
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
}));

const tabs = [
    {
        label: 'Lecturers',
        imgPath:
            require('../../images/lecturers.svg'),
    },
    {
        label: 'Locations',
        imgPath:
            require('../../images/locations.svg'),
    },
    {
        label: 'Statistics',
        imgPath:
            require('../../images/statistics.svg'),
    },
    {
        label: 'Students',
        imgPath:
            require('../../images/students.svg'),
    },
    {
        label: 'Subjects',
        imgPath:
            require('../../images/subjects.svg'),
    },
    {
        label: 'Tags',
        imgPath:
            require('../../images/tags.svg'),
    },
    {
        label: 'Working Hours',
        imgPath:
            require('../../images/working_hours.svg'),
    },
    {
        label: 'Sessions',
        imgPath:
            require('../../images/sessions.svg'),
    }
]

export default function SimpleAccordion() {
    const classes = useStyles();

    return (
        <div className={classes.row}>
            <div className={classes.root}>
                {tabs.map(t => {
                    return (
                        <Accordion key={t.label}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography className={classes.heading}>{t.label}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    )
                })}
            </div>
        </div>
    );
}
