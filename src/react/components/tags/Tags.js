import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import TextField from '@material-ui/core/TextField';

import Table from './Table';
import Pagination from './Pagination';
import AddTag from './AddTag';
import DeleteTag from './DeleteTag';
import UpdateTag from './UpdateTag';

import { channels } from '../../../shared/constants';
const { ipcRenderer } = window.require('electron');

const useStyles = makeStyles((theme) => ({
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: theme.spacing(1),
    },
    table: {
        minWidth: 650,
    },
    pref: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: 200,
    }
}))

const createData = (tname, id) => {
    return { tname, id };
}

const Tags = () => {
    const classes = useStyles();

    const [tags, setTags] = useState([]);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [tagsPerPage] = useState(5);
    const [selected, setSelected] = useState('');
    const [editable, setEditable] = useState('');

    // get current tags
    const indexOfLastTag = currentPage * tagsPerPage;
    const indexOfFirstTag = indexOfLastTag - tagsPerPage;
    const currentTags = tags.slice(indexOfFirstTag, indexOfLastTag);

    // change page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const fetchTags = async () => {
        setLoading(true);
        await ipcRenderer.send(channels.LOAD_TAGS);

        ipcRenderer.on(channels.LOAD_TAGS, (event, arg) => {
            ipcRenderer.removeAllListeners(channels.LOAD_TAGS);
            const rs = arg;
            const rsArray = rs.map(r => createData(r.name, r.id))
            setTags(rsArray);
        });
        setLoading(false);
    }

    useEffect(() => {
        fetchTags();
    }, []);

    // refresh table
    const tagsUpdated = () => {
        fetchTags();
    }

    // selected student changed
    const handleRadioChange = (value) => {
        console.log(value);
        setSelected(value);
        let tTags = tags;
        const edit = tTags.filter(s => (s.id === value))[0];
        setEditable(edit);
        console.log(edit)
    }

    // search handle
    const handleChange = async (e) => {
        e.preventDefault();
        const keyword = e.target.value;
        if (keyword) {
            setLoading(true);
            await ipcRenderer.send(channels.SEARCH_TAGS, { keyword });

            ipcRenderer.on(channels.SEARCH_TAGS, (event, arg) => {
                ipcRenderer.removeAllListeners(channels.SEARCH_TAGS);
                const rs = arg;
                const rsArray = rs.map(r => createData(r.name, r.id))
                setTags(rsArray);
            });
            setLoading(false);
        }
    }

    return (
        <div className="tags">
            <div className={classes.row}>
                <IconButton
                    size="small"
                    color="primary"
                    component="span"
                    onClick={fetchTags}
                >
                    <RefreshIcon />
                </IconButton>
                <form noValidate autoComplete="off" onSubmit={handleChange}>
                    <div>
                        <TextField
                            id="search_tag"
                            size="small"
                            label="Search Tags..."
                            onChange={handleChange}
                        />
                    </div>
                </form>
            </div>

            <div className={classes.row}>
                <Table
                    tags={currentTags}
                    loading={loading}
                    handleRadioChange={handleRadioChange}
                />
            </div>

            <div className={classes.pagination}>
                <Pagination
                    tagsPerPage={tagsPerPage}
                    totalTags={tags.length}
                    paginate={paginate}
                />
            </div>

            <div className={classes.row}>
                <UpdateTag
                    selected={selected}
                    tagsUpdated={tagsUpdated}
                    name={editable.tname}
                    lid={editable.id}
                />
                <DeleteTag selected={selected} tagsUpdated={tagsUpdated} />

                <AddTag tagsUpdated={tagsUpdated} />
            </div>
        </div>
    )
}




export default Tags