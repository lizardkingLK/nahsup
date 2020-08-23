import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(1),
    },
    card: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        minHeight: 450,
        minWidth: 300,
    },
    image: {
        height: 300,
        width: 250,
    }
}))

const Statistics = () => {
    const classes = useStyles();
    return (
        <div className={classes.row}>
            <Card variant="outlined" className={classes.card}>
                <CardContent>
                    <img className={classes.image} src={require('../../images/lecturers.svg')} alt="lecturers" />
                    <Typography color="primary" gutterBottom>
                        Lecturers
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">View</Button>
                </CardActions>
            </Card>

            <Card variant="outlined" className={classes.card}>
                <CardContent>
                    <img className={classes.image} src={require('../../images/students.svg')} alt="students" />
                    <Typography color="primary" gutterBottom>
                        Students
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">View</Button>
                </CardActions>
            </Card>

            <Card variant="outlined" className={classes.card}>
                <CardContent>
                    <img className={classes.image} src={require('../../images/subjects.svg')} alt="subjects" />
                    <Typography color="primary" gutterBottom>
                        Subjects
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">View</Button>
                </CardActions>
            </Card>
        </div>
    )
}

export default Statistics