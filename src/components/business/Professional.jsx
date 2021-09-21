import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent, 
    DialogContentText, DialogTitle } from '@material-ui/core'

import EditIcon from '@material-ui/icons/Edit'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn'

import { useStyles } from '../../services/stylemui'
import { getList, putRec, postRec, deleteRec } from '../../services/apiconnect'

const Professional = props => {
    
    let { id } = useParams()

    const [productId, setProductId] = useState(id)
    const [codprod, setCodprod] = useState('')
    const [discr, setDiscr] = useState('')
    const [saldo, setSaldo] = useState(0)
    const [tabela, setTabela] = useState(0)
    const [unidade, setUnidade] = useState('')
    const [proceden, setProceden] = useState('')
    const [ipi, setIpi] = useState(0)
    const [cf, setCf] = useState('')
    const [op, setOp] = useState('')

    const [codprodTemp, setCodprodTemp] = useState('')
    const [discrTemp, setDiscrTemp] = useState('')
    const [saldoTemp, setSaldoTemp] = useState(0)
    const [tabelaTemp, setTabelaTemp] = useState(0)
    const [unidadeTemp, setUnidadeTemp] = useState('')
    const [procedenTemp, setProcedenTemp] = useState('')
    const [ipiTemp, setIpiTemp] = useState(0)
    const [cfTemp, setCfTemp] = useState('')
    const [opTemp, setOpTemp] = useState('')

    const [insertMode, setInsertMode] = useState(!id)
    const [editMode, setEditMode] = useState(!id)

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteInfoDialog, setDeleteInfoDialog] = useState(false)
    const [emptyRecDialog, setEmptyRecDialog] = useState(false)

    const classes = useStyles()

    useEffect(() => {
        // let mounted = true;
        if (id) {
            getList('produto_id/' + id)
                .then(items => {
                    // if (mounted) {
                        setProductId(items.produto[0]._id)
                        setCodprod(items.produto[0].CODPROD)
                        setDiscr(items.produto[0].DISCR)
                        setSaldo(items.produto[0].SALDO)
                        setTabela(items.produto[0].TABELA)
                        setUnidade(items.produto[0].UNIDADE)
                        setProceden(items.produto[0].PROCEDEN)
                        setIpi(items.produto[0].IPI)
                        setCf(items.produto[0].CF)
                        setOp(items.produto[0].OP)

                        setCodprodTemp(items.produto[0].CODPROD)
                        setDiscrTemp(items.produto[0].DISCR)
                        setSaldoTemp(items.produto[0].SALDO)
                        setTabelaTemp(items.produto[0].TABELA)
                        setUnidadeTemp(items.produto[0].UNIDADE)
                        setProcedenTemp(items.produto[0].PROCEDEN)
                        setIpiTemp(items.produto[0].IPI)
                        setCfTemp(items.produto[0].CF)
                        setOpTemp(items.produto[0].OP)
                    // }
                })
        }
        // return () => mounted = false;
    }, [id])

    const saveRec = () => {
        if (!codprod || !discr) {
            setEmptyRecDialog(true)
            return null
        }
        getList('produto_cod/' + codprod)
        .then(item => {
            console.log('item', item)
            if (item.produto[0]) {
                setEmptyRecDialog(true)
                return null
            } else {
                let recObj = {
                    'CODPROD': codprod,
                    'DISCR': discr,
                    'SALDO': saldo,
                    'TABELA': tabela,
                    'UNIDADE': unidade,
                    'PROCEDEN': proceden,
                    'IPI': ipi,
                    'CF': cf,
                    'OP': op,
                }
                if (productId) {
                    recObj = { ...recObj, '_id': productId }
                    recObj = JSON.stringify(recObj)
                    putRec('produto/', recObj)
                } else {
                    recObj = JSON.stringify(recObj)
                    postRec('produto/', recObj)
                        .then(result => {
                            console.log(result)
                            setProductId(result.produto._id)
                        })
                }
                setCodprodTemp(codprod)
                setDiscrTemp(discr)
                setSaldoTemp(saldo)
                setTabelaTemp(tabela)
                setUnidadeTemp(unidade)
                setProcedenTemp(proceden)
                setIpiTemp(ipi)
                setCfTemp(cf)
                setOpTemp(op)
                setEditMode(false)
                setInsertMode(false)
            }
        })
    }

    const refreshRec = () => {
        if (insertMode) {
            document.getElementById("backButton").click();
        }
        setCodprod(codprodTemp)
        setDiscr(discrTemp)
        setSaldo(saldoTemp)
        setTabela(tabelaTemp)
        setUnidade(unidadeTemp)
        setProceden(procedenTemp)
        setIpi(ipiTemp)
        setCf(cfTemp)
        setOp(opTemp)
        setEditMode(!id)
        setInsertMode(!id)
    }

    const delRec = () => {
        setDeleteDialog(true)
    }

    const delConfirm = () => {
        let recObj = { '_id': productId }
        recObj = JSON.stringify(recObj)

        deleteRec('produto/', recObj)
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
                    <Typography variant='h5' className='tool-title'>Página do Produto</Typography>
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
                        href="/products" id='backButton' disabled={editMode}>VOLTAR
                    </Button>
                </div>
            </div>
            <div className='data-form'>
                <Grid container spacing={2} >
                    <Grid item xs={3}>
                        <TextField
                            value={codprod}
                            onChange={(event) => { setCodprod(event.target.value.toUpperCase()) }}
                            id='codprod'
                            label='Código Produto'
                            fullWidth={false}
                            disabled={!insertMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <TextField
                            value={discr}
                            onChange={(event) => { setDiscr(event.target.value.toUpperCase()) }}
                            id='discr'
                            label='Discriminação'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={2} >
                    <Grid item xs={3}>
                        <TextField
                            value={saldo}
                            onChange={(event) => { setSaldo(event.target.value) }}
                            id='saldo'
                            label='Saldo em Estoque'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={tabela}
                            onChange={(event) => { setTabela(event.target.value) }}
                            id='tabela'
                            label='Preço Tabela'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={unidade}
                            onChange={(event) => { setUnidade(event.target.value) }}
                            id='unidade'
                            label='Unidade'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={proceden}
                            onChange={(event) => { setProceden(event.target.value) }}
                            id='proceden'
                            label='Procedência'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={ipi}
                            onChange={(event) => { setIpi(event.target.value) }}
                            id='ipi'
                            label='IPI'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                            inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={cf}
                            onChange={(event) => { setCf(event.target.value) }}
                            id='cf'
                            label='Classificação Fiscal'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={op}
                            onChange={(event) => { setOp(event.target.value) }}
                            id='op'
                            label='Operação'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                        />
                    </Grid>
                </Grid>
            </div>
            <Dialog
                open={deleteDialog}
            // onClose={delCancel}
            >
                <DialogTitle id="alert-dialog-title">{"Apagar o produto selecionado?"}</DialogTitle>
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
                <DialogTitle id="alert-dialog-title">{"Produto removido do cadastro."}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Clique para voltar a lista de produtos.
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
                <DialogTitle id="alert-dialog-title">{"Produto sem código, sem descrição ou já existente não pode ser gravado."}</DialogTitle>
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