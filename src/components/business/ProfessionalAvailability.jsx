import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component'
import { customStyles2, paginationBr } from '../../services/datatablestyle'
import { Grid, TextField, Button, Dialog, DialogActions, DialogContent,
    DialogTitle, MenuItem
} from '@mui/material'
import { useStyles } from '../../services/stylemui'
import { DaysOfWeek, dayOfWeekLabel } from '../commons/DayOfWeek'

const ProfessionalAvailability = props => {

    const [weekDay, weekDaySet] = useState(0)
    const [initialTime, initialTimeSet] = useState('')
    const [finalTime, finalTimeSet] = useState('')
    const [interval, intervalSet] = useState(0)
    const [currentItem, currentItemSet] = useState(0)

    const [editDialog, editDialogSet] = useState(false)
    const [itemList, itemListSet] = useState(props.itemList)
    
    const classes = useStyles()

    useEffect(() => {
        itemListSet(props.itemList)
    }, [props.itemList])

    const columns = [
        {
            name: 'Dia da Semana',
            selector: row => row.weekDay,
            sortable: true,
            width: '30vw',
            cell: row =>  dayOfWeekLabel(row.weekDay)
        },
        {
            name: 'Hora Inicial',
            selector: row => row.initialTime,
            sortable: true,
            width: '20vw',
            cell: row => row.initialTime.substr(0, 5)
        },
        {
            name: 'Hora Final',
            selector: row => row.finalTime,
            sortable: true,
            width: '10vw',
            right: false,
            cell: row => row.finalTime.substr(0, 5)
        },
        {
            name: 'Intervalo',
            selector: row => row.interval,
            sortable: true,
            width: '10vw',
            right: true,
        },
    ];

    const editOpen = (rowid) => {
        if (!props.editMode) return
        const currentItemTemp = itemList.findIndex((item) => { return item._id === rowid })

        weekDaySet(itemList[currentItemTemp].weekDay)
        initialTimeSet(itemList[currentItemTemp].initialTime)
        finalTimeSet(itemList[currentItemTemp].finalTime)
        intervalSet(itemList[currentItemTemp].interval)

        currentItemSet(currentItemTemp)
        editDialogSet(true)
    }


    const editNew = () => {

        itemListSet([...itemList, {
            '_id': toString(currentItem),
            'weekDay': 1,
            'initialTime': '00:00',
            'finalTime': '00:00',
            'interval': 0,
        }])

        weekDaySet(1)
        initialTimeSet('00:00')
        finalTimeSet('00:00')
        intervalSet(0)

        let currentItemTemp = currentItem + 1
        currentItemSet(currentItemTemp)

    }

    const editConfirm = () => {
        itemList[currentItem].weekDay = weekDay
        itemList[currentItem].initialTime = initialTime
        itemList[currentItem].finalTime = finalTime
        itemList[currentItem].interval = interval

        props.onChangeSublist(itemList)

        editDialogSet(false)
    }

    const editCancel = () => {
        editDialogSet(false)
    }

    return (
        <div>
            <div className='data-table-level1'>
                <DataTable
                    // title=""
                    noHeader={true}
                    columns={columns}
                    customStyles={customStyles2}
                    data={itemList}
                    // selectableRows 
                    Clicked
                    // onSelectedRowsChange={handleChange}
                    keyField={'_id'}
                    highlightOnHover={true}
                    pagination={true}
                    fixedHeader={true}
                    // noContextMenu={true}
                    paginationComponentOptions={paginationBr}
                    paginationPerPage={5}
                    noDataComponent={'Nenhum registro disponível.'}
                    onRowClicked={(row, event) => {editOpen(row._id)}}
                />
            </div>
            <Dialog
                open={editDialog}
                >
                <DialogTitle id="alert-dialog-title">{"Alteração de Disponibilidade"}</DialogTitle>
                {/* <p/> */}
                <DialogContent dividers>
                    <div className='modal-form'>
                        <Grid container spacing={1} >
                            <Grid item xs={4}>
                                <TextField
                                    label='Dia da Semana'
                                    value={weekDay}
                                    onChange={(event) => { weekDaySet(event.target.value) }}
                                    size='small'
                                    type='text'
                                    InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                    // sx={{ width: 150 }}
                                    select
                                    >
                                        {DaysOfWeek.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                        ))}
                                    </TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label='Hora Inicial'
                                    value={initialTime}
                                    onChange={(event) => { initialTimeSet(event.target.value) }}
                                    size='small'
                                    type="time"
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ step: 300 }}
                                    // sx={{ width: 150 }}
                                    />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    label='Hora Final'
                                    value={finalTime}
                                    onChange={(event) => { finalTimeSet(event.target.value) }}
                                    size='small'
                                    type="time"
                                    InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                    // sx={{ width: 150 }}
                                    />
                            </Grid>
                            <Grid item xs={2}>
                                <TextField
                                    label='Duração'
                                    value={interval}
                                    onChange={(event) => { intervalSet(event.target.value) }}
                                    size='small'
                                    type='number'
                                    InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                    // sx={{ width: 150 }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={editNew} color="primary" variant='contained' size='small'>
                        INCLUIR
                    </Button>
                    <Button onClick={editConfirm} color="primary" variant='contained' size='small'>
                        APAGAR
                    </Button>
                    <Button onClick={editConfirm} color="primary" variant='contained' size='small'>
                        SALVAR
                    </Button>
                    <Button onClick={editCancel} color="primary" variant='contained' size='small'>
                        CANCELAR
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default ProfessionalAvailability
