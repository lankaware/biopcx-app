import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { Button, Box, Typography, Grid, TextField } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import SearchIcon from '@mui/icons-material/Search'

import { useStyles } from '../../services/stylemui'
import { getList, putRec } from '../../services/apiconnect'
import Procedure from './Procedure'


const objectRef = 'procedure/'

const ProcedureList = props => {
    const [_id, _idSet] = useState('0');

    const [insertMode, setInsertMode] = useState(_id === '0');
    const [editMode, setEditMode] = useState(_id === '0');

    const [updateList, setUpdateList] = useState(false);


    const customStyles = {
        table: {
            style: {
                minHeight: '350px',
            }
        },
        rows: {
            style: {
                minHeight: '30px', // override the row height
            }
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

    const columns = [
        {
            name: 'Nome do Procedimento',
            selector: row => row.name,
            sortable: true,
            width: '20vw',
            cell: row => (<Link to="/" onClick={(e) => {
                e.preventDefault()
                setInsertMode(false)
                _idSet(row._id)
            }}>{row.name}</Link>)
        },
        {
            name: 'Código CBHPM',
            selector: row => row.cbhpm,
            sortable: true,
            width: '20vw'
        },
        {
            name: 'Porte',
            selector: row => row.carry,
            sortable: true,
            width: '10vw',
            right: true,
        },
    ];

    const paginationBr = {
        rowsPerPageText: 'Linhas por página:',
        rangeSeparatorText: 'de',
        noRowsPerPage: false,
        selectAllRowsItem: false,
        selectAllRowsItemText: 'Todas'
    }
    const classes = useStyles();
    const [list, setList] = useState([])
    const [nameFilter, nameFilterSet] = useState('')
    const [cbhpmFilter, cbhpmFilterSet] = useState('')

    useEffect(() => {
        getList(objectRef)
            .then(items => {
                setList(items.record)
                setUpdateList(false);
            })
    }, [insertMode, updateList])

    const refreshRec = () => {
        let recObj = {}
        if (nameFilter) recObj = { 'name': { "$regex": nameFilter, "$options": 'i' } }
        if (cbhpmFilter) recObj = { ...recObj, 'cbhpm': { "$regex": cbhpmFilter, "$options": 'i' } }

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
            <div>
                <div className='tool-bar medicine'>
                    <div >
                        <Typography variant='h6' className='tool-title' noWrap={true}>Lista de Procedimentos</Typography>
                    </div>

                    <div className='tool-buttons medicine'>
                        {/* <Box m={1}>
                        <Button color="primary" size='small' variant='contained' startIcon={<OpenInNewIcon />}
                            href="/procedure/0">INCLUIR
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button color='primary' size='small' variant='contained' startIcon={<KeyboardReturnIcon />}
                            href="/" id='backButton'>VOLTAR
                        </Button>
                    </Box> */}
                    </div>
                </div>
                <div className='tool-bar-filters medicine'>
                    <Grid container spacing={2} >
                        <Button color='primary' size='large' id='searchButton' startIcon={<SearchIcon />}
                            onClick={_ => refreshRec()} >
                        </Button>
                        <Grid item xs={6}>
                            <TextField
                                value={nameFilter}
                                onChange={(event) => { nameFilterSet(event.target.value) }}
                                id='nameFilter'
                                label='Nome do Procedimento'
                                fullWidth={false}
                                InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                onKeyPress={(e) => { launchSearch(e) }}
                                variant='outlined'
                                size='small'
                            />
                        </Grid>
                        {/* <Grid item xs={3}>
                            <TextField
                                value={cbhpmFilter}
                                onChange={(event) => { cbhpmFilterSet(event.target.value) }}
                                id='discrFilter'
                                label='Código CBHPM'
                                fullWidth={false}
                                InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                onKeyPress={(e) => { launchSearch(e) }}
                                variant='outlined'
                                size='small'
                            />
                        </Grid> */}
                    </Grid>
                </div>
                <div className='data-table medicine'>
                    <DataTable
                        // title=""
                        noHeader={true}
                        columns={columns}
                        customStyles={customStyles}
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
            <Procedure
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

export default ProcedureList
