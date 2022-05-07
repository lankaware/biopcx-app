import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, MenuItem, Box
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

import { useStyles } from '../../services/stylemui'
import { getList, putRec, postRec, deleteRec } from '../../services/apiconnect'
import { timeBr } from '../../services/dateutils'

const objectRef = 'agenda/'
const objectId = 'agendaid/'

const Agenda = props => {

    let id = props.agendaID
    // let { id } = useParams()

    const [_id, _idSet] = useState('')
    const [date, dateSet] = useState('')
    const [initialTime, initialTimeSet] = useState('')
    const [finalTime, finalTimeSet] = useState('')
    const [professionalId, professionalIdSet] = useState('')
    const [professionalName, professionalNameSet] = useState('')
    const [patientId, patientIdSet] = useState('')
    const [patientName, patientNameSet] = useState('')
    const [procedureId, procedureIdSet] = useState('')
    const [procedureName, procedureNameSet] = useState('')
    const [planName, planNameSet] = useState('')
    const [status, statusSet] = useState('')

    const [dateTemp, dateSetTemp] = useState('')
    const [initialTimeTemp, initialTimeSetTemp] = useState('')
    const [finalTimeTemp, finalTimeSetTemp] = useState('')
    const [professionalIdTemp, professionalIdSetTemp] = useState('')
    const [professionalNameTemp, professionalNameSetTemp] = useState('')
    const [patientIdTemp, patientIdSetTemp] = useState('')
    const [patientNameTemp, patientNameSetTemp] = useState('')
    const [procedureIdTemp, procedureIdSetTemp] = useState('')
    const [procedureNameTemp, procedureNameSetTemp] = useState('')
    const [planNameTemp, planNameSetTemp] = useState('')
    const [statusTemp, statusSetTemp] = useState('')

    const [professionalList, professionalListSet] = useState([])
    const [patientList, patientListSet] = useState([])
    const [procedureList, procedureListSet] = useState([])

    const [insertMode, setInsertMode] = useState(id === 0)
    const [editMode, setEditMode] = useState(id === 0)

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteInfoDialog, setDeleteInfoDialog] = useState(false)
    const [emptyRecDialog, setEmptyRecDialog] = useState(false)

    // const [tabValue, setTabValue] = useState(0);

    const classes = useStyles()

    useEffect(() => {
        if (props.agendaID !== "1") {
            console.log(props.agendaInfo)
            let record = props.agendaInfo;
            let setters = () => {
                console.log(record._id)
                _idSet(record._id)
                dateSet((record.date || '').substr(0, 10))
                initialTimeSet(timeBr(record.initialTime) || '')
                finalTimeSet(timeBr(record.finalTime) || '')
                professionalIdSet(record.professional_id || '')
                professionalNameSet(record.professionalName || '')
                patientIdSet(record.patient_id || '')
                patientNameSet(record.patientName || '')
                procedureIdSet(record.procedure_id || '')
                procedureNameSet(record.procedureName || '')
                planNameSet(record.planName || '')
                statusSet(record.status || '')
            }
            setters();
        }
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
    }, [id])

    const saveRec = () => {
        if (!date) {
            setEmptyRecDialog(true)
            return null
        }
        let recObj = {
            date,
            initialTime: '1970-01-01T' + initialTime,
            finalTime: '1970-01-01T' + finalTime,
            professional_id: professionalId || null,
            patient_id: patientId || null,
            procedure_id: procedureId || null,
            planName,
            status
        }
        console.log("recObj", recObj)
        if (id !== "1") {
            recObj = JSON.stringify(recObj)
            putRec(objectId + id, recObj)
                .then(result => {
                    console.log('put', result)
                })
        } else {
            recObj = JSON.stringify(recObj)
            postRec(objectRef, recObj)
                .then(result => {
                    console.log('put', result)
                    _idSet(result.record._id)
                })
        }
        dateSetTemp(date)
        initialTimeSetTemp(initialTime)
        finalTimeSetTemp(finalTime)
        professionalIdSetTemp(professionalId)
        professionalNameSetTemp(professionalName)
        patientIdSetTemp(patientId)
        patientNameSetTemp(patientName)
        procedureIdSetTemp(procedureId)
        procedureNameSetTemp(procedureName)
        planNameSetTemp(planName)
        statusSetTemp(status)

        setEditMode(false)
        setInsertMode(false)
    }

    const refreshRec = () => {
        if (insertMode) {
            document.getElementById("backButton").click();
        }
        dateSet(dateTemp)
        initialTimeSet(initialTimeTemp)
        finalTimeSet(finalTimeTemp)
        professionalIdSet(professionalIdTemp)
        professionalNameSet(professionalNameTemp)
        patientIdSet(patientIdTemp)
        patientNameSet(patientNameTemp)
        procedureIdSet(procedureIdTemp)
        procedureNameSet(procedureNameTemp)
        planNameSet(planNameTemp)
        statusSet(statusTemp)

        setEditMode(false)
    }

    const delRec = () => {
        setDeleteDialog(true)
    }

    const delConfirm = () => {
        console.log('_id', _id)
        deleteRec(objectId + _id)
            .then(result => {
                console.log(result)
            })
        setDeleteDialog(false)
        setDeleteInfoDialog(true)
    }

    const delCancel = () => {
        setDeleteDialog(false)
    }

    const delInformClose = () => {
        document.getElementById("backButton").click();
    }

    const emptyRecClose = () => {
        setEmptyRecDialog(false)
    }

    const cancelRec = () => {
        props.openAgendaSet(false)
    }

    return (
        <div>
            <div className='tool-bar'>
                <DialogTitle >
                    <Typography variant='h5' className='tool-title' noWrap={true}>Registro de Agenda</Typography>
                </DialogTitle>
            </div>
            <div className='data-form'>
                <Grid container spacing={2} >
                    <Grid item xs={4}>
                        <TextField
                            id='date'
                            label='Data'
                            value={date}
                            onChange={(event) => { dateSet(event.target.value.toUpperCase()) }}
                            fullWidth={true}
                            disabled={!insertMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                            type="date"
                        // inputProps={{ type: 'date' }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id='initialTime'
                            label='Início'
                            value={initialTime}
                            onChange={(event) => { initialTimeSet(event.target.value); console.log(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            type="time"
                            inputProps={{ step: 300 }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            id='finalTime'
                            label='Término'
                            value={finalTime}
                            onChange={(event) => { finalTimeSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            type="time"
                            inputProps={{ step: 300 }}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            id='patient'
                            label='Paciente'
                            value={patientId}
                            onChange={(event) => { patientIdSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={!editMode}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            // sx={{ width: 150 }}
                            select>
                            {patientList.map((option) => (
                                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='professional'
                            label='Profissional'
                            value={professionalId}
                            onChange={(event) => { professionalIdSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={!editMode}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            // sx={{ width: 150 }}
                            select
                        >
                            {professionalList.map((option) => (
                                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='procedure'
                            label='Procedimento'
                            value={procedureId}
                            onChange={(event) => { procedureIdSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={!editMode}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            // sx={{ width: 150 }}
                            select
                        >
                            {procedureList.map((option) => (
                                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                </Grid>
            </div>
            {/* <Form className='data-form-level1'>

                <div >
                    <AppBar position="static" color="default">
                        <Tabs
                            value={tabValue}
                            onChange={(event, newValue) => { setTabValue(newValue) }}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                        >
                            <Tab label="Paciente" {...posTab(0)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={tabValue} index={0} dir={theme.direction}>
                        <AgendaAvailability
                            itemList={availabilityList}
                            editMode={editMode}
                            onChangeSublist={availabilityListSet}
                        />
                    </TabPanel>
                </div>

            </Form> */}
            <DialogActions>
                <div className='tool-buttons'>
                    <Box m={1}>
                        <Button color='primary' variant='contained' size='small' startIcon={<EditIcon />}
                            onClick={_ => setEditMode(true)} disabled={editMode}>EDITAR
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button color='primary' variant='contained' size='small' startIcon={<SaveAltIcon />}
                            onClick={_ => saveRec()} disabled={!editMode}>SALVAR
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button color='primary' variant='contained' size='small' startIcon={<CancelIcon />}
                            onClick={_ => refreshRec()} disabled={!editMode}>CANCELAR
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button color='primary' variant='contained' size='small' startIcon={<DeleteForeverIcon />}
                            onClick={_ => delRec()} disabled={editMode}>APAGAR
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button color='primary' variant='contained' size='small' startIcon={<KeyboardReturnIcon />}
                            onClick={_ => cancelRec()} id='backButton' disabled={editMode}>VOLTAR
                        </Button>
                    </Box>
                </div>
            </DialogActions>

            <Dialog
                open={deleteDialog}
            // onClose={delCancel}
            >
                <DialogTitle id="alert-dialog-title">{"Apagar o registro selecionado?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Após confirmada essa operação não poderá ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={delCancel} color="primary" variant='contained' autoFocus>
                        Cancelar
                    </Button>
                    <Button onClick={delConfirm} color="secondary" variant='contained'>
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={deleteInfoDialog}
            // onClose={delInformClose}
            >
                <DialogTitle id="alert-dialog-title">{"Registro removido do cadastro."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Clique para voltar a lista.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={delInformClose} color="primary" variant='contained'>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={emptyRecDialog}
            // onClose={emptyRecClose}
            >
                <DialogTitle id="alert-dialog-title">{"Registro sem descrição ou já existente não pode ser gravado."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Clique para continuar.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={emptyRecClose} color="primary" variant='contained'>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default Agenda