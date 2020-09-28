import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        textAlign: 'center',
        height: '70vh',
    },
    card: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        height: 150,
        width: 200,
        backgroundColor: 'var(--primaryLight)',
    },
    image: {
        height: 400,
        width: 400,
    },
    title: {
        color: 'var(--primaryAccent)',
        fontFamily: 'Lato, sans-serif',
    },
    subTitle: {
        color: 'var(--secondaryAccent)',
        fontFamily: 'Lato, sans-serif',
    },
}));

export default function Welcome() {
    const classes = useStyles();

    return (
        <div className={classes.row}>
            <Typography className={classes.title} variant="h2" gutterBottom>
                Welcome
            </Typography>
            <Typography className={classes.subTitle} variant="h4" gutterBottom>
                Time-Tables Admin
            </Typography>
        </div>
    )
}
