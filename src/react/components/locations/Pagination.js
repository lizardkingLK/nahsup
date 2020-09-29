import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
        display: 'flex',
        justifyItems: 'center'
    },
}));

export default function PaginationOutlined({ locationsPerPage, totalLocations, paginate }) {
    const classes = useStyles();

    const handleChange = (e) => {
        let number = e.target.textContent;
        if (number !== '')
            paginate(parseInt(number))
    }

    return (
        <div className={classes.root}>
            <Pagination
                onChange={handleChange}
                count={Math.ceil(totalLocations / locationsPerPage)}
                size="small"
                hidePrevButton
                hideNextButton
            />
        </div>
    );
}