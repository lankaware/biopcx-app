import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { Button, Box, Typography, Grid, TextField, } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import SearchIcon from '@mui/icons-material/Search'

import { useStyles } from '../../services/stylemui'
import { getList, putRec } from '../../services/apiconnect'

const objectRef = 'texttemplate/'

const TextTemplateList = props => {

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
            name: 'Nome do Texto Padrão',
            selector: row => row.name,
            sortable: true,
            width: '30vw',
            cell: row => (<Link to={"/texttemplate/" + row._id}>{row.name}</Link>)
        },
        {
            name: 'Tipo',
            selector: row => row.type,
            sortable: true,
            width: '30vw'
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
    const [typeFilter, typeFilterSet] = useState('')

    useEffect(() => {
        getList(objectRef)
            .then(items => {
                setList(items.record)
            })
    }, [])

    const refreshRec = () => {
        let recObj = {}
        if (nameFilter) recObj = { 'name': { "$regex": nameFilter, "$options": 'i' } }
        if (typeFilter) recObj = { ...recObj, 'type': { "$regex": typeFilter, "$options": 'i' } }

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
        <div>
            <div className='tool-bar'>
                <div >
                    <Typography variant='h6' className='tool-title' noWrap={true}>Lista de Textos Padrões</Typography>
                </div>

                <div className={classes.toolButtons + ' button-link'}>
                    <Box m={1}>
                        <Button color="primary" size='small' variant='contained' startIcon={<OpenInNewIcon />}
                            href="/texttemplate/0">INCLUIR
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button color='primary' size='small' variant='contained' startIcon={<KeyboardReturnIcon />}
                            href="/" id='backButton'>VOLTAR
                        </Button>
                    </Box>
                </div>
            </div>
            <div className='tool-bar-filters'>
                <Button color='primary' size='large' id='searchButton' startIcon={<SearchIcon />}
                    onClick={_ => refreshRec()} >
                </Button>
                <Grid item xs={3}>
                    <TextField
                        value={nameFilter}
                        onChange={(event) => { nameFilterSet(event.target.value) }}
                        id='nameFilter'
                        label='Nome do Texto Padrão'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={typeFilter}
                        onChange={(event) => { typeFilterSet(event.target.value) }}
                        id='discrFilter'
                        label='Tipo do Texto'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                        variant='outlined'
                        size='small'
                    />
                </Grid>
            </div>
            <div className='data-table'>
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
    )
}

export default TextTemplateList
