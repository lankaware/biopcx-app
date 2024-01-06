import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { Button, Box, Typography, Grid, TextField, } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import SearchIcon from '@mui/icons-material/Search'

import { useStyles } from '../../services/stylemui'
import { getList, putRec } from '../../services/apiconnect'
import { customStyles1, paginationBr } from '../../services/datatablestyle'

const objectRef = 'user/'

const LoginList = props => {

    const columns = [
        {
            name: 'Nome do Usuário',
            selector: row => row.name,
            sortable: true,
            width: '30vw',
            cell: row => (<Link to={"/login/" + row._id}>{row.name}</Link>)
        },
        {
            name: 'Login',
            selector: row => row.login,
            sortable: true,
            width: '20vw'
        },
        {
            name: 'Função',
            selector: row => row.role,
            sortable: true,
            width: '20vw',
            right: true,
        },
    ];

    const classes = useStyles();
    const [list, setList] = useState([])
    const [nameFilter, nameFilterSet] = useState('')
    const [loginFilter, loginFilterSet] = useState('')

    useEffect(() => {
        getList(objectRef)
            .then(items => {
                console.log('items.record',items.record)
                setList(items.record)
            })
    }, [])

    const refreshRec = () => {
        if (nameFilter || loginFilter) {
            let recObj = {}
            if (nameFilter) recObj = { 'name': { "$regex": nameFilter, "$options": 'i' } }
            if (loginFilter) recObj = { ...recObj, 'login': { "$regex": loginFilter, "$options": 'i' } }
            recObj = JSON.stringify(recObj)
            putRec(objectRef, recObj)
                .then(items => {
                    setList(items.record)
                })
        } else {
            getList(objectRef)
            .then(items => {
                console.log('items.record',items.record)
                setList(items.record)
            })
        }
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
                    <Typography variant='h6' className='tool-title' noWrap={true}>Lista de Logins</Typography>
                </div>

                <div className='tool-buttons'>
                    <Box m={1}>
                        <Button color="primary" size='small' variant='contained' startIcon={<OpenInNewIcon />}
                            href="/login/0">INCLUIR
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button color='primary' size='small' variant='contained' startIcon={<KeyboardReturnIcon />}
                            href="/" id='backButton'>
                            VOLTAR
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
                        label='Nome do Usuário'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={loginFilter}
                        onChange={(event) => { loginFilterSet(event.target.value) }}
                        id='discrFilter'
                        label='Login'
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
    )
}

export default LoginList
