import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'grid',
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
    }
}));

export default function Welcome() {
    const classes = useStyles();

    return (
        <div className={classes.row}>
            <Card variant="outlined" className={classes.card}>
                <CardContent>
                    <Typography color="primary" gutterBottom>
                        Welcome
                </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">View</Button>
                </CardActions>
            </Card>
        </div>
    )
}
