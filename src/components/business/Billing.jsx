import React, { useState, useEffect } from 'react'
import {
    Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, MenuItem, Box, InputAdornment
} from '@mui/material'

import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

import { useStyles } from '../../services/stylemui'
import { getList, putRec, postRec, deleteRec } from '../../services/apiconnect'

const objectRef = 'billing/'
const objectId = 'billingid/'

const Billing = props => {

    let _id = props.billingInfo._id
    const [attendanceDate, attendanceDateSet] = useState('')
    const [patientId, patientIdSet] = useState('')
    const [patientName, patientNameSet] = useState('')
    const [professionalId, professionalIdSet] = useState('')
    const [professionalName, professionalNameSet] = useState('')
    const [procedureId, procedureIdSet] = useState('')
    const [procedureName, procedureNameSet] = useState('')
    const [covenantId, covenantIdSet] = useState('')
    const [covenantName, covenantNameSet] = useState('')
    const [covenantplanId, covenantplanIdSet] = useState('')
    const [covenantplanName, covenantplanNameSet] = useState('')

    const [amount, amountSet] = useState(0.0)
    const [status, statusSet] = useState('')

    const [professionalList, professionalListSet] = useState([])
    const [patientList, patientListSet] = useState([])
    const [procedureList, procedureListSet] = useState([])
    const [covenantList, covenantListSet] = useState([])
    const [covenantplanList, covenantplanListSet] = useState([])

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteInfoDialog, setDeleteInfoDialog] = useState(false)
    const [emptyRecDialog, setEmptyRecDialog] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        console.log(props.billingInfo)
        let record = props.billingInfo;
        let setters = () => {
            console.log(record._id)
            attendanceDateSet((record.attendanceDate || '').substr(0, 10))
            professionalIdSet(record.professional_id || '')
            professionalNameSet(record.professionalName || '')
            patientIdSet(record.patient_id || '')
            patientNameSet(record.patientName || '')
            procedureIdSet(record.procedure_id || '')
            procedureNameSet(record.procedureName || '')
            covenantIdSet(record.covenant_id || '')
            covenantNameSet(record.covenantName || '')
            covenantplanIdSet(record.covenantplan_id || '')
            covenantplanNameSet(record.covenantplanName || '')
            amountSet( (record.amount || 0).toFixed(2).toString() )
            statusSet(record.status || '')
        }
        setters();
        professionalListSet(props.professionalList)
        patientListSet(props.patientList)
        procedureListSet(props.procedureList)
        covenantListSet(props.covenantList)
        covenantplanListSet(props.covenantplanList)
    }, [_id])

    const saveRec = () => {
        if (!attendanceDate) {
            setEmptyRecDialog(true)
            return null
        }
        let recObj = {
            attendanceDate,
            professional_id: professionalId || null,
            patient_id: patientId || null,
            procedure_id: procedureId || null,
            covenant_id: covenantId || null,
            covenantplan_id: covenantplanId || null,
            amount,
            status
        }
        if (_id.length === 24) {
            recObj = JSON.stringify(recObj)
            putRec(objectId + _id, recObj)
                .then(result => {
                    console.log('put', result)
                })
        } else {
            recObj = JSON.stringify(recObj)
            postRec(objectRef, recObj)
                .then(result => {
                    console.log('post', result)
                    // _idSet(result.record._id)
                })
        }
        props.updatedRecSet(false)
        props.openBillingSet(false)
    }

    const emptyRecClose = () => {setEmptyRecDialog(false)}
    const cancelRec = () => {props.openBillingSet(false)}
    const delRec = () => {setDeleteDialog(true)}
    const delConfirm = () => {
        console.log('_id', _id)
        deleteRec(objectId + _id)
            .then(result => {
            })
        setDeleteDialog(false)
        setDeleteInfoDialog(true)
    }
    const delCancel = () => {setDeleteDialog(false)}

    return (
        <div>
            <div className='tool-bar'>
                <DialogTitle >
                    <Typography className='tool-title' noWrap={true}>Registro de Faturamento</Typography>
                </DialogTitle>
            </div>
            <div className='data-form-dialog'>

                <Grid container spacing={2} >
                    <Grid item xs={4}>
                        <TextField
                            id='attendanceDate'
                            label='Data'
                            value={attendanceDate}
                            onChange={(event) => { attendanceDateSet(event.target.value) }}
                            fullWidth={true}
                            disabled={false}
                            InputLabelProps={{ shrink: true, disabled: false }}
                            variant='outlined'
                            size='small'
                            type="date"
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <TextField
                            id='patient'
                            label='Paciente'
                            value={patientId}
                            onChange={(event) => { patientIdSet(event.target.value) }}
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
                    <Grid item xs={6}>
                        <TextField
                            id='professional'
                            label='Profissional'
                            value={professionalId}
                            onChange={(event) => { professionalIdSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={false}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            select
                        >
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
                            disabled={false}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            select
                        >
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
                            disabled={false}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            select
                        >
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
                            disabled={false}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            select
                        >
                            {covenantplanList
                            .filter(item => {return item.covenant_id === covenantId})
                            .map((option) => (
                                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            value={amount} // (parseFloat(amount).toFixed(2))
                            onChange={(event) => { amountSet(event.target.value) }}
                            id='amount'
                            label='Valor'
                            fullWidth={true}
                            InputLabelProps={{ shrink: true, disabled: false }}
                            variant='outlined'
                            size='small'
                            inputProps={{ type: 'number' }}
                            onBlur={(event) => { amountSet(parseFloat(event.target.value).toFixed(2).toString()) }}
                            InputProps={{ startAdornment: <InputAdornment position="start">R$</InputAdornment> }}
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
                            onClick={_ => cancelRec()} disabled={false}>VOLTAR
                        </Button>
                    </Box>
                </div>
            </DialogActions>

            <Dialog open={emptyRecDialog}>
                <DialogTitle id="alert-dialog-title">{"Registro sem descrição ou já existente não pode ser gravado."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Clique para continuar.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={emptyRecClose} color="primary" variant='contained'>Ok</Button>
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

        </div>
    )
}

export default Billing