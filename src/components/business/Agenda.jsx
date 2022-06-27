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

import TempPac from './PreCadPac'
import { useStyles } from '../../services/stylemui'
import { getList, putRec, postRec, deleteRec } from '../../services/apiconnect'
import { timeBr } from '../../services/dateutils'

const objectRef = 'agenda/'
const objectId = 'agendaid/'

// var originalStatus = ''
// const originalStatusSet = (newStatus) => {
//     originalStatus = newStatus
// }

const Agenda = props => {

    let _id = props.agendaInfo._id

    const [date, dateSet] = useState('')
    const [initialTime, initialTimeSet] = useState('')
    const [finalTime, finalTimeSet] = useState('')
    const [professionalId, professionalIdSet] = useState('')
    const [professionalName, professionalNameSet] = useState('')
    const [patientId, patientIdSet] = useState('')
    const [patientName, patientNameSet] = useState('')
    const [procedureId, procedureIdSet] = useState('')
    const [procedureName, procedureNameSet] = useState('')
    const [covenantId, covenantIdSet] = useState('')
    const [covenantName, covenantNameSet] = useState('')
    const [covenantplanId, covenantplanIdSet] = useState('')
    const [covenantplanName, covenantplanNameSet] = useState('')
    const [status, statusSet] = useState('')
    const [originalStatus, originalStatusSet] = useState('')
    const [phone, phoneSet] = useState('')
    const [email, emailSet] = useState('')

    const [professionalList, professionalListSet] = useState([])
    const [patientList, patientListSet] = useState([])
    const [procedureList, procedureListSet] = useState([])
    const [covenantList, covenantListSet] = useState([])
    const [covenantplanList, covenantplanListSet] = useState([])

    const [emptyRecDialog, setEmptyRecDialog] = useState(false)
    const [tempPacDialog, tempPacDialogSet] = useState(false)
    const [changeStatusDialog, changeStatusDialogSet] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        // if (props.agendaID !== "1") {
        console.log(props.agendaInfo)
        let record = props.agendaInfo;
        let setters = () => {
            console.log(record._id)
            // _idSet(record._id)
            dateSet((record.date || '').substr(0, 10))
            initialTimeSet(record.initialTime || '')
            finalTimeSet(record.finalTime || '')
            professionalIdSet(record.professional_id || '')
            professionalNameSet(record.professionalName || '')
            patientIdSet(record.patient_id || '')
            patientNameSet(record.patientName || '')
            procedureIdSet(record.procedure_id || '')
            procedureNameSet(record.procedureName || '')
            covenantIdSet(record.covenant_id || '')
            covenantNameSet(record.covenantName || '')
            covenantplanIdSet(record.covenantplan_id || '')
            phoneSet(record.phone || '')
            emailSet(record.email || '')
            statusSet(record.status || '')
            originalStatusSet(record.status || '')
        }
        setters();
        professionalListSet(props.professionalList)
        patientListSet(props.patientList)
        procedureListSet(props.procedureList)
        covenantListSet(props.covenantList)
        covenantplanListSet(props.covenantplanList)
    }, [_id])

    useEffect(() => {
        getList('patient/')
            .then(items => {
                patientListSet(items.record)
            })
    }, [tempPacDialog]);

    const validateChangeStatus = (newStatus) => {
        statusSet(newStatus)
        if (newStatus === '4' && newStatus !== originalStatus) {
            changeStatusDialogSet(true)
        }
    }

    const confirmStatus = () => {
        // originalStatusSet(status)
        changeStatusDialogSet(false)
    }

    const cancelStatus = () => {
        statusSet(originalStatus)
        changeStatusDialogSet(false)
    }

    const saveRec = () => {
        if (!date || !patientId || !procedureId || !covenantId || !covenantplanId) {
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
            covenant_id: covenantId || null,
            covenantplan_id: covenantplanId || null,
            phone,
            email,
            status
        }
        console.log("recObj", recObj)
        if (_id.length === 24) {
            recObj = JSON.stringify(recObj)
            putRec(objectId + _id, recObj)
                .then(result => {
                    console.log('put', result)
                })
                .then(_ => {
                    if (status !== originalStatus && status === '4')
                        recordBilling()
                })
        } else {
            recObj = JSON.stringify(recObj)
            postRec(objectRef, recObj)
                .then(result => {
                    console.log('post', result)
                    _id = result.record._id
                })
                .then(_ => {
                    if (status !== originalStatus && status === '4')
                        recordBilling()
                })
        }
        updatePatient()
        props.updatedRecSet(false)
        props.openAgendaSet(false)
    }

    const updatePatient = () => {
        let recObjPatient = {
            _id: patientId,
            covenant_id: covenantId,
            covenantplan_id: covenantplanId,
            phone,
            email,
        }
        recObjPatient = JSON.stringify(recObjPatient)
        putRec('patientid/' + patientId, recObjPatient)
            .then(result => {
                console.log('put', result)
            })
    }

    const recordBilling = () => {
        console.log('_id', _id)
        let recObjBilling = {
            attendanceDate: date,
            patient_id: patientId,
            professional_id: professionalId,
            procedure_id: procedureId,
            covenant_id: covenantId,
            covenantplan_id: covenantplanId,
            agenda_id: _id,
        }
        recObjBilling = JSON.stringify(recObjBilling)
        postRec('billing/', recObjBilling)
            .then(result => {
                console.log('post', result)
            })
    }

    const emptyRecClose = () => {
        setEmptyRecDialog(false)
    }

    const cancelRec = () => {
        props.openAgendaSet(false)
    }

    const loadPatientData = (patientId) => {
        patientIdSet(patientId)
        const selectedPatient = patientList.findIndex((item) => { return item._id === patientId })
        covenantIdSet(patientList[selectedPatient].covenant_id)
        covenantplanIdSet(patientList[selectedPatient].covenantplan_id)
        phoneSet(patientList[selectedPatient].phone)
        emailSet(patientList[selectedPatient].email)
        statusSet('1')
    }

    return (
        <div>
            <div className='tool-bar'>
                <DialogTitle >
                    <Typography className='tool-title' noWrap={true}>Registro de Agenda</Typography>
                </DialogTitle>
            </div>
            <div className='data-form-dialog'>

                <Grid container spacing={2} >
                    <Grid item xs={3}>
                        <TextField
                            id='date'
                            label='Data'
                            value={date}
                            onChange={(event) => { dateSet(event.target.value.toUpperCase()) }}
                            fullWidth={true}
                            disabled={true}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                            type="date"
                        // inputProps={{ type: 'date' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id='initialTime'
                            label='Início'
                            value={initialTime}
                            onChange={(event) => { initialTimeSet(event.target.value); console.log(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={false}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            type="time"
                            inputProps={{ step: 300 }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id='finalTime'
                            label='Término'
                            value={finalTime}
                            onChange={(event) => { finalTimeSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={false}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            type="time"
                            inputProps={{ step: 300 }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            id='status'
                            label='Status'
                            value={status}
                            onChange={(event) => { validateChangeStatus(event.target.value) }}
                            fullWidth={true}
                            disabled={!patientId}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                            type="date"
                            select>
                            <MenuItem value={'1'}>Agendado</MenuItem>
                            <MenuItem value={'2'}>Confirmado</MenuItem>
                            <MenuItem value={'3'}>Chegou</MenuItem>
                            <MenuItem value={'4'}>Atendido</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            id='patient'
                            label='Paciente'
                            value={patientId}
                            onChange={(event) => { loadPatientData(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={false}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            // sx={{ width: 150 }}
                            select>
                            {patientList.map((option) => (
                                <MenuItem key={option._id} value={option._id}>{option.fullname}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <Button color="primary" size='small' variant='contained' target="_blank"
                            onClick={() => tempPacDialogSet(true)}
                        > Pré-cadastro
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id='professional'
                            label='Profissional'
                            value={professionalId}
                            onChange={(event) => { professionalIdSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={!patientId}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            // sx={{ width: 150 }}
                            select>
                            {professionalList.map((option) => (
                                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id='procedure'
                            label='Procedimento'
                            value={procedureId}
                            onChange={(event) => { procedureIdSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={!patientId}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            // sx={{ width: 150 }}
                            select>
                            {procedureList.map((option) => (
                                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id='covenant'
                            label='Convênio'
                            value={covenantId}
                            onChange={(event) => { covenantIdSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={!patientId}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false }}
                            // sx={{ width: 150 }}
                            select>
                            {covenantList.map((option) => (
                                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id='covenantplan'
                            label='Plano'
                            value={covenantplanId}
                            onChange={(event) => { covenantplanIdSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={!patientId}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false }}
                            // sx={{ width: 150 }}
                            select>
                            {covenantplanList
                                .filter(item => { return item.covenant_id === covenantId })
                                .map((option) => (
                                    <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                                ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id='phone'
                            label='Telefone'
                            value={phone}
                            onChange={(event) => { phoneSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={!patientId}
                            InputLabelProps={{ shrink: true, disabled: false }}
                            variant='outlined'
                            type="text"
                            inputProps={{ step: 300 }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id='email'
                            label='E-mail'
                            value={email}
                            onChange={(event) => { emailSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={!patientId}
                            InputLabelProps={{ shrink: true, disabled: false }}
                            variant='outlined'
                            type="text"
                            inputProps={{ step: 300 }}
                        />
                    </Grid>
                </Grid>
            </div>
            <DialogActions>
                <div className='tool-buttons'>
                    <Box m={1}>
                        <Button color='primary' variant='contained' size='small' startIcon={<SaveAltIcon />}
                            onClick={_ => saveRec()} disabled={false}>SALVAR
                        </Button>
                    </Box>
                    <Box m={1}>
                        <Button color='primary' variant='contained' size='small' startIcon={<CancelIcon />}
                            onClick={_ => cancelRec()} disabled={false}>CANCELAR
                        </Button>
                    </Box>
                </div>
            </DialogActions>
            <Dialog open={emptyRecDialog} >
                <DialogTitle id="alert-dialog-title">{"Registro incompleto não pode ser gravado."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Clique para continuar.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={emptyRecClose} color="primary" variant='contained'>Ok</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={changeStatusDialog} >
                <DialogTitle id="alert-dialog-title">{"Confirmação de atendimento"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Ao alterar o agendamento para Atendido e confirmar a operação, será geardo o registro de faturamento.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelStatus} color="primary" variant="contained" autoFocus>Cancelar</Button>
                    <Button onClick={confirmStatus} color="secondary" variant="contained">Confirmar</Button>
                </DialogActions>
            </Dialog>

            <TempPac
                tempPacDialog={tempPacDialog}
                tempPacDialogSet={tempPacDialogSet}
                patientIdSet={patientIdSet}
                covenantIdSet={covenantIdSet}
                covenantplanIdSet={covenantplanIdSet}
                phoneSet={phoneSet}
                emailSet={emailSet}
                statusSet={statusSet}
                covenantList={covenantList}
                covenantplanList={covenantplanList}
            />
        </div>
    )
}

export default Agenda