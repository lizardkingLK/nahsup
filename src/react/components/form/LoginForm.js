import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
            width: '300px',
            color: 'var(--primaryAccent)'
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
    },
}));

export default function BasicTextFields() {
    const classes = useStyles();

    const [loginState, setLoginState] = useState(' ');

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField type="email" label="email" onChange={(e) => setLoginState(e.target.value)} />
            <TextField type="password" label="password" />
            <Button variant="outlined">OK</Button>
            <Typography variant="caption" component="h1">{loginState}</Typography>
        </form>
    );
}
