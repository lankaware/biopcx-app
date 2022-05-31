import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { Button, Box, Typography, Grid, TextField, Dialog, } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import SearchIcon from '@mui/icons-material/Search'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import { useStyles } from '../../services/stylemui'
import { getList, putRec } from '../../services/apiconnect'
import { customStyles1, paginationBr } from '../../services/datatablestyle'
import { prettyDate, timeBr } from '../../services/dateutils'

import Agenda from './Agenda'
const objectRef = 'agenda/'

const Agendas = props => {

    const columns = [
        {
            name: 'Status',
            selector: row => row.status,
            sortable: false,
            width: '6vw'
        },
        {
            name: 'Data',
            selector: row => row.date,
            sortable: true,
            width: '6vw',
            cell: row => prettyDate(row.date)
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
            cell: row => (<Link to={'patient/' + row.patient_id}>{row.patient_name}</Link>)
        },
        {
            name: 'Telefone',
            selector: row => row.patient_phone,
            sortable: true,
            width: '10vw',
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

    const [agendaINFO, agendaINFOSet] = useState({});

    const classes = useStyles();
    const [list, setList] = useState([])
    const [dateFilter, dateFilterSet] = useState(new Date())
    const [patientFilter, patientFilterSet] = useState('')

    const [openAgenda, openAgendaSet] = useState('')
    const [updatedRec, updatedRecSet] = useState(false)

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
                        patient_phone: element.patient_phone[0],
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
        updatedRecSet(true)
    }, [updatedRec])

    useEffect(() => {
        refreshRec();
    }, [dateFilter]);

    const refreshRec = () => {
        let tempList = []
        let recObj = {}
        if (dateFilter) recObj = { dateFilter }
        // if (patientFilter) recObj = { ...recObj, 'specialty.name  ': { "$regex": patientFilter } }

        recObj = JSON.stringify(recObj)
        console.log("recObj", recObj)
        putRec(objectRef, recObj)
            .then(items => {
                items.record.forEach(element => {
                    tempList.push({
                        _id: element._id || "",
                        date: element.date.substr(0, 10) || "",
                        initialTime: timeBr(element.initialTime) || "",
                        finalTime: timeBr(element.finalTime) || "",
                        professional_id: element.professional_id || "",
                        professional_name: element.professional_name[0] || "",
                        patient_id: element.patient_id || "",
                        patient_name: element.patient_name[0] || "",
                        patient_phone: element.patient_phone[0] || "",
                        procedure_id: element.procedure_id || "",
                        procedure_name: element.procedure_name[0] || "",
                        planName: element.planName || "",
                        status: element.status || ""
                    })
                });
            })
            .then(_ => {
                setList(tempList)
            })
    }

    const handleChange = (state) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', state.selectedRows);
    };

    const agendaDialog = (agendaInfo) => {
        agendaINFOSet(agendaInfo);
        openAgendaSet(true);
    }

    const nextDate = () => {
        var nextDate = new Date();
        var nextDateParts = dateFilter.split('-');
        nextDate.setFullYear(nextDateParts[0], nextDateParts[1] - 1, nextDateParts[2]); // year, month (0-based), day
        nextDate.setTime(nextDate.getTime() + 86400000);
        let dateString = nextDate.toISOString().split('T')[0]
        dateFilterSet(dateString)
        refreshRec()
    }

    const prevDate = () => {
        var prevDate = new Date();
        var prevDateParts = dateFilter.split('-');
        prevDate.setFullYear(prevDateParts[0], prevDateParts[1] - 1, prevDateParts[2]); // year, month (0-based), day
        prevDate.setTime(prevDate.getTime() - 86400000);
        let dateString = prevDate.toISOString().split('T')[0]
        dateFilterSet(dateString)
        refreshRec()
    }

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

                <div className='tool-buttons'>

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
                <Grid item xs={2}>
                    <TextField
                        value={dateFilter}
                        onChange={(event) => { dateFilterSet(event.target.value) }}
                        id='dateFilter'
                        label='Data'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        onKeyPress={(e) => { launchSearch(e) }}
                        variant='outlined'
                        type='date'
                        size='small'
                    />
                </Grid>
                <Grid item xs={1}>
                    <Button startIcon={<ArrowLeftIcon />} variant='contained' onClick={_ => prevDate()}></Button>
                </Grid>
                <Grid item xs={1}>
                    <Button startIcon={<ArrowRightIcon />} variant='contained' onClick={_ => nextDate()} ></Button>
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
                    onRowClicked={(row, event) => { agendaDialog(row) }}
                    // noContextMenu={true}
                    paginationComponentOptions={paginationBr}
                    paginationPerPage={10}
                />
                <Box m={1}>
                    <Button color="primary" size='small' variant='contained' startIcon={<OpenInNewIcon />} target="_blank"
                        onClick={() => agendaDialog(0)}
                    >INCLUIR
                    </Button>
                </Box>
            </div>
            <div>
                <Dialog open={openAgenda} maxWidth={false}>
                    <Agenda agendaInfo={agendaINFO}
                        openAgendaSet={openAgendaSet}
                        updatedRecSet={updatedRecSet}>
                    </Agenda>
                </Dialog>
            </div>
        </div>

    )
}

export default Agendas
