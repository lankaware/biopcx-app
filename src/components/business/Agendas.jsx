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
import { prettyDate, timeBr } from '../../services/dateutils'

const objectRef = 'agenda/'

const Agendas = props => {

    const columns = [
        {
            name: 'Data',
            selector: row => row.date,
            sortable: true,
            width: '5vw',
            cell: row => (<Link to={"/agenda/" + row._id}>{prettyDate(row.date)}</Link>)
        },
        {
            name: 'Início',
            selector: row => row.initialTime,
            sortable: true,
            width: '5vw',
            cell: row => (row.initialTime.substr(0, 5))
        },
        {
            name: 'Término',
            selector: row => row.finalTime,
            sortable: true,
            width: '7vw',
            cell: row => (row.finalTime.substr(0, 5))
        },
        {
            name: 'Paciente',
            selector: row => row.patient_name,
            sortable: true,
            width: '20vw',
            right: false,
        },
        {
            name: 'Procedimento',
            selector: row => row.procedure_name,
            sortable: true,
            width: '15vw',
            right: false,
        },
        {
            name: 'Profissional',
            selector: row => row.professional_name,
            sortable: true,
            width: '20vw',
            right: false,
        },
    ];

    const classes = useStyles();
    const [list, setList] = useState([])
    const [dateFilter, dateFilterSet] = useState('')
    const [patientFilter, patientFilterSet] = useState('')

    useEffect(() => {
        let tempList = []
        getList(objectRef)
            .then(items => {
                items.record.forEach(element => {
                    tempList.push({
                        _id: element._id,
                        date: element.date.substr(0, 10),
                        initialTime: timeBr(element.initialTime),
                        finalTime: timeBr(element.finalTime),
                        professional_id: element.professional_id,
                        professional_name: element.professional_name[0],
                        patient_id: element.patient_id,
                        patient_name: element.patient_name[0],
                        procedure_id: element.procedure_id,
                        procedure_name: element.procedure_name[0],
                        planName: element.planName,
                        status: element.status
                    })
                });
            })
            .then(_ => {
                setList(tempList)
            })
    }, [])

    const refreshRec = () => {
        let recObj = {}
        if (dateFilter) recObj = { 'name': { "$regex": dateFilter } }
        if (patientFilter) recObj = { ...recObj, 'specialty.name  ': { "$regex": patientFilter } }

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
                    <Typography variant='h6' className='tool-title' noWrap={true}>Lista de Agendas</Typography>
                </div>

                <div className={classes.toolButtons + ' button-link'}>
                    <Box m={1}>
                        <Button color="primary" size='small' variant='contained' startIcon={<OpenInNewIcon />}
                            href="/agenda/0" 
                            // target="_blank"
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
                <Button color='primary' size='large' id='searchButton' startIcon={<SearchIcon />}
                    onClick={_ => refreshRec()} >
                </Button>
                <Grid item xs={3}>
                    <TextField
                        value={dateFilter}
                        onChange={(event) => { dateFilterSet(event.target.value.toUpperCase()) }}
                        id='dateFilter'
                        label='Data'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                        variant='outlined'
                        size='small'
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={patientFilter}
                        onChange={(event) => { patientFilterSet(event.target.value.toUpperCase()) }}
                        id='discrFilter'
                        label='Nome do Paciente'
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

export default Agendas
