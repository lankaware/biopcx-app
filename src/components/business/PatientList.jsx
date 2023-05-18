import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { Button, Box, Typography, Grid, TextField, } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
// import SearchIcon from '@mui/icons-material/Search'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useStyles } from '../../services/stylemui'
import { getList, putRec } from '../../services/apiconnect'
import { customStyles1, paginationBr } from '../../services/datatablestyle'

const objectRef = 'patient/'

const Patients = props => {

    const columns = [
        {
            name: 'Nome do Paciente',
            selector: row => row.name,
            sortable: true,
            width: '20vw',
            cell: row => (<Link to={"/patient/" + row._id}>{row.name}</Link>)
        },
        {
            name: 'Sobrenome do Paciente',
            selector: row => row.lastname,
            sortable: true,
            width: '20vw',
            cell: row => (<Link to={"/patient/" + row._id}>{row.lastname}</Link>)
        },
        {
            name: 'Telefone',
            selector: row => row.phone,
            sortable: true,
            width: '15vw'
        },
        {
            name: 'Convênio',
            selector: row => row.covenant_name,
            sortable: true,
            width: '20vw',
            right: false,
        },
    ];

    const classes = useStyles();
    const [list, setList] = useState([])
    const [nameFilter, nameFilterSet] = useState('')
    const [lastnameFilter, lastnameFilterSet] = useState('')
    const [covenantFilter, covenantFilterSet] = useState('')
    const [regFilter, regFilterSet] = useState('')

    useEffect(() => {
        getList(objectRef)
            .then(items => {
                setList(items.record)
            })
    }, [])

    const refreshRec = () => {
        let recObj = {}
        if (nameFilter) recObj = { 'name': { "$regex": nameFilter, "$options": 'i' } }
        if (lastnameFilter) recObj = { 'lastname': { "$regex": lastnameFilter, "$options": 'i' } }
        if (covenantFilter) recObj = { ...recObj, 'covenant.name  ': { "$regex": covenantFilter, "$options": 'i' } }
        if (regFilter) recObj = { ...recObj, 'internalRegister': regFilter }

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
                    <Typography variant='h6' className='tool-title' noWrap={true}>Lista de Pacientes</Typography>
                </div>
                <div className='tool-buttons'>
                    <Box m={1}>
                        <Button color="primary" size='small' variant='contained' startIcon={<OpenInNewIcon />}
                            href="/patient/0"
                        >INCLUIR
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button color='primary' size='small' variant='contained' startIcon={<KeyboardReturnIcon />}
                            href="/" id='backButton'
                        >VOLTAR
                        </Button>
                    </Box>
                </div>
            </div>
            <div className='tool-bar-filters'>
                <Grid item xs={3}>
                    <TextField
                        value={nameFilter}
                        onChange={(event) => { nameFilterSet(event.target.value) }}
                        id='nameFilter'
                        label='Nome do Paciente'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={lastnameFilter}
                        onChange={(event) => { lastnameFilterSet(event.target.value) }}
                        id='lastnameFilter'
                        label='Sobrenome do Paciente'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={covenantFilter}
                        onChange={(event) => { covenantFilterSet(event.target.value) }}
                        id='discrFilter'
                        label='Convênio'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={regFilter}
                        onChange={(event) => { regFilterSet(event.target.value) }}
                        id='discrFilter'
                        label='Registro'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Button color='primary' size='large' id='searchButton' startIcon={<FilterAltIcon />}
                    onClick={_ => refreshRec()} >
                </Button>
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

export default Patients
