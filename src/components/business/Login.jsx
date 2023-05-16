import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    Grid, TextField, Typography, Button, Box, Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, MenuItem
} from '@mui/material'
import CryptoJS from 'crypto-js'

import EditIcon from '@mui/icons-material/Edit'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';

import { getList, putRec, postRec, deleteRec } from '../../services/apiconnect'
import { useStyles } from '../../services/stylemui'

const objectRef = 'user/'
const objectId = 'userid/'

const Login = props => {

    let { id } = useParams()

    const [_id, _idSet] = useState(id)
    const [name, nameSet] = useState('')
    const [login, loginSet] = useState('')
    const [passw, passwSet] = useState('')
    const [role, roleSet] = useState('')
    const [professionalId, professionalIdSet] = useState('')
    // const [professionalName, professionalNameSet] = useState('')

    const [infoOkDialog, infoOkDialogSet] = useState(false)
    const [invalidDialog, invalidDialogSet] = useState(false)
    const [recUpdated, setRecUpdated] = useState(true)
    const [professionalList, professionalListSet] = useState([])

    const [insertMode, setInsertMode] = useState(id === '0')
    const [editMode, setEditMode] = useState(id === '0')

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteInfoDialog, setDeleteInfoDialog] = useState(false)
    const [emptyRecDialog, setEmptyRecDialog] = useState(false)

    useEffect(() => {
        getList('professional/').then(items => { professionalListSet(items.record) })
        if (_id !== '0') {
            getList(objectId + _id)
                .then(items => {
                    loginSet(items.record.login || '')
                    nameSet(items.record.name || '')
                    // passwSet(items.record.passw || '')
                    roleSet(items.record.role || '')
                    professionalIdSet(items.record.professional_id || '')
                    // professionalNameSet(items.record[0].professional_name[0] || '')
                })
        } else {
            loginSet('')
            nameSet('')
            passwSet('')
            roleSet('')
            professionalIdSet('')
        }
        setRecUpdated(true)
    }, [_id, recUpdated])

    const saveRec = () => {
        if (!name || !login || !role) {
            invalidDialogSet(true)
            return null
        }
        getList('userlogin/' + login)
            .then(async item => {
                if (item.record[0] && item.record[0]._id !== _id) {
                    invalidDialogSet(true)
                    return null
                }
                let recObj = {
                    name,
                    login,
                    role,
                    professional_id: professionalId,
                }
                if (passw) {
                    const passwcr = CryptoJS.AES.encrypt(passw, process.env.REACT_APP_SECRET).toString();
                    recObj = { ...recObj, passw: passwcr }
                }
                if (_id !== '0') {
                    recObj = JSON.stringify(recObj)
                    putRec(objectId + _id, recObj)
                        .then(result => {
                            if (!result.error) infoOkDialogSet(true)
                        })
                } else {
                    recObj = JSON.stringify(recObj)
                    postRec(objectRef, recObj)
                        .then(result => {
                            if (!result.error) infoOkDialogSet(true)
                        })
                }
                return null
            })
        // setRecUpdated(false)
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

    const delRec = () => { setDeleteDialog(true) }

    const delConfirm = () => {
        console.log('_id', _id)
        deleteRec(objectId + _id)
            .then(result => { })
        setDeleteDialog(false)
        setDeleteInfoDialog(true)
    }

    const delCancel = () => { setDeleteDialog(false) }
    const delInformClose = () => { document.getElementById("backButton").click(); }
    const infoOkDialogClose = () => { infoOkDialogSet(false) }
    const invalidDialogClose = () => { invalidDialogSet(false) }

    return (
        <>
            <div >
                <div className='tool-bar'>
                    <div >
                        <Typography variant='h5' className='tool-title' noWrap={true}>Registro de Login</Typography>
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
                                href="/loginList" id='backButton' disabled={editMode}>VOLTAR
                            </Button>
                        </Box>
                    </div>
                </div>
                <div className='data-form'>
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <TextField
                                value={name}
                                onChange={(event) => { nameSet(event.target.value) }}
                                id='name'
                                label='Nome do Usuário'
                                fullWidth={false}
                                disabled={!editMode}
                                InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                                variant='standard'
                                size='small'
                                sx={{ width: 300 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={login}
                                onChange={(event) => { loginSet(event.target.value) }}
                                id='login'
                                label='Login'
                                fullWidth={false}
                                disabled={!editMode}
                                InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                                variant='standard'
                                size='small'
                                sx={{ width: 300 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={passw}
                                onChange={(event) => { passwSet(event.target.value) }}
                                id='passw'
                                label='Senha'
                                fullWidth={false}
                                disabled={!editMode}
                                InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                                variant='standard'
                                size='small'
                                type='password'
                                sx={{ width: 300 }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={role}
                                onChange={(event) => { roleSet(event.target.value) }}
                                id='role'
                                label='Função'
                                fullWidth={false}
                                disabled={!editMode}
                                InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                                variant='standard'
                                size='small'
                                sx={{ width: 300 }}
                                select>
                                <MenuItem key={0} value={"ADMIN"}>{"Medico"}</MenuItem>
                                <MenuItem key={1} value={"FUNC"}>{"Funcionario"}</MenuItem>
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
                                InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
                                variant="standard"
                                sx={{ width: 300 }}
                                select>
                                {professionalList.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}></Grid>
                    </Grid>
                </div>
            </div>
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
                    <DialogContentText id="alert-dialog-description">
                        Clique para voltar a lista.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={delInformClose} color="primary" variant='contained'>Ok</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={invalidDialog}>
                <DialogTitle id="alert-dialog-title">{"Todos os campos são obrigatórios e o login não pode coincidir com outro já cadastrado."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Clique em Ok para continuar.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={invalidDialogClose} color="primary" variant='contained'>Ok</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={infoOkDialog}>
                <DialogTitle id="alert-dialog-title">{"Informações registradas com sucesso."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Clique em Ok para continuar.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={infoOkDialogClose} color="primary" variant='contained'>Ok</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default Login