import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { Button, Box, Typography, Grid, TextField, Dialog, MenuItem } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import { getList, putRec } from '../../services/apiconnect'
import { customStyles1, paginationBr } from '../../services/datatablestyle'
import { prettyDate, defaultDateBr } from '../../services/dateutils'

import Billing from './Billing'
const objectRef = 'billing/'

const BillingList = props => {

    const columns = [
        // {
        //     name: 'Status',
        //     selector: row => row.status,
        //     sortable: false,
        //     width: '3vw'
        // },
        {
            name: 'Data',
            selector: row => row.attendanceDate,
            sortable: true,
            width: '6vw',
            cell: row => prettyDate(row.attendanceDate)
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
            name: 'Procedimento',
            selector: row => row.procedure_name,
            sortable: true,
            width: '10vw',
            right: false,
        },
        {
            name: 'Convênio',
            selector: row => row.covenant_name,
            sortable: true,
            width: '15vw',
            right: false,
        },
        {
            name: 'Plano',
            selector: row => row.covenantplan_name,
            sortable: true,
            width: '20vw',
            right: false,
        },
        {
            name: 'Profissional',
            selector: row => row.professional_name,
            sortable: true,
            width: '15vw',
            right: false,
        },
        // {
        //     name: 'Agenda',
        //     selector: row => row.agenda_id,
        //     sortable: true,
        //     width: '15vw',
        //     right: false,
        // },
    ];

    const [billingInfo, billingInfoSet] = useState({});

    const [list, setList] = useState([])
    const [dateFilter, dateFilterSet] = useState(defaultDateBr())
    const [patientFilter, patientFilterSet] = useState('')
    const [covenantFilter, covenantFilterSet] = useState('')

    const [openBilling, openBillingSet] = useState(false)
    const [updatedRec, updatedRecSet] = useState(false)

    const [professionalList, professionalListSet] = useState([])
    const [patientList, patientListSet] = useState([])
    const [procedureList, procedureListSet] = useState([])
    const [covenantList, covenantListSet] = useState([])
    const [covenantplanList, covenantplanListSet] = useState([])

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
    }, [dateFilter, patientFilter, covenantFilter, updatedRec]);

    const refreshRec = () => {
        let tempList = []
        let recObj = {}
        if (dateFilter) recObj = { dateFilter }
        if (patientFilter) recObj = { ...recObj, 'patientFilter': patientFilter }
        if (covenantFilter) recObj = { ...recObj, 'covenantFilter': covenantFilter }

        recObj = JSON.stringify(recObj)
        console.log("recObj", recObj)
        putRec(objectRef, recObj)
            .then(items => {
                if (!items.record) return
                items.record.forEach(element => {
                    tempList.push({
                        _id: element._id || "",
                        attendanceDate: element.attendanceDate.substr(0, 10) || "",
                        patient_id: element.patient_id || "",
                        patient_name: element.patient_name || "",
                        professional_id: element.professional_id || "",
                        professional_name: element.professional_name || "",
                        procedure_id: element.procedure_id || "",
                        procedure_name: element.procedure_name || "",
                        covenant_id: element.covenant_id || "",
                        covenant_name: element.covenant_name || "",
                        covenantplan_id: element.covenantplan_id || "",
                        covenantplan_name: element.covenantplan_name || "",
                        amount: element.amount || "",
                        status: element.status || "",
                        agenda_id: element.agenda_id || "",
                    })
                });
            })
            .then(_ => {
                setList(tempList)
            })
    }

    const clearFilters = () => {
        patientFilterSet('')
        covenantFilterSet('')
    }

    const billingDialog = (billingInfo) => {
        billingInfoSet(billingInfo);
        openBillingSet(true);
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
                    <Typography variant='h6' className='tool-title' noWrap={true}>Lista de Lançamentos Financeiros</Typography>
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
                        // onKeyPress={(e) => { launchSearch(e) }}
                        onBlur={(e) => { refreshRec() }}
                        variant='outlined'
                        type='date'
                        size='small'
                        sx={{ width: '12vw' }}
                    />
                    <Button startIcon={<ArrowRightIcon />} size='large' onClick={_ => nextDate()}></Button>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        value={covenantFilter}
                        onChange={(event) => { covenantFilterSet(event.target.value) }}
                        id='covenantFilter'
                        label='Convênio'
                        fullWidth={true}
                        size='small'
                        InputLabelProps={{ shrink: true, disabled: false }}
                        onKeyPress={(e) => { launchSearch(e) }}
                        variant='outlined'
                        sx={{ width: '20vw' }}
                        select>
                        {covenantList.map((option) => (
                            <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
                {/* <Grid item xs={1}></Grid> */}
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
                <Button color='primary' size='large' id='searchButton' startIcon={<FilterAltOffIcon />}
                    onClick={_ => clearFilters()} >
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
                    // onSelectedRowsChange={handleChange}
                    keyField={'_id'}
                    highlightOnHover={true}
                    pagination={true}
                    fixedHeader={true}
                    onRowClicked={(row, event) => { billingDialog(row) }}
                    // noContextMenu={true}
                    paginationComponentOptions={paginationBr}
                    paginationPerPage={10}
                />
                <Box m={1}>
                    <Button color="primary" size='small' variant='contained' startIcon={<OpenInNewIcon />} target="_blank"
                        onClick={() => billingDialog({ _id: '0' })}
                    >INCLUIR
                    </Button>
                </Box>
            </div>
            <div>
                <Dialog open={openBilling} maxWidth={false}>
                    <Billing billingInfo={billingInfo}
                        openBillingSet={openBillingSet}
                        updatedRecSet={updatedRecSet}
                        professionalList={professionalList}
                        patientList={patientList}
                        procedureList={procedureList}
                        covenantList={covenantList}
                        covenantplanList={covenantplanList}
                    >
                    </Billing>
                </Dialog>
            </div>
        </div>
    )
}

export default BillingList
