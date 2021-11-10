import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from 'reactstrap';
import {
    Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Checkbox, Autocomplete, FormControlLabel,
    AppBar, Tabs, Tab
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

import { useStyles } from '../../services/stylemui'
import { getList, putRec, postRec, deleteRec } from '../../services/apiconnect'
import TabPanel, { posTab } from '../commons/TabPanel'
import { theme } from '../../services/customtheme'

import ProfessionalAvailability from './ProfessionalAvailability'
import { timeBr } from '../../services/dateutils';

const objectRef = 'professional/'
const objectId = 'professionalid/'

const Professional = props => {

    let { id } = useParams()

    const [_id, _idSet] = useState(id)
    const [name, nameSet] = useState('')
    const [cpf, cpfSet] = useState('')
    const [specialtyId, specialtyIdSet] = useState('')
    const [specialtyName, specialtyNameSet] = useState('')
    const [crm, crmSet] = useState('')
    const [email, emailSet] = useState('')
    const [phone, phoneSet] = useState('')
    const [admissionDate, admissionDateSet] = useState('')
    const [dismissalDate, dismissalDateSet] = useState('')
    const [cns, cnsSet] = useState('')
    const [cbo, cboSet] = useState('')
    const [internal, internalSet] = useState(false)

    const [nameTemp, nameSetTemp] = useState('')
    const [cpfTemp, cpfSetTemp] = useState('')
    const [specialtyIdTemp, specialtyIdSetTemp] = useState('')
    const [specialtyNameTemp, specialtyNameSetTemp] = useState('')
    const [crmTemp, crmSetTemp] = useState('')
    const [emailTemp, emailSetTemp] = useState('')
    const [phoneTemp, phoneSetTemp] = useState('')
    const [admissionDateTemp, admissionDateSetTemp] = useState('')
    const [dismissalDateTemp, dismissalDateSetTemp] = useState('')
    const [cnsTemp, cnsSetTemp] = useState('')
    const [cboTemp, cboSetTemp] = useState('')
    const [internalTemp, internalSetTemp] = useState(false)

    const [specialtyList, specialtyListSet] = useState([])
    const [availabilityList, availabilityListSet] = useState([])

    const [insertMode, setInsertMode] = useState(id === '0')
    const [editMode, setEditMode] = useState(id === '0')

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteInfoDialog, setDeleteInfoDialog] = useState(false)
    const [emptyRecDialog, setEmptyRecDialog] = useState(false)

    const [tabValue, setTabValue] = useState(0);

    const classes = useStyles()

    useEffect(() => {
        if (id !== '0') {
            var tempList = []

            getList(objectId + id)
                .then(items => {
                    // _idSet(items)

                    nameSet(items.record[0].name || '')
                    cpfSet(items.record[0].cpf || '')
                    specialtyIdSet(items.record[0].specialty_id || '')
                    specialtyNameSet(items.record[0].specialty_name[0] || '')
                    crmSet(items.record[0].crm || '')
                    emailSet(items.record[0].email || '')
                    phoneSet(items.record[0].phone || '')
                    admissionDateSet((items.record[0].admissionDate || '').substr(0, 10))
                    dismissalDateSet((items.record[0].dismissalDate || '').substr(0, 10))
                    cnsSet(items.record[0].cns || '')
                    cboSet(items.record[0].cbo || '')
                    internalSet(items.record[0].internal || false)

                    nameSetTemp(items.record[0].name || '')
                    cpfSetTemp(items.record[0].cpf || '')
                    specialtyNameSetTemp(items.record[0].specialty_name[0] || '')
                    specialtyIdSetTemp(items.record[0].specialty_id || '')
                    crmSetTemp(items.record[0].crm || '')
                    emailSetTemp(items.record[0].email || '')
                    phoneSetTemp(items.record[0].phone || '')
                    admissionDateSetTemp((items.record[0].admissionDate || '').substr(0, 10))
                    dismissalDateSetTemp((items.record[0].dismissalDate || '').substr(0, 10))
                    cnsSetTemp(items.record[0].cns || '')
                    cboSetTemp(items.record[0].cbo || '')
                    internalSetTemp(items.record[0].internal || false)

                    for (const subItem of items.record[0].availability) {
                        const newLine = {
                            '_id': subItem._id,
                            'weekDay': subItem.weekDay,
                            'initialTime': timeBr(subItem.initialTime) || '00:00',
                            'finalTime': timeBr(subItem.finalTime) || '00:00',
                            'interval': subItem.interval,
                        }
                        console.log('subItem.initialTime', timeBr(subItem.initialTime))
                        console.log('newLine', newLine)
                        tempList = ([...tempList, newLine])
                    }
                })
                .then(_ => {
                    if (tempList.length === 0) {
                        const newLine = {
                            '_id': '0',
                            'weekDay': 1,
                            'initialTime': '00:00',
                            'finalTime': '00:00',
                            'interval': 0,
                        }
                        tempList = ([newLine])
                    }
                    availabilityListSet(tempList)
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
        let recSubList = availabilityList.map(item => {
            console.log('item', item)
            if (item._id && item._id.length === 24) {
                return {
                    _id: item._id,
                    weekDay: item.weekDay,
                    initialTime: '1970-01-01T' + item.initialTime,
                    finalTime: '1970-01-01T' + item.finalTime,
                    interval: item.interval
                }
            } else {
                return {
                    weekDay: item.weekDay,
                    initialTime: '1970-01-01T' + item.initialTime,
                    finalTime: '1970-01-01T' + item.finalTime,
                    interval: item.interval
                }
            }
        })
        console.log('recSubList', recSubList)
        let recObj = {
            name,
            cpf,
            specialty_id: specialtyId,
            crm,
            email,
            phone,
            admissionDate,
            dismissalDate,
            cns,
            cbo,
            internal,
            availability: recSubList
        }
        if (_id !== '0') {
            recObj = JSON.stringify(recObj)
            putRec(objectId + _id, recObj)
                .then(result => {
                    console.log('put', result)
                })
        } else {
            recObj = JSON.stringify(recObj)
            postRec(objectRef, recObj)
                .then(result => {
                    console.log('result', result)
                    _idSet(result.record._id)
                })
        }
        nameSetTemp(name)
        cpfSetTemp(cpf)
        specialtyIdSetTemp(specialtyId)
        specialtyNameSetTemp(specialtyName)
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
        specialtyIdSet(specialtyIdTemp)
        specialtyNameSet(specialtyNameTemp)
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
        console.log('_id', _id)
        deleteRec(objectId + _id)
            .then(result => {
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
                        <Autocomplete
                            id="specialty"
                            options={specialtyList}
                            getOptionLabel={(option) => option.name}
                            // style={{ width: 230 }}
                            size='small'
                            disabled={!editMode}
                            onChange={(event, newValue) => { specialtyIdSet(newValue._id) }}
                            inputValue={specialtyName}
                            onInputChange={(event, newInputValue) => { if (event && event.type !== 'blur') specialtyNameSet(newInputValue) }}
                            renderInput={(params) =>
                                <TextField {...params}
                                    label="Especialidade"
                                    variant="outlined"
                                    InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                    inputProps={{ ...params.inputProps }}
                                />}
                        />
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
                            inputProps={{ type: 'date' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={dismissalDate}
                            onChange={(event) => { dismissalDateSet(event.target.value) }}
                            id='dismissalDate'
                            label='Desligamento'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                            inputProps={{ type: 'date' }}
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
                        <FormControlLabel
                            label="Interno?"
                            control={
                                <Checkbox
                                    checked={internal}
                                    onChange={(event) => { internalSet(event.target.checked) }}
                                />
                            }
                        />
                    </Grid>
                </Grid>
            </div>
            <Form className='data-form-level1'>

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
                            <Tab label="Disponibilidade" {...posTab(0)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={tabValue} index={0} dir={theme.direction}>
                        <ProfessionalAvailability
                            itemList={availabilityList}
                            editMode={editMode}
                            onChangeSublist={availabilityListSet}
                        />
                    </TabPanel>
                </div>

            </Form>

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
                    <Button onClick={delCancel} color="primary" variant='contained' autoFocus
                    >Cancelar
                    </Button>
                    <Button onClick={delConfirm} color="secondary" variant='contained'
                    >Confirmar
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