import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { MobileStepper, Paper, Typography, IconButton } from '@material-ui/core';

const tutorialSteps = [
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
];

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 400,
        flexGrow: 1,
        backgroundColor: 'transparent',
        marginTop: '2vh'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        backgroundColor: 'transparent',
        color: 'var(--primaryAccent)',
    },
    img: {
        height: 255,
        maxWidth: 400,
        overflow: 'hidden',
        display: 'block',
        width: '100%',
    },
}));

export default function TextMobileStepper() {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <div className={classes.root}>
            <img
                className={classes.img}
                src={tutorialSteps[activeStep].imgPath}
                alt={tutorialSteps[activeStep].label}
            />
            <MobileStepper
                variant="dots"
                steps={7}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <IconButton size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </IconButton>
                }
                backButton={
                    <IconButton size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                    </IconButton>
                }
            />
            <Paper square elevation={0} className={classes.header}>
                <Typography variant="body1" component="h2">{tutorialSteps[activeStep].label}</Typography>
            </Paper>
        </div>
    );
}
