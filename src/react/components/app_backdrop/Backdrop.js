import React from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: 'var(--primaryLight)',
    },
}));

export default function SimpleBackdrop() {
    const classes = useStyles();
    const [open] = React.useState(true);

    return (
        <div>
            <Backdrop className={classes.backdrop} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </div>
    );
}
