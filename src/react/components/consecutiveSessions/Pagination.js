import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    pagination: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(1),
        listStyle: 'none',
    },
}))

const MyPagination = ({ ConSessionsPerPage, totalConSessions, paginate }) => {
    const classes = useStyles();
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalConSessions / ConSessionsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={classes.pagination}>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <Button size="small" onClick={() => paginate(number)} className="page-link">
                            {number}
                        </Button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}


export default MyPagination;