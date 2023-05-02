import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import {
    Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, Box, MenuItem
} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import TextEditor from "../layout/TextEditor";
import HelpIcon from '@mui/icons-material/Help'

import { useStyles } from '../../services/stylemui'
import { getList, putRec, postRec, deleteRec } from '../../services/apiconnect'

const objectRef = 'texttemplate'
const objectId = 'texttemplateid/'
const objectName = 'texttemplatename/'

const TextTemplate = props => {

    let { id } = useParams()

    const [_id, _idSet] = useState('')
    const [name, nameSet] = useState('')
    const [type, typeSet] = useState('')
    const [text, textSet] = useState('')

    const [insertMode, setInsertMode] = useState(id === '0')
    const [editMode, setEditMode] = useState(id === '0')

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteInfoDialog, setDeleteInfoDialog] = useState(false)
    const [emptyRecDialog, setEmptyRecDialog] = useState(false)
    const [macroDialog, macroDialogSet] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        if (id !== '0') {
            getList(objectId + id)
                .then(items => {
                    _idSet(items.record._id)
                    nameSet(items.record.name)
                    typeSet(items.record.type)
                    textSet(items.record.text)

                })
        }
    }, [id])

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
                    type,
                    text
                }
                if (id !== '0') {
                    recObj = JSON.stringify(recObj)
                    putRec(objectId + _id, recObj)
                        .then(result => {
                            console.log('put', result)
                        })
                } else {
                    recObj = JSON.stringify(recObj)
                    postRec(objectRef, recObj)
                        .then(result => {
                            _idSet(result.record._id)
                        })
                }
                setEditMode(false)
                setInsertMode(false)
            })
    }

    const refreshRec = () => {
        if (insertMode) {
            document.getElementById("backButton").click();
        }
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

    const macroDialogClose = () => {
        macroDialogSet(false)
    }

    return (
        <div>
            <div className='tool-bar'>
                <div >
                    <Typography variant='h5' className='tool-title' noWrap={true}>Registro de Texto Padrão</Typography>
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
                            href="/texttemplateList" id='backButton' disabled={editMode}>VOLTAR
                        </Button>
                    </Box>
                </div>
            </div>
            <div className='data-form'>
                <Grid container spacing={2} >
                    <Grid item xs={3}>
                        <TextField
                            value={name}
                            onChange={(event) => { nameSet(event.target.value) }}
                            id='name'
                            label='Nome do Texto Padrão'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={type}
                            onChange={(event) => { typeSet(event.target.value) }}
                            id='type'
                            label='Tipo'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            variant='outlined'
                            size='small'
                            select>
                            <MenuItem key='1' value={"ATESTADO"}>ATESTADO</MenuItem>
                            <MenuItem key='6' value={"CORAÇÃO"}>CORAÇÃO</MenuItem>
                            <MenuItem key='3' value={"LABORATÓRIO"}>LABORATÓRIO</MenuItem>
                            <MenuItem key='6' value={"PULMÃO"}>PULMÃO</MenuItem>
                            <MenuItem key='6' value={"RADIOLOGIA"}>RADIOLGIA</MenuItem>
                            <MenuItem key='2' value={"RECIBO"}>RECIBO</MenuItem>
                            <MenuItem key='5' value={"RESSONÂNCIA"}>RESSONÂNCIA</MenuItem>
                            <MenuItem key='4' value={"TOMOGRAFIA"}>TOMOGRAFIA</MenuItem>
                            <MenuItem key='6' value={"ULTRASSOM"}>ULTRASSOM</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <Button color='success' variant='contained' size='small' startIcon={<HelpIcon />}
                            onClick={_ => macroDialogSet(true)} disabled={false}>
                            Macros
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <TextEditor content={text} textSet={textSet} disabled={!editMode}></TextEditor>
                    </Grid>
                </Grid>
            </div>

            <Dialog open={deleteDialog}>
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
                open={deleteInfoDialog}>
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

            <Dialog open={emptyRecDialog}>
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

            <Dialog open={macroDialog}>
                <DialogTitle id="title">{"Tabela de Macros"}</DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 350 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Macro</TableCell>
                                    <TableCell >Função</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow key={0} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        @nome
                                    </TableCell>
                                    <TableCell >
                                        Nome do paciente
                                    </TableCell>
                                </TableRow>
                                {/* <TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        @idade
                                    </TableCell>
                                    <TableCell >
                                        Idade do paciente
                                    </TableCell>
                                </TableRow>
                                <TableRow key={2} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        @sexo
                                    </TableCell>
                                    <TableCell >
                                        Sexo do paciente
                                    </TableCell>
                                </TableRow>
                                <TableRow key={3} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        @nasc
                                    </TableCell>
                                    <TableCell >
                                        Data de nasacimento do paciente
                                    </TableCell>
                                </TableRow> */}
                                <TableRow key={4} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        @reg
                                    </TableCell>
                                    <TableCell >
                                        Número de registro interno do paciente
                                    </TableCell>
                                </TableRow>
                                <TableRow key={4} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        @cpf
                                    </TableCell>
                                    <TableCell >
                                        Número do CPF do paciente
                                    </TableCell>
                                </TableRow>
                                <TableRow key={5} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        @ender
                                    </TableCell>
                                    <TableCell >
                                        Endereço do paciente
                                    </TableCell>
                                </TableRow>
                                <TableRow key={6} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        @data
                                    </TableCell>
                                    <TableCell >
                                        Data do dia
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button onClick={macroDialogClose} color="primary" variant='contained'>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default TextTemplate