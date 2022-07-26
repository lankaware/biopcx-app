import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from 'reactstrap';
import {
    Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Checkbox, FormControlLabel, Box,
    AppBar, Tabs, Tab, MenuItem
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
import { timeBr, stdTime } from '../../services/dateutils';

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

    const [specialtyList, specialtyListSet] = useState([])
    const [availabilityList, availabilityListSet] = useState([])

    const [insertMode, setInsertMode] = useState(id === '0')
    const [editMode, setEditMode] = useState(id === '0')
    const [recUpdated, setRecUpdated] = useState(true)

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteInfoDialog, setDeleteInfoDialog] = useState(false)
    const [emptyRecDialog, setEmptyRecDialog] = useState(false)

    const [tabValue, setTabValue] = useState(0);

    const [editDialog, editDialogSet] = useState(false)


    const classes = useStyles()

    useEffect(() => {
        getList('specialty/').then(items => { specialtyListSet(items.record) })
        if (_id !== '0') {
            var tempList = []
            getList(objectId + _id)
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

                    for (const subItem of items.record[0].availability) {
                        const newLine = {
                            '_id': subItem._id,
                            'weekDay': subItem.weekDay,
                            'initialTime': timeBr(subItem.initialTime) || '00:00',
                            'finalTime': timeBr(subItem.finalTime) || '00:00',
                            'interval': subItem.interval,
                        }
                        console.log('subItem.initialTime', subItem.initialTime)
                        console.log('subItem.initialTime BR', timeBr(subItem.initialTime))
                        tempList = ([...tempList, newLine])
                    }
                    availabilityListSet(tempList)
                })
            // .then(_ => {
            //     if (tempList.length === 0) {
            //         const newLine = {
            //             '_id': '0',
            //             'weekDay': 1,
            //             'initialTime': '00:00',
            //             'finalTime': '00:00',
            //             'interval': 0,
            //         }
            //         tempList = ([newLine])
            //     }
            // })
        }
        setRecUpdated(true)

    }, [_id, recUpdated])

    const saveRec = () => {
        if (!name) {
            setEmptyRecDialog(true)
            return null
        }

        let recSubList = availabilityList
            .filter(element => element.interval !== '*** Excluído ***')
            .map(item => {
                if (item._id && item._id.length === 24) {
                    return {
                        _id: item._id,
                        weekDay: item.weekDay,
                        initialTime: '1970-01-01T' + stdTime('1970-01-01T' + item.initialTime),
                        finalTime: '1970-01-01T' + stdTime('1970-01-01T' + item.finalTime),
                        interval: item.interval
                    }
                } else {
                    return {
                        weekDay: item.weekDay,
                        initialTime: '1970-01-01T' + stdTime('1970-01-01T' + item.initialTime),
                        finalTime: '1970-01-01T' + stdTime('1970-01-01T' + item.finalTime),
                        interval: item.interval
                    }
                }
            })
            .sort((a, b) => {
                if (a.weekDay + a.initialTime > b.weekDay + b.initialTime)
                    return 1
                else
                    return -1
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
        setRecUpdated(false)
        setEditMode(false)
        setInsertMode(false)
    }

    const refreshRec = () => {
        if (insertMode) {
            document.getElementById("backButton").click();
        }
        setRecUpdated(false)
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
                            href="/professionalList" id='backButton' disabled={editMode}>VOLTAR
                        </Button>
                    </Box>
                </div>
            </div>
            <div className='data-form'>
                <Grid container spacing={1} >
                    <Grid item xs={3}>
                        <TextField
                            value={name}
                            onChange={(event) => { nameSet(event.target.value) }}
                            id='name'
                            label='Nome do Profissional'
                            fullWidth={true}
                            disabled={!insertMode}
                            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                            variant='standard'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            value={cpf}
                            onChange={(event) => { cpfSet(event.target.value) }}
                            id='cpf'
                            label='CPF'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                            variant='standard'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id='specialty'
                            label='Especialidade'
                            value={specialtyId}
                            onChange={(event) => { specialtyIdSet(event.target.value) }}
                            size='small'
                            fullWidth={true}
                            disabled={!editMode}
                            type='text'
                            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                            variant='standard'
                            select>
                            {specialtyList.map((option) => (
                                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={1}>
                        <TextField
                            value={crm}
                            onChange={(event) => { crmSet(event.target.value) }}
                            id='crm'
                            label='CRM'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                            variant='standard'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            value={email}
                            onChange={(event) => { emailSet(event.target.value) }}
                            id='email'
                            label='Email'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                            variant='standard'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            value={phone}
                            onChange={(event) => { phoneSet(event.target.value) }}
                            id='phone'
                            label='Fone'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                            variant='standard'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            value={cns}
                            onChange={(event) => { cnsSet(event.target.value) }}
                            id='cns'
                            label='CNS'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                            variant='standard'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            value={cbo}
                            onChange={(event) => { cboSet(event.target.value) }}
                            id='cbo'
                            label='CBO'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                            variant='standard'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            value={admissionDate}
                            onChange={(event) => { admissionDateSet(event.target.value) }}
                            id='admissionDate'
                            label='Data de Registro'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                            variant='standard'
                            size='small'
                            inputProps={{ type: 'date' }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            value={dismissalDate}
                            onChange={(event) => { dismissalDateSet(event.target.value) }}
                            id='dismissalDate'
                            label='Desligamento'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                            variant='standard'
                            size='small'
                            inputProps={{ type: 'date' }}
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
                            editDialogSet={editDialogSet}
                            editDialog={editDialog}
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