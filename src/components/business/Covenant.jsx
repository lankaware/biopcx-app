import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Form } from 'reactstrap';
import {
    Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Box, AppBar, Tabs, Tab, MenuItem
} from '@mui/material'
import DataTable from 'react-data-table-component'

import EditIcon from '@mui/icons-material/Edit'
import SaveAltIcon from '@mui/icons-material/SaveAlt'
import CancelIcon from '@mui/icons-material/Cancel'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'
import AddIcon from '@mui/icons-material/Add';

import { getList, putRec, postRec, deleteRec } from '../../services/apiconnect'
import TabPanel, { posTab } from '../commons/TabPanel'
import { theme } from '../../services/customtheme-bkp'
import { customStyles1 } from '../../services/datatablestyle'

const objectRef = 'covenant/'
const objectId = 'covenantid/'

var currentPlan = 0
const currentPlanSet = (value) => {
    currentPlan = value
}
var planListTemp = []
const planListTempSet = (newObject) => {
    planListTemp = newObject
}

var currentPrice = 0
const currentPriceSet = (value) => {
    currentPrice = value
}
var priceListTemp = []
const priceListTempSet = (newObject) => {
    priceListTemp = newObject
}

const Covenant = props => {

    let { id } = useParams()

    const [_id, _idSet] = useState(id)
    const [name, nameSet] = useState('')
    const [phone, phoneSet] = useState('')
    const [email, emailSet] = useState('')
    const [contractNumber, contractNumberSet] = useState('')
    const [registerDate, registerDateSet] = useState('')
    const [billingDay, billingDaySet] = useState('')
    const [paymentDay, paymentDaySet] = useState('')

    const [planList, planListSet] = useState([])
    const [priceList, priceListSet] = useState([])
    const [procedureList, procedureListSet] = useState([])

    const [insertMode, setInsertMode] = useState(id === '0')
    const [editMode, setEditMode] = useState(id === '0')
    const [recUpdated, setRecUpdated] = useState(true)

    const [deleteDialog, setDeleteDialog] = useState(false)
    const [deleteInfoDialog, setDeleteInfoDialog] = useState(false)
    const [emptyRecDialog, setEmptyRecDialog] = useState(false)

    const [editPlanDialog, editPlanDialogSet] = useState(false)
    const [planName, planNameSet] = useState('')

    const [editPriceDialog, editPriceDialogSet] = useState(false)

    const [covenantplanId, covenantplanIdSet] = useState('')
    // const [covenantplanName, covenantplanNameSet] = useState('')
    const [procedureId, procedureIdSet] = useState('')
    // const [procedureName, procedureNameSet] = useState('')
    const [ambPrice, ambPriceSet] = useState(0)
    const [price, priceSet] = useState(0)

    const [tabValue, setTabValue] = useState(0);

    const columnsPlan = [
        {
            name: 'Nome do Plano',
            selector: row => row.name,
            sortable: true,
            width: '30vw',
        },
    ];

    const columnsPrice = [
        {
            name: 'Plano',
            selector: row => row.covenantplan_name,
            sortable: true,
            width: '30vw',
        },
        {
            name: 'Procedimento',
            selector: row => row.procedure_name,
            sortable: true,
            width: '30vw',
        },
        {
            name: 'Tabela AMB',
            selector: row => Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            })
                .format(row.ambPrice),
            sortable: true,
            width: '10vw',
            right: true,
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
        if (_id !== '0') {  // Testar !!!!!!!!!!!!!!!!!!
            getList(objectId + _id)
                .then(items => {
                    nameSet(items.record.name || '')
                    phoneSet(items.record.phone || '')
                    emailSet(items.record.email || '')
                    contractNumberSet(items.record.contractNumber || '')
                    registerDateSet((items.record.registerDate || '').substr(0, 10))
                    billingDaySet(items.record.billingDay || '')
                    paymentDaySet(items.record.paymentDay || '')
                })
            getList(`covenantplancovenant/${_id}`)
                .then(items => {
                    planListSet(items.record)
                })
            getList(`pricecovenant/${_id}`)
                .then(items => {
                    console.log('items.record', items.record)
                    priceListSet(items.record)
                })
            getList('procedure/')
                .then(items => {
                    procedureListSet(items.record)
                })
        }
        setRecUpdated(true)
    }, [_id, recUpdated])

    const saveRec = () => {
        if (!name) {
            setEmptyRecDialog(true)
            return null
        }
        let recObj = {
            name,
            phone,
            email,
            contractNumber,
            registerDate,
            billingDay,
            paymentDay,
        }
        if (_id !== '0') {
            recObj = JSON.stringify(recObj)
            putRec(objectId + _id, recObj)
                .then(result => {
                    planSave(_id)
                    priceSave(_id)
                })
        } else {
            recObj = JSON.stringify(recObj)
            postRec(objectRef, recObj)
                .then(async result => {
                    _idSet(result.record._id)
                    planSave(result.record._id)
                    priceSave(result.record._id)
                })
        }
        setEditMode(false)
        setInsertMode(false)
    }

    const planSave = (parentId) => {
        for (var subitem in planList) {
            let recObj = {
                covenant_id: parentId,
                name: planList[subitem].name,
            }
            if (planList[subitem].name === '* EXCLUIR *') {
                console.log('sub', planList[subitem]._id)
                deleteRec('covenantplanid/' + planList[subitem]._id)
            } else if (typeof (planList[subitem]._id) !== 'number') {
                recObj = JSON.stringify(recObj)
                putRec('covenantplanid/' + planList[subitem]._id, recObj)
            } else {
                recObj = JSON.stringify(recObj)
                postRec('covenantplan/', recObj)
            }
        }
        // setRecUpdated(false)
    }

    const priceSave = (parentId) => {
        for (var subitem in priceList) {
            console.log('price list', priceList[subitem]._id)
            let recObj = {
                covenant_id: parentId,
                covenantplan_id: priceList[subitem].covenantplan_id,
                procedure_id: priceList[subitem].procedure_id,
                ambPrice: priceList[subitem].ambPrice,
                price: priceList[subitem].price,
            }
            if (priceList[subitem].procedure_id === '* EXCLUIR *') {
                deleteRec('priceid/' + priceList[subitem]._id)
            } else if (typeof (priceList[subitem]._id) !== 'number') {
                recObj = JSON.stringify(recObj)
                console.log('price obj', recObj)
                putRec('priceid/' + priceList[subitem]._id, recObj)
                    .then(result => {
                        console.log('price result', result)
                    })

            } else {
                recObj = JSON.stringify(recObj)
                console.log('post price obj', recObj)
                postRec('price/', recObj)
                    .then(result => {
                        console.log('post price result', result)
                    })
            }
        }
        setRecUpdated(false)
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

    const addPlan = () => {
        let currentPlanTemp = 0
        if (planList) currentPlanTemp = planList.length

        planNameSet('')

        if (planList) {
            planListTempSet([...planList, { _id: currentPlanTemp, name: 'x' }])
        } else {
            planListTempSet([{ _id: currentPlanTemp, name: 'x' }])
        }

        currentPlanSet(currentPlanTemp)
        editPlanDialogSet(true)
        return null
    }

    const editPlanOpen = (rowid) => {
        planListTempSet(planList)
        const currentPlanTemp = planList.findIndex((item) => { return item._id === rowid })

        planNameSet(planListTemp[currentPlanTemp].name)

        currentPlanSet(currentPlanTemp)
        editPlanDialogSet(true)
    }

    const editPlanConfirm = () => {
        planListTemp[currentPlan].name = planName

        planListSet(planListTemp)
        editPlanDialogSet(false)
        setEditMode(true)
    }

    const editPlanCancel = () => {
        editPlanDialogSet(false)
    }

    const editPlanDelete = () => {
        planListTemp[currentPlan].name = '* EXCLUIR *'
        planListSet(planListTemp)

        editPlanDialogSet(false)
        setEditMode(true)
    }

    const addPrice = () => {
        let currentPriceTemp = 0
        if (priceList) currentPriceTemp = priceList.length

        covenantplanIdSet('')
        procedureIdSet('')
        ambPriceSet('')
        priceSet('')

        if (priceList) {
            priceListTempSet([...priceList, { _id: currentPriceTemp, procedureId: '', covenantplanId: '', ambPrice: 0, price: 0 }])
        } else {
            priceListTempSet([{ _id: currentPriceTemp, procedureId: '', covenantplanId: '', ambPrice: 0, price: 0 }])
        }

        currentPriceSet(currentPriceTemp)
        editPriceDialogSet(true)
        return null
    }

    const editPriceOpen = (rowid) => {
        priceListTempSet(priceList)
        const currentPriceTemp = priceList.findIndex((item) => { return item._id === rowid })

        procedureIdSet(priceListTemp[currentPriceTemp].procedure_id)
        covenantplanIdSet(priceListTemp[currentPriceTemp].covenantplan_id)
        ambPriceSet(priceListTemp[currentPriceTemp].ambPrice)
        priceSet(priceListTemp[currentPriceTemp].price)

        currentPriceSet(currentPriceTemp)
        editPriceDialogSet(true)
    }

    const editPriceConfirm = () => {
        const procedureIndex = procedureList.findIndex((item) => { return item._id === procedureId })
        const procedureNameList = procedureList[procedureIndex].name

        const planIndex = planList.findIndex((item) => { return item._id === covenantplanId })
        const covenantplanNameList = planList[planIndex].name

        priceListTemp[currentPrice].covenantplan_id = covenantplanId
        priceListTemp[currentPrice].covenantplan_name = covenantplanNameList
        priceListTemp[currentPrice].procedure_id = procedureId
        priceListTemp[currentPrice].procedure_name = procedureNameList

        priceListTemp[currentPrice].ambPrice = ambPrice
        priceListTemp[currentPrice].price = price

        priceListSet(priceListTemp)
        editPriceDialogSet(false)
        setEditMode(true)
    }

    const editPriceCancel = () => {
        editPriceDialogSet(false)
    }

    const editPriceDelete = () => {
        priceListTemp[currentPrice].procedure_id = '* EXCLUIR *'
        priceListSet(priceListTemp)

        editPriceDialogSet(false)
        setEditMode(true)
    }

    return (
        <div>
            <div className='tool-bar'>
                <div >
                    <Typography variant='h5' className='tool-title' noWrap={true}>Registro de Convênio</Typography>
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
                            href="/covenantList" id='backButton' disabled={editMode}>VOLTAR
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
                            label='Nome do Convênio'
                            fullWidth={false}
                            disabled={!insertMode}
                            InputLabelProps={{ shrink: true, disabled: false }}
                            variant='outlined'
                            size='small'
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={phone}
                            onChange={(event) => { phoneSet(event.target.value) }}
                            id='phone'
                            label='Telefone'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false }}
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
                            label='E-mail'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false }}
                            variant='outlined'
                            size='small'
                        // inputProps={{ type: 'number' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={contractNumber}
                            onChange={(event) => { contractNumberSet(event.target.value) }}
                            id='contractNumber'
                            label='Número do Contrato'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false }}
                            variant='outlined'
                            size='small'
                            inputProps={{ type: 'text' }}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            value={registerDate}
                            onChange={(event) => { registerDateSet(event.target.value) }}
                            id='registerDate'
                            label='Data do Contrato'
                            fullWidth={false}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false }}
                            variant='outlined'
                            size='small'
                            inputProps={{ type: 'date' }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            value={billingDay}
                            onChange={(event) => { billingDaySet(event.target.value) }}
                            id='billingDay'
                            label='Dia do Faturamento'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false }}
                            variant='outlined'
                            size='small'
                            inputProps={{ type: 'number', min: 1, max: 30, step: 1 }}
                        />
                    </Grid>
                    <Grid item xs={1}></Grid>
                    <Grid item xs={2}>
                        <TextField
                            value={paymentDay}
                            onChange={(event) => { paymentDaySet(event.target.value) }}
                            id='paymentDay'
                            label='Dia do Pagamento'
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{ shrink: true, disabled: false }}
                            variant='outlined'
                            size='small'
                            inputProps={{ type: 'number', min: 1, max: 30, step: 1 }}
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
                            <Tab label="Planos" {...posTab(0)} />
                            <Tab label="Valores" {...posTab(1)} />
                        </Tabs>
                    </AppBar>
                    <TabPanel value={tabValue} index={0} dir={theme.direction}>
                        <div className='tool-title-sub'>
                            <Button color='primary' variant='contained' size='small' endIcon={<AddIcon />}
                                onClick={_ => addPlan()} disabled={(false)} />
                        </div>
                        <div >
                            <DataTable
                                noHeader={true}
                                columns={columnsPlan}
                                customStyles={customStyles1}
                                data={planList}
                                Clicked
                                keyField={'_id'}
                                highlightOnHover={true}
                                fixedHeader={true}
                                paginationPerPage={6}
                                onRowClicked={(row, event) => { editPlanOpen(row._id) }}
                            />
                        </div>

                    </TabPanel>
                    <TabPanel value={tabValue} index={1} dir={theme.direction}>
                        <div className='tool-title-sub'>
                            <Button color='primary' variant='contained' size='small' endIcon={<AddIcon />}
                                onClick={_ => addPrice()} disabled={(false)} />
                        </div>
                        <div >
                            <DataTable
                                noHeader={true}
                                columns={columnsPrice}
                                customStyles={customStyles1}
                                data={priceList}
                                Clicked
                                keyField={'_id'}
                                highlightOnHover={true}
                                fixedHeader={true}
                                paginationPerPage={6}
                                onRowClicked={(row, event) => { editPriceOpen(row._id) }}
                            />
                        </div>

                    </TabPanel>
                </div>

            </Form>

            <Dialog open={editPlanDialog}>
                <DialogTitle id="alert-dialog-title">{"Inclusão/Alteração de Planos"}</DialogTitle>
                {/* <p/> */}
                <DialogContent dividers>
                    <div className='modal-form'>
                        <Grid container spacing={1} >
                            <Grid item xs={12}>
                                <TextField
                                    label='Nome do Plano'
                                    value={planName}
                                    onChange={(event) => { planNameSet(event.target.value) }}
                                    size='small'
                                    type="text"
                                    InputLabelProps={{ shrink: true, sx: { color: 'black' } }}
                                    sx={{ width: 350 }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={editPlanDelete} color="primary" variant='contained' size='small'>
                        EXCLUIR
                    </Button>
                    <Button onClick={editPlanConfirm} color="primary" variant='contained' size='small'>
                        SALVAR
                    </Button>
                    <Button onClick={editPlanCancel} color="primary" variant='contained' size='small'>
                        CANCELAR
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={editPriceDialog}>
                <DialogTitle id="alert-dialog-title">{"Inclusão/Alteração de Preços"}</DialogTitle>
                {/* <p/> */}
                <DialogContent dividers>
                    <div className='modal-form'>
                        <Grid container spacing={2} >
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
                                    InputLabelProps={{ shrink: true, sx: { color: 'black' } }}
                                    // sx={{ width: 150 }}
                                    select
                                >
                                    {planList.map((option) => {
                                        if (typeof option._id === 'number') return null
                                        return (
                                            <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                                        )
                                    })}
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
                                    InputLabelProps={{ shrink: true, sx: { color: 'black' } }}
                                    // sx={{ width: 150 }}
                                    select
                                >
                                    {procedureList.map((option) => (
                                        <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            {/* </Grid>
                        <Grid container spacing={2} > */}
                            <Grid item xs={6}>
                                <TextField
                                    label='Tabela AMB'
                                    value={ambPrice}
                                    onChange={(event) => { ambPriceSet(event.target.value) }}
                                    size='small'
                                    type="number"
                                    InputLabelProps={{ shrink: true, sx: { color: 'black' }, min: 0 }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                // sx={{ width: 350 }}
                                />
                            </Grid>
                            {/* </Grid>
                        <Grid container spacing={2} > */}
                            <Grid item xs={6}>
                                <TextField
                                    label='Valor'
                                    value={price}
                                    onChange={(event) => { priceSet(event.target.value) }}
                                    size='small'
                                    type="number"
                                    InputLabelProps={{ shrink: true, sx: { color: 'black' } }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                // sx={{ width: 350 }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={editPriceDelete} color="primary" variant='contained' size='small'>
                        EXCLUIR
                    </Button>
                    <Button onClick={editPriceConfirm} color="primary" variant='contained' size='small'>
                        SALVAR
                    </Button>
                    <Button onClick={editPriceCancel} color="primary" variant='contained' size='small'>
                        CANCELAR
                    </Button>
                </DialogActions>
            </Dialog>

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

export default Covenant