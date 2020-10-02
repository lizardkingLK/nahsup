import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, IconButton, Dialog, DialogActions, DialogContent, DialogTitle, Card, Select, MenuItem
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        margin: theme.spacing(1),
    },
    sides: {
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        minWidth: 240,
    },
    myInput: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
        minWidth: 200,
    },
    columnContent: {
        margin: theme.spacing(2),
    },
    myRowInputs: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
    },
    myRowInput: {
        width: 100
    },
    myAlert: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
}))

export default function AddConSession({
    sessions, sessionA, setSessionA, sessionB, setSessionB, conSessionAddSuccess, handleSubmit, setConSessionAddSuccess
}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setConSessionAddSuccess({ type: 'info', msg: 'Enter Consecutive Session Info' });
    };

    return (
        <div>
            <IconButton
                size="medium"
                color="primary"
                component="span"
                onClick={handleClickOpen}
            >
                <AddIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Consecutive Session</DialogTitle>
                <DialogContent className={classes.row}>
                    <Card className={classes.sides} variant="outlined">
                        <div className={classes.columnContent}>
                            <Select
                                labelId="session-select-label"
                                id="session-select"
                                value={sessionA}
                                style={{ width: 300 }}
                                onChange={(e) => setSessionA(e.target.value)}
                            >
                                {sessions.map(se => (
                                    <MenuItem key={se.id} value={se.id}>
                                        {se.lecName.map(ln => (` ${ln} /`))}
                                        <br />
                                        {se.subName}
                                        <br />
                                        {se.tag}
                                        <br />
                                        {se.groupIdSub}
                                        <br />
                                        {se.studentCount} ({se.Duration})
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <div className={classes.columnContent}>
                            <Select
                                labelId="session-select-label"
                                id="session-select"
                                value={sessionB}
                                style={{ width: 300 }}
                                onChange={(e) => setSessionB(e.target.value)}
                            >
                                {sessions.map(se => (
                                    <MenuItem key={se.id} value={se.id}>
                                        {se.lecName.map(ln => (` ${ln} /`))}
                                        <br />
                                        {se.subName}
                                        <br />
                                        {se.tag}
                                        <br />
                                        {se.groupIdSub}
                                        <br />
                                        {se.studentCount} ({se.Duration})
                                    </MenuItem>
                                ))}
                            </Select>
                        </div>
                        <Button
                            size="small"
                            variant="outlined"
                            onClick={handleSubmit}
                        >
                            ADD
                        </Button>
                        <div className={classes.myAlert}>
                            <Alert severity={conSessionAddSuccess.type}>
                                {conSessionAddSuccess.msg}
                            </Alert>
                        </div>
                    </Card>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
