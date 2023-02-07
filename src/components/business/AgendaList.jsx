import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { Button, Box, Typography, Grid, TextField, Dialog, MenuItem, DialogActions, DialogContent } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
// import SearchIcon from '@mui/icons-material/Search'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import PrintIcon from '@mui/icons-material/Print';
import { BsFillCircleFill } from "react-icons/bs";
import ReactToPrint from "react-to-print"

import { useStyles } from '../../services/stylemui'
import { getList, putRec } from '../../services/apiconnect'
import { customStyles1, paginationBr } from '../../services/datatablestyle'
import { prettyDate, timeBr, defaultDateBr } from '../../services/dateutils'
import AgendaPrint from './AgendaPrint'

import Agenda from './Agenda'
const objectRef = 'agenda/'

const Agendas = props => {

    const columns = [
        {
            name: 'Status',
            selector: row => row.status,
            sortable: false,
            width: '6vw',
            cell: row => (<BsFillCircleFill color={agendaStatus(row.status)} />)
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
            cell: row => (<Link to={'patient/' + row.patient_id} target="_blank">{row.patient_name} </Link>)
        },
        {
            name: 'Telefone',
            selector: row => row.phone,
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
            width: '15vw',
            right: false,
        },
    ];

    const [agendaINFO, agendaINFOSet] = useState({});

    const [list, setList] = useState([])
    const [dateFilter, dateFilterSet] = useState(defaultDateBr())
    const [patientFilter, patientFilterSet] = useState('')

    const [openAgenda, openAgendaSet] = useState('')
    const [updatedRec, updatedRecSet] = useState(false)
    const [printDialog, printDialogSet] = useState(false)

    const [professionalList, professionalListSet] = useState([])
    const [patientList, patientListSet] = useState([])
    const [procedureList, procedureListSet] = useState([])
    const [covenantList, covenantListSet] = useState([])
    const [covenantplanList, covenantplanListSet] = useState([])

    const textRef = useRef()

    useEffect(() => {
        getList('professional/')
            .then(items => {
                professionalListSet(items.record)
            })
        getList('patient/')
            .then(items => {
                patientListSet(items.record)
            })
        getList('procedure/')
            .then(items => {
                procedureListSet(items.record)
            })
        getList('covenant/')
            .then(items => {
                covenantListSet(items.record)
            })
        getList('covenantplan/')
            .then(items => {
                covenantplanListSet(items.record)
            })
    }, [])

    useEffect(() => {
        refreshRec();
        updatedRecSet(true);
    }, [dateFilter, patientFilter, updatedRec]);

    const refreshRec = () => {
        let tempList = []
        let recObj = {}
        if (dateFilter) recObj = { dateFilter }
        if (patientFilter) recObj = { ...recObj, 'patientFilter': patientFilter }

        recObj = JSON.stringify(recObj)
        console.log("recObj", recObj)
        putRec(objectRef, recObj)
            .then(items => {
                if (!items.record) return
                items.record.forEach(element => {
                    tempList.push({
                        _id: element._id || "",
                        date: element.date.substr(0, 10) || "",
                        initialTime: timeBr(element.initialTime) || "",
                        finalTime: timeBr(element.finalTime) || "",
                        professional_id: element.professional_id || "",
                        professional_name: element.professional_name || "",
                        patient_id: element.patient_id || "",
                        patient_name: element.patient_name || "",
                        procedure_id: element.procedure_id || "",
                        procedure_name: element.procedure_name[0] || "",
                        covenant_id: element.covenant_id || "",
                        // covenant_name: element.covenant_name[0] || "",
                        covenantplan_id: element.covenantplan_id || "",
                        phone: element.phone || "",
                        email: element.email || "",
                        status: element.status || "",
                        firstAppoint: element.firstAppoint || "",
                    })
                });
            })
            .then(_ => {
                setList(tempList)
            })
    }

    const clearFilters = () => {
        patientFilterSet('')
    }

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

    const agendaStatus = (status) => {
        return (
            status === '1' ? "yellow" : // Agendado
                status === '2' ? 'green' : // Confirmado
                    status === '3' ? "red" :  // Chegou
                        status === '4' ? "blue" : // Atendido
                            "gray") // Agenda livre
    }

    const closePrintDialog = () => {
        printDialogSet(false)
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
                <Grid item xs={4}>
                    <Button endIcon={<ArrowLeftIcon />} size='large' onClick={_ => prevDate()}></Button>
                    <TextField
                        value={dateFilter}
                        onChange={(event) => { dateFilterSet(event.target.value) }}
                        id='dateFilter'
                        label='Data'
                        fullWidth={false}
                        InputLabelProps={{ shrink: true, disabled: false }}
                        onKeyPress={(e) => { launchSearch(e) }}
                        variant='outlined'
                        type='date'
                        size='small'
                        sx={{ width: '12vw' }}
                    />
                    <Button startIcon={<ArrowRightIcon />} size='large' onClick={_ => nextDate()} ></Button>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={patientFilter}
                        onChange={(event) => { patientFilterSet(event.target.value) }}
                        id='discrFilter'
                        label='Paciente'
                        fullWidth={true}
                        size='small'
                        InputLabelProps={{ shrink: true, disabled: false }}
                        onKeyPress={(e) => { launchSearch(e) }}
                        variant='outlined'
                        sx={{ width: '20vw' }}
                        select>
                        {patientList.map((option) => (
                            <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Button color='primary' size='large' id='searchButton' startIcon={<FilterAltIcon />}
                    onClick={_ => refreshRec()} >
                </Button>
                <Button color='primary' size='large' id='searchButtonClear' startIcon={<FilterAltOffIcon />}
                    onClick={_ => clearFilters()} >
                </Button>
                <Button color='primary' size='large' id='printButton' startIcon={<PrintIcon />}
                    onClick={_ => printDialogSet(true)} >
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
                    keyField={'_id'}
                    highlightOnHover={true}
                    // pagination={true}
                    fixedHeader={true}
                    onRowClicked={(row, event) => { agendaDialog(row) }}
                    // noContextMenu={true}
                    paginationComponentOptions={paginationBr}
                // paginationPerPage={10}
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
                    <Agenda
                        agendaInfo={agendaINFO}
                        openAgendaSet={openAgendaSet}
                        updatedRecSet={updatedRecSet}
                        professionalList={professionalList}
                        patientList={patientList}
                        procedureList={procedureList}
                        covenantList={covenantList}
                        covenantplanList={covenantplanList}
                    >
                    </Agenda>
                </Dialog>
                <Dialog open={printDialog} fullScreen={true} maxWidth={'lg'}>
                    <DialogContent>
                        <AgendaPrint
                            ref={textRef}
                            listToPrint={list}
                            // covenantList={covenantList}
                            // covenantplanList={covenantplanList}
                            // unitList={unitList}
                            // stateList={stateList}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Box m={1}>
                            <Button onClick={closePrintDialog} color="primary" size='small' variant="contained" autoFocus>Voltar</Button>
                        </Box>
                        <ReactToPrint
                            trigger={() =>
                                <Box m={1}>
                                    <Button variant='contained' size='small' color='secondary' href="#">
                                        Imprimir
                                    </Button>
                                </Box>
                            }
                            content={() => textRef.current}
                            onAfterPrint={() => { closePrintDialog() }}
                            documentTitle={"Presc" + props.patientName + new Date()}
                        />
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default Agendas
