import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Select
} from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

import EditIcon from '@material-ui/icons/Edit'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'

import { useStyles } from '../../services/stylemui'
import { getList, putRec, postRec, deleteRec } from '../../services/apiconnect'

const objectRef = 'professional/'
const objectId = 'professionalid/'

const Professional = props => {

    let { id } = useParams()

    const [_id, _idSet] = useState('')
    const [name, nameSet] = useState('')
    const [cpf, cpfSet] = useState('')
    const [specialty, specialtySet] = useState('')
    const [specialtyName, specialtyNameSet] = useState('')
    const [crm, crmSet] = useState('')
    const [email, emailSet] = useState('')
    const [phone, phoneSet] = useState('')
    const [admissionDate, admissionDateSet] = useState('')
    const [dismissalDate, dismissalDateSet] = useState('')
    const [cns, cnsSet] = useState('')
    const [cbo, cboSet] = useState('')
    const [internal, internalSet] = useState('')

    const [nameTemp, nameSetTemp] = useState('')
    const [cpfTemp, cpfSetTemp] = useState('')
    const [specialtyTemp, specialtySetTemp] = useState('')
    const [crmTemp, crmSetTemp] = useState('')
    const [emailTemp, emailSetTemp] = useState('')
    const [phoneTemp, phoneSetTemp] = useState('')
    const [admissionDateTemp, admissionDateSetTemp] = useState('')
    const [dismissalDateTemp, dismissalDateSetTemp] = useState('')
    const [cnsTemp, cnsSetTemp] = useState('')
    const [cboTemp, cboSetTemp] = useState('')
    const [internalTemp, internalSetTemp] = useState('')

    const [specialtyList, specialtyListSet] = useState([])

    const [insertMode, setInsertMode] = useState(id === '0')
    const [editMode, setEditMode] = useState(id === '0')

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteInfoDialog, setDeleteInfoDialog] = useState(false)
    const [emptyRecDialog, setEmptyRecDialog] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        if (id !== '0') {
            getList(objectId + id)
                .then(items => {
                    console.log('record', items.record)
                    _idSet(items.record._id)

                    nameSet(items.record[0].name || '')
                    cpfSet(items.record[0].cpf || '')
                    specialtySet(items.record[0].specialty_id || '')
                    specialtyNameSet(items.record[0].specialty_name[0] || '')
                    crmSet(items.record[0].crm || '')
                    emailSet(items.record[0].email || '')
                    phoneSet(items.record[0].phone || '')
                    admissionDateSet(items.record[0].admissionDate || '')
                    dismissalDateSet(items.record[0].dismissalDate || '')
                    cnsSet(items.record[0].cns || '')
                    cboSet(items.record[0].cbo || '')
                    internalSet(items.record[0].internal || '')

                    nameSetTemp(items.record[0].name)
                    cpfSetTemp(items.record[0].cpf)
                    specialtySetTemp(items.record[0].specialty_id)
                    crmSetTemp(items.record[0].crm)
                    emailSetTemp(items.record[0].email)
                    phoneSetTemp(items.record[0].phone)
                    admissionDateSetTemp(items.record[0].admissionDate)
                    dismissalDateSetTemp(items.record[0].dismissalDate)
                    cnsSetTemp(items.record[0].cns)
                    cboSetTemp(items.record[0].cbo)
                    internalSetTemp(items.record[0].internal)
                })
        }
        getList('specialty/')
            .then(items => {
                specialtyListSet(items.record)
            })
    }, [id])

    const saveRec = () => {
        if (!name) {
            setEmptyRecDialog(true)
            return null
        }
        let recObj = {
            name,
            cpf,
            specialty_id: specialty,
            crm,
            email,
            phone,
            admissionDate,
            dismissalDate,
            cns,
            cbo,
            internal
        }
        if (_id) {
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
                    _idSet(result.record._id)
                })
        }
        nameSetTemp(name)
        cpfSetTemp(cpf)
        specialtySetTemp(specialty)
        crmSetTemp(crm)
        emailSetTemp(email)
        phoneSetTemp(phone)
        admissionDateSetTemp(admissionDate)
        dismissalDateSetTemp(dismissalDate)
        cnsSetTemp(cns)
        cboSetTemp(cbo)
        internalSetTemp(internal)

        setEditMode(false)
        setInsertMode(false)
    }

    const refreshRec = () => {
        if (insertMode) {
            document.getElementById("backButton").click();
        }
        nameSet(nameTemp)
        cpfSet(cpfTemp)
        specialtySet(specialtyTemp)
        crmSet(crmTemp)
        emailSet(emailTemp)
        phoneSet(phoneTemp)
        admissionDateSet(admissionDateTemp)
        dismissalDateSet(dismissalDateTemp)
        cnsSet(cnsTemp)
        cboSet(cboTemp)
        internalSet(internalTemp)

        setEditMode(false)
    }

    const delRec = () => {
        setDeleteDialog(true)
    }

    const delConfirm = () => {
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

    return (
        <div>
            <div className='tool-bar'>
                <div >
                    <Typography variant='h5' className='tool-title' noWrap={true}>Registro de Profissional</Typography>
                </div>
                <div className={classes.toolButtons + ' button-link'}>
                    <Button color='primary' variant='contained' size='small' startIcon={<EditIcon />}
                        onClick={_ => setEditMode(true)} disabled={editMode}>EDITAR
                    </Button>
                    <Button color='primary' variant='contained' size='small' startIcon={<SaveAltIcon />}
                        onClick={_ => saveRec()} disabled={!editMode}>SALVAR
                    </Button>
                    <Button color='primary' variant='contained' size='small' startIcon={<CancelIcon />}
                        onClick={_ => refreshRec()} disabled={!editMode}>CANCELAR
                    </Button>
                    <Button color='primary' variant='contained' size='small' startIcon={<DeleteForeverIcon />}
                        onClick={_ => delRec()} disabled={editMode}>APAGAR
                    </Button>
                    <Button color='primary' variant='contained' size='small' startIcon={<KeyboardReturnIcon />}
                        href="/professionals" id='backButton' disabled={editMode}>VOLTAR
                    </Button>
                </div>
            </div>
            <div className='data-form'>
                <Grid container spacing={2} >
                    <Grid item xs={3}>
                        <TextField
                            value={name}
                            onChange={(event) => { nameSet(event.target.value.toUpperCase()) }}
                            id='name'
                            label='Nome do Profissional'
                            fullWidth={false}
                            disabled={!insertMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={cpf}
                            onChange={(event) => { cpfSet(event.target.value) }}
                            id='cpf'
                            label='CPF'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={specialty}
                            onChange={(event) => { specialtySet(event.target.value) }}
                            id='specialty'
                            label='Especialidade'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />

                        {/* <Autocomplete
                            id="specialty"
                            options={specialtyList}
                            getOptionLabel={(option) => option.name}
                            style={{ width: 200 }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    label="Especialidade"
                                    variant="outlined"
                                    value={specialtyName}
                                    InputLabelProps={{ shrink: true }}
                                    
                                    inputProps={{
                                        ...params.inputProps,
                                        // autoComplete: 'new-password', // disable autocomplete and autofill
                                    }}
                                />}
                            size='small'
                            // inputValue={specialtyName}
                        // onBlur={(e) => { launchCodprod(e) }}
                        /> */}

                        {/* <Select
                            value={specialtyName}
                            onChange={(event) => { specialtySet(event.target.value) }}
                            id='specialty'
                            label='Especialidade'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        /> */}

                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={crm}
                            onChange={(event) => { crmSet(event.target.value) }}
                            id='crm'
                            label='CRM'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={email}
                            onChange={(event) => { emailSet(event.target.value) }}
                            id='email'
                            label='Email'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={phone}
                            onChange={(event) => { phoneSet(event.target.value) }}
                            id='phone'
                            label='Fone'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={admissionDate}
                            onChange={(event) => { admissionDateSet(event.target.value) }}
                            id='admissionDate'
                            label='Data de Registro'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={dismissalDate}
                            onChange={(event) => { dismissalDateSet(event.target.value) }}
                            id='dismissalDate'
                            label='Data de Desligamento'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={cns}
                            onChange={(event) => { cnsSet(event.target.value) }}
                            id='cns'
                            label='CNS'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={cbo}
                            onChange={(event) => { cboSet(event.target.value) }}
                            id='cbo'
                            label='CBO'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={internal}
                            onChange={(event) => { internalSet(event.target.value) }}
                            id='internal'
                            label='Interno?'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                </Grid>
            </div>
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

export default Professional