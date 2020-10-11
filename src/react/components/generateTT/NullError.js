import React,{ forwardRef, useImperativeHandle } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, IconButton, Typography, Checkbox } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Alert from '@material-ui/lab/Alert';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import AddIcon from '@material-ui/icons/Add';
import { KeyboardTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

import { channels } from '../../../shared/constants';
const { ipcRenderer } = window.require('electron');

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
    myRowInputs: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: theme.spacing(1),
    },
    myRowInput: {
        width: 100
    },
    myAlert: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    }
}))
//const SchedulesTable =forwardRef(({ schedules, loading, handleRadioChange },ref) => {
const NullError=forwardRef(({ scheduleUpdated },ref)=> {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState({ type: 'warning', msg: 'Please Select the item correctly!' });
 

    useImperativeHandle(ref, () => ({
     handleClickOpen(val){
        setOpen(true);
        if(val==0){
            setError({ type: 'warning', msg: 'Please Select the item correctly!' });
        }else if(val==1){
            setError({ type: 'warning', msg: 'No sessions for the selected category!' });
        }
        }
    }));
    const handleClose = () => {
        setOpen(false);
        setError({ type: 'info', msg: 'Enter Relavant Details' });
    };

    return (

       
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <div className={classes.row}>
                    <div className={classes.sides} >
                    </div>
                    <div className={classes.sides} >
                    </div>
                </div>
               
                <div className={classes.myAlert}>
                    <Alert severity={error.type}>
                        {error.msg}
                    </Alert>
                </div>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
       
    );
})

export default NullError;
