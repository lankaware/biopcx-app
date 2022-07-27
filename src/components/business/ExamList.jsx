import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { Button, Box, Typography, Grid, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import { useStyles } from '../../services/stylemui'
import { getList, putRec } from '../../services/apiconnect'
import { customStyles1, paginationBr } from '../../services/datatablestyle'
import Exam from './Exam'

const objectRef = 'exam/'

const ExamList = props => {
    const [_id, _idSet] = useState('0');

    const [insertMode, setInsertMode] = useState(_id === '0');
    const [editMode, setEditMode] = useState(_id === '0');

    const [updateList, setUpdateList] = useState(false);

    const columns = [
        {
            name: 'Nome do item',
            selector: row => row.name,
            sortable: true,
            width: '20vw',
            cell: row => (<Link to="/" onClick={(e) => {
                e.preventDefault()
                setInsertMode(false)
                _idSet(row._id)
            }}>{row.name}</Link>)
        },
    ];



    const classes = useStyles();
    const [list, setList] = useState([])
    const [nameFilter, nameFilterSet] = useState('')

    useEffect(() => {
        getList(objectRef)
            .then(items => {
                console.log("Insert mode List", insertMode)
                console.log('items.record', items.record)
                setList(items.record)
                setUpdateList(false);
            })
    }, [insertMode, updateList])

    const refreshRec = () => {
        let recObj = {}
        if (nameFilter) recObj = { 'name': { "$regex": nameFilter } }

        recObj = JSON.stringify(recObj)
        putRec(objectRef, recObj)
            .then(items => {
                setList(items.record)
            })
    }

    const handleChange = (state) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', state.selectedRows);
    };

    const launchSearch = (e) => {
        if (e.key === 'Enter') {
            document.getElementById("searchButton").click();
        }
    }

    return (
        <>
            <Box>
                <div>
                    <div className='tool-bar medicine'>
                        <div >
                            <Typography variant='h6' className='tool-title medicine' noWrap={true}>Lista de Itens de Solicitação</Typography>
                        </div>

                        <div className='tool-buttons medicine'>
                            {/* <Box m={1}>
                                <Button color="primary" size='small' variant='contained' startIcon={<OpenInNewIcon />}
                                    href="/medicine/0">INCLUIR
                                </Button>
                            </Box> */}
                            {/* <Box m={1}>
                                <Button color='primary' size='small' variant='contained' startIcon={<KeyboardReturnIcon />}
                                    href="/" id='backButton'>
                                    VOLTAR
                                </Button>
                            </Box> */}
                        </div>
                    </div>
                    <div className='tool-bar-filters medicine'>
                        <Button color='primary' size='large' id='searchButton' startIcon={<SearchIcon />}
                            onClick={_ => refreshRec()} >
                        </Button>
                        <Grid item xs={3}>
                            <TextField
                                value={nameFilter}
                                onChange={(event) => { nameFilterSet(event.target.value) }}
                                id='nameFilter'
                                label='Nome do Item de Solicitação'
                                fullWidth={false}
                                InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                onKeyPress={(e) => { launchSearch(e) }}
                                variant='outlined'
                                size='small'
                            />
                        </Grid>
                    </div>
                    <div className='data-table medicine'>
                        <DataTable
                            // title=""
                            noHeader={true}
                            columns={columns}
                            customStyles={customStyles1}
                            data={list}
                            // selectableRows 
                            Clicked
                            onSelectedRowsChange={handleChange}
                            keyField={'_id'}
                            highlightOnHover={true}
                            pagination={true}
                            fixedHeader={true}
                            // noContextMenu={true}
                            paginationComponentOptions={paginationBr}
                            paginationPerPage={10}
                        />
                    </div>
                </div>
            </Box>

            <Exam
                _id={_id}
                _idSet={_idSet}
                insertMode={insertMode}
                setInsertMode={setInsertMode}
                editMode={editMode}
                setEditMode={setEditMode}
                setUpdateList={setUpdateList}
            />
        </>
    )

}

export default ExamList;