import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, MenuItem, Box
} from '@mui/material'
import DataTable from 'react-data-table-component'

import EditIcon from '@mui/icons-material/Edit'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

import TempPac from './PreCadPac'
import { useStyles } from '../../services/stylemui'
import { getList, putRec, postRec, deleteRec } from '../../services/apiconnect'
import { timeBr, stdTime } from '../../services/dateutils';
import { customStyles1, paginationBr } from '../../services/datatablestyle'

const objectRef = 'agenda/'
const objectId = 'agendaid/'

// var originalStatus = ''
// const originalStatusSet = (newStatus) => {
//     originalStatus = newStatus
// }

var selectedToSave = []
var chosenItem = ''

const Agenda = props => {

    let _id = props.agendaInfo._id || '0'

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
    const [firstAppoint, firstAppointSet] = useState('')
    const [unitId, unitIdSet] = useState('')

    const [professionalList, professionalListSet] = useState([])
    const [patientList, patientListSet] = useState([])
    const [procedureList, procedureListSet] = useState([])
    const [procedureListBill, procedureListBillSet] = useState([])
    const [covenantList, covenantListSet] = useState([])
    const [covenantplanList, covenantplanListSet] = useState([])

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteInfoDialog, setDeleteInfoDialog] = useState(false)
    const [emptyRecDialog, setEmptyRecDialog] = useState(false)
    const [tempPacDialog, tempPacDialogSet] = useState(false)
    const [changeStatusDialog, changeStatusDialogSet] = useState(false)
    const [changeValueDialog, changeValueDialogSet] = useState(false)
    const [billPrice, billPriceSet] = useState('')

    const classes = useStyles()

    const columns = [
        {
            name: 'Procedimento',
            selector: row => row.name,
            sortable: true,
            width: '15vw',
            right: false,
        },
        {
            name: 'Valor',
            selector: row => Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })
                .format(row.price),
            sortable: true,
            width: '10vw',
            right: true,
        },
    ];

    useEffect(() => {
        // if (props.agendaID !== "1") {
        // ************ firstAppoint ????????????????????????????????????
        console.log('props.agendaInfo', props.agendaInfo)
        let record = props.agendaInfo;
        let setters = () => {
            // console.log(record._id)
            // _idSet(record._id)
            dateSet((record.date || props.agendaDate).substr(0, 10))
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
            firstAppointSet(record.firstAppoint || '')
            unitIdSet(record.unit_id || '')
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
            getList(`procedurevalue/${covenantId}/${covenantplanId}`)
                .then(items => {
                    procedureListBillSet(items.record)
                })
                .then(_ => {
                    changeStatusDialogSet(true)
                })
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
        if (!date || !patientId || !procedureId || !phone) {
            setEmptyRecDialog(true)
            return null
        }
        let recObj = {
            date,
            initialTime: '1970-01-01T' + stdTime('1970-01-01T' + initialTime),
            finalTime: '1970-01-01T' + stdTime('1970-01-01T' + finalTime),
            professional_id: professionalId || null,
            patient_id: patientId || null,
            procedure_id: procedureId || null,
            covenant_id: covenantId || null,
            covenantplan_id: covenantplanId || null,
            phone,
            email,
            status,
            unit_id: unitId || null
        }
        console.log("recObj", recObj)
        if (_id.length === 24) {
            recObj = JSON.stringify(recObj)
            putRec(objectId + _id, recObj)
                .then(_ => {
                    if (status !== originalStatus && status === '4') {
                        recordBilling()
                        updatePatDates()
                    }
                })
        } else {
            recObj = JSON.stringify(recObj)
            postRec(objectRef, recObj)
                .then(result => {
                    console.log('post', result)
                    _id = result.record._id
                })
                .then(_ => {
                    if (status !== originalStatus && status === '4') {
                        recordBilling()
                        updatePatDates()
                    }
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
        selectedToSave.map(selectedEvent => {
            console.log('selectedEvent', selectedEvent)
            let recObjBilling = {
                attendanceDate: date,
                patient_id: patientId,
                professional_id: professionalId,
                procedure_id: selectedEvent._id,
                covenant_id: covenantId,
                covenantplan_id: covenantplanId,
                agenda_id: _id,
                amount: selectedEvent.price,
                unit_id: unitId
            }
            recObjBilling = JSON.stringify(recObjBilling)
            postRec('billing/', recObjBilling)
        })
    }

    const updatePatDates = () => {
        let recObjPatient = {
            _id: patientId,
            lastAppoint: date,
        }
        if (firstAppoint === '') recObjPatient = { ...recObjPatient, firstAppoint: date }
        recObjPatient = JSON.stringify(recObjPatient)
        putRec('patientid/' + patientId, recObjPatient)
            .then(result => {
                console.log('put', result)
            })
    }

    const emptyRecClose = () => { setEmptyRecDialog(false) }
    const cancelRec = () => { props.openAgendaSet(false) }
    const delRec = () => { setDeleteDialog(true) }
    const delConfirm = () => {
        console.log('_id', _id)
        deleteRec(objectId + _id)
            .then(result => {
            })
        setDeleteDialog(false)
        setDeleteInfoDialog(true)
        props.updatedRecSet(false)
        props.openAgendaSet(false)
    }
    const delCancel = () => { setDeleteDialog(false) }

    const loadPatientData = (patientId) => {
        patientIdSet(patientId)
        const selectedPatient = patientList.findIndex((item) => { return item._id === patientId })
        covenantIdSet(patientList[selectedPatient].covenant_id)
        covenantplanIdSet(patientList[selectedPatient].covenantplan_id)
        phoneSet(patientList[selectedPatient].phone)
        emailSet(patientList[selectedPatient].email)
        firstAppointSet(patientList[selectedPatient].firstAppoint)
        statusSet('1')
    }

    const handleSelectChange = (allSelected, selectedCount, selectedRows) => {
        selectedToSave = selectedRows
        return null
    }

    const billChangeDialog = (row) => {
        chosenItem = procedureListBill.findIndex((item) => { return item._id === row._id })
        console.log('chosenItem 1', chosenItem)
        billPriceSet(row.price)
        changeValueDialogSet(true);
    }

    const confirmBillDialog = () => {
        console.log('chosenItem 2', chosenItem)
        procedureListBill[chosenItem].price = billPrice
        changeValueDialogSet(false)
    }

    const cancelBillDialog = () => {
        statusSet(originalStatus)
        changeValueDialogSet(false)
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
                            onChange={(event) => { dateSet(event.target.value) }}
                            fullWidth={true}
                            disabled={true}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                            type="date"
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
                            <MenuItem value={'5'}>Faltou</MenuItem>
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
                        <Button color='error' variant='contained' size='small' startIcon={<DeleteForeverIcon />}
                            onClick={_ => delRec()} disabled={false}>EXCLUIR
                        </Button>
                    </Box>
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
                <DialogTitle id="alert-dialog-title">{"Registro de atendimento para cobrança"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Selecione os procedimentos realizados:
                        <DataTable
                            noHeader={true}
                            columns={columns}
                            customStyles={customStyles1}
                            data={procedureListBill}
                            selectableRows
                            Clicked
                            keyField={'_id'}
                            highlightOnHover={true}
                            fixedHeader={true}
                            paginationComponentOptions={paginationBr}
                            selectableRowsHighlight
                            onSelectedRowsChange={({ allSelected, selectedCount, selectedRows }) => {
                                handleSelectChange(allSelected, selectedCount, selectedRows)
                            }}
                            onRowClicked={(row, event) => { billChangeDialog(row) }}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelStatus} color="primary" variant="contained" size='small' autoFocus>Cancelar</Button>
                    <Button onClick={confirmStatus} color="secondary" variant="contained" size='small'>Confirmar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={changeValueDialog}>
                <DialogTitle id="alert-dialog-title">{"Alterar valor a ser cobrado"}</DialogTitle>
                <DialogContent >
                    <Box m={1}>
                        <TextField
                            id='billPrice'
                            label='Valor Cobrado'
                            value={billPrice}
                            onChange={(event) => { billPriceSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={false}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            type="number"
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelBillDialog} color="primary" variant="contained" size='small' autoFocus>Cancelar</Button>
                    <Button onClick={confirmBillDialog} color="secondary" variant="contained" size='small' >Confirmar</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={deleteDialog}>
                <DialogTitle id="alert-dialog-title">{"Apagar o registro selecionado?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Após confirmada essa operação não poderá ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={delCancel} color="primary" variant='contained' autoFocus>Cancelar</Button>
                    <Button onClick={delConfirm} color="secondary" variant='contained'>Confirmar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteInfoDialog}>
                <DialogTitle id="alert-dialog-title">{"Registro removido do cadastro."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Clique para voltar a lista.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={cancelRec} color="primary" variant='contained'>Ok</Button>
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