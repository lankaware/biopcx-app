import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Box
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

import { useStyles } from '../../services/stylemui'
import { getList, putRec, postRec, deleteRec } from '../../services/apiconnect'

const objectRef = 'procedure/'
const objectId = 'procedureid/'
const objectName = 'procedurename/'

const Procedure = props => {

    let { id } = useParams()

    const [_id, _idSet] = useState(id)

    const [name, nameSet] = useState('')
    const [cbhpm, cbhpmSet] = useState('')
    const [carry, carrySet] = useState('')

    let _id = props._id
    let _idSet = props._idSet
    let insertMode = props.insertMode;
    let setInsertMode = props.setInsertMode;
    let editMode = props.editMode;
    let setEditMode = props.setEditMode;
    let setUpdateList = props.setUpdateList;

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteInfoDialog, setDeleteInfoDialog] = useState(false)
    const [emptyRecDialog, setEmptyRecDialog] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        if (_id !== '0') {
            getList(objectId + _id)
                .then(items => {
                    _idSet(items.record._id)
                    nameSet(items.record.name)
                    cbhpmSet(items.record.cbhpm)
                    carrySet(items.record.carry)
                })
        }
    }, [_id])

    const saveRec = () => {
        if (!name) {
            setEmptyRecDialog(true)
            return null
        }
        getList(objectName + name)
            .then(item => {
                if (item.record[0] && insertMode) {
                    setEmptyRecDialog(true)
                    return null
                }
                let recObj = {
                    name,
                    cbhpm,
                    carry
                }
                if (_id !== '0') {
                    recObj = JSON.stringify(recObj)
                    putRec(objectId + _id, recObj)
                } else {
                    recObj = JSON.stringify(recObj)
                    postRec(objectRef, recObj)
                    setUpdateList(true)
                }
            })
            _idSet('0');
            nameSet("");
            cbhpmSet("");
            carrySet("");
            setInsertMode(true);
    }

    const refreshRec = () => {
        if (insertMode) {
            document.getElementById("backButton").click();
        }
        setInsertMode(true);
        _idSet('0')
        nameSet("")
        cbhpmSet("")
        carrySet("")
    }

    const delRec = () => {
        setDeleteDialog(true)
    }

    const delConfirm = () => {
        deleteRec(objectId + _id);
        _idSet('0')
        nameSet("")
        cbhpmSet("")
        carrySet("")
        props.setInsertMode(true);
        setDeleteDialog(false)
    }

    const delCancel = () => {
        setDeleteDialog(false)
    }

    const emptyRecClose = () => {
        setEmptyRecDialog(false)
    }

    return (
        <div>
            <div className='tool-bar medicineAdd'>
                <div >
                    <Typography variant='h5' className='tool-title' noWrap={true}>Registro de Procedimento</Typography>
                </div>
                {/* <div className='tool-buttons medicineAdd'>
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
                            href="/procedureList" id='backButton' disabled={editMode}>VOLTAR
                        </Button>
                    </Box>
                </div> */}
            </div>
            <div className='data-form medicineAdd'>
                <Grid container spacing={2} sx={{ width: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            value={name}
                            onChange={(event) => { nameSet(event.target.value) }}
                            id='name'
                            label='Nome do Procedimento'
                            fullWidth={true}
                            disabled={!insertMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={cbhpm}
                            onChange={(event) => { cbhpmSet(event.target.value) }}
                            id='cbhpm'
                            label='Código CBHPM'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={carry}
                            onChange={(event) => { carrySet(event.target.value) }}
                            id='carry'
                            label='Porte'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            startIcon={<SaveAltIcon />}
                            onClick={(_) => saveRec()}
                            disabled={!editMode}
                        >
                            SALVAR
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            startIcon={<CancelIcon />}
                            onClick={(_) => {
                                refreshRec()
                            }}
                            disabled={!editMode}
                        >
                            CANCELAR
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            startIcon={<DeleteForeverIcon />}
                            onClick={(_) => delRec()}
                            disabled={_id === '0' ? true : false }
                        >
                            APAGAR
                        </Button>
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

export default Procedure