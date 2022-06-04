import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import DataTable from 'react-data-table-component'

import { Button, Box, Typography, Grid, TextField, Dialog, } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import SearchIcon from '@mui/icons-material/Search'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';

import { getList, putRec } from '../../services/apiconnect'
import { customStyles1, paginationBr } from '../../services/datatablestyle'
import { prettyDate, timeBr } from '../../services/dateutils'

import Billing from './Billing'
const objectRef = 'billing/'

const BillingList = props => {

    const columns = [
        {
            name: 'Status',
            selector: row => row.status,
            sortable: false,
            width: '6vw'
        },
        {
            name: 'Data',
            selector: row => row.attendanceDate,
            sortable: true,
            width: '6vw',
            cell: row => prettyDate(row.date)
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
        {
            name: 'Convênio',
            selector: row => row.covenant_name, 
            sortable: true,
            width: '20vw',
            right: false,
        },
        {
            name: 'Plano',
            selector: row => row.covenantplan_name, 
            sortable: true,
            width: '20vw',
            right: false,
        },
    ];

    const [billingInfo, billingInfoSet] = useState({});

    const [list, setList] = useState([])
    const [dateFilter, dateFilterSet] = useState(new Date())
    const [patientFilter, patientFilterSet] = useState('')

    const [openBilling, openBillingSet] = useState('')
    const [updatedRec, updatedRecSet] = useState(false)

    useEffect(() => {
        let tempList = []
        getList(objectRef)
            .then(items => {
                items.record.forEach(element => {
                    tempList.push({
                        _id: element._id,
                        attendanceDate: element.attendanceDate.substr(0, 10),
                        patient_id: element.patient_id,
                        patient_name: element.patient_name[0],
                        professional_id: element.professional_id,
                        professional_name: element.professional_name[0],
                        procedure_id: element.procedure_id,
                        procedure_name: element.procedure_name[0],
                        covenant_id: element.covenant_id,
                        covenant_name: element.covenant_name[0],
                        covenantplan_id: element.covenantplan_id,
                        covenantplan_name: element.covenantplan_name[0],
                        amount: element.amount,
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
                        attendanceDate: element.attendanceDate.substr(0, 10) || "",
                        patient_id: element.patient_id || "",
                        patient_name: element.patient_name[0] || "",
                        professional_id: element.professional_id || "",
                        professional_name: element.professional_name[0] || "",
                        procedure_id: element.procedure_id || "",
                        procedure_name: element.procedure_name[0] || "",
                        covenant_id: element.covenant_id || "",
                        covenant_name: element.covenant_name[0] || "",
                        covenantplan_id: element.covenantplan_id || "",
                        covenantplan_name: element.covenantplan_name[0] || "",
                        amount: element.amount || "",
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
                        InputLabelProps={{ shrink: true, disabled: false }}
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
                        InputLabelProps={{ shrink: true, disabled: false }}
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
                    onRowClicked={(row, event) => { billingDialog(row) }}
                    // noContextMenu={true}
                    paginationComponentOptions={paginationBr}
                    paginationPerPage={10}
                />
                <Box m={1}>
                    <Button color="primary" size='small' variant='contained' startIcon={<OpenInNewIcon />} target="_blank"
                        onClick={() => billingDialog(0)}
                    >INCLUIR
                    </Button>
                </Box>
            </div>
            <div>
                <Dialog open={openBilling} maxWidth={false}>
                    <Billing billingInfo={billingInfo}
                        openBillingSet={openBillingSet}
                        updatedRecSet={updatedRecSet}>
                    </Billing>
                </Dialog>
            </div>
        </div>

    )
}

export default BillingList
