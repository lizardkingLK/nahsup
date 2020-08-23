import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    pagination: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: theme.spacing(1),
        listStyle: 'none',
    },
    listItem: {
        paddingLeft: 10,
        paddingRight: 10,
        cursor: 'pointer',
    }
}))

const MyPagination = ({ subjectsPerPage, totalSubjects, paginate }) => {
    const classes = useStyles();
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalSubjects / subjectsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={classes.pagination}>
                {pageNumbers.map(number => (
                    <li key={number}>
                        <Typography
                            variant="caption"
                            component="h6"
                            color="primary"
                            onClick={() => paginate(number)}
                            className={classes.listItem}
                        >
                            {number}
                        </Typography>
                    </li>
                ))}
            </ul>
        </nav>
    )
}


export default MyPagination;