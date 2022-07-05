import React, { useState, useRef, useEffect } from 'react'
import {
  Button, Typography, Grid, TextField, DialogContent,
  Dialog, DialogTitle, Box, MenuItem
} from '@mui/material'
import ReactToPrint from "react-to-print"
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend'
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn'

import RepBillCovenantLayout from './BillingReportLayout'

import { getList } from '../../services/apiconnect'

var billcovenantName

const setBillCovenantName = (convId, convList) => {
  const selectedConv = convList.findIndex((item) => { return item._id === convId })
  billcovenantName =  convList[selectedConv].name
}

const RepBillCovenant = props => {

  const [billcovenant, setBillCovenant] = useState('')
  const [dateInit, setDateInit] = useState('')
  const [dateEnd, setDateEnd] = useState('')
  const [reportPreview, setReportPreview] = useState(false)
  const [list, setList] = useState([])
  const [covenantList, covenantListSet] = useState([])

  const refBillCovenant = useRef()

  useEffect(() => {
    getList('covenant/')
      .then(items => {
        covenantListSet(items.record)
      })
  }, [])

  const printDialog = () => {
    getList('billing/' + billcovenant + '/' + dateInit + '/' + dateEnd)
      .then(items => {
        console.log(items.billingList)
        setList(items.billingList)
        setReportPreview(true)
      })
  }

  return (
    <div >
      <div className='tool-bar'>
        <div>
          <Typography variant='h6' className='tool-title' noWrap={true}>Relatório de Faturamento por Convênio</Typography>
        </div>
        <div className='tool-buttons'>
          <Box m={1}>
            <Button color='primary' size='small' variant='contained' startIcon={<KeyboardReturnIcon />}
              href="/" id='backButton'
            >VOLTAR
            </Button>
          </Box>
        </div>
      </div>
      <div className='tool-bar-filters'>
        <Grid item xs={3}>
          <TextField
            value={billcovenant}
            onChange={(event) => { setBillCovenant(event.target.value); setBillCovenantName(event.target.value, covenantList) }}
            id='billcovenant'
            label='Convênio'
            fullWidth={true}
            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
            size='small'
            sx={{ width: '20vw' }}
            type='text'
            select>
            {covenantList.map((option) => (
              <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={2}>
          <TextField
            value={dateInit}
            onChange={(event) => { setDateInit(event.target.value) }}
            id='dateInit'
            label='Data Inicial'
            fullWidth={false}
            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
            inputProps={{ type: 'date' }}
            size='small'
            sx={{ width: '12vw' }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            value={dateEnd}
            onChange={(event) => { setDateEnd(event.target.value) }}
            id='dateEnd'
            label='Data Final'
            fullWidth={false}
            InputLabelProps={{ shrink: true, disabled: false, sx: { color: 'black' } }}
            inputProps={{ type: 'date' }}
            size='small'
            sx={{ width: '12vw' }}
          />
        </Grid>
      </div>
      <Grid container>
        <Grid item xs={6}>
          <div className='bottom-buttons'>
            <Box m={1}>
              <Button color='primary'
                variant='contained' size='small' endIcon={<SubscriptionsIcon />}
                onClick={printDialog}
                disabled={(!billcovenant || !dateInit || !dateEnd)}>
                Confirmar
              </Button>
            </Box>
            <Box m={1}>
              <Button color='primary' variant='contained' size='small' endIcon={<CancelScheduleSendIcon />}
                onClick={_ => null} disabled={false}>
                Cancelar
              </Button>
            </Box>
          </div>
        </Grid>
      </Grid>

      <Dialog
        open={reportPreview}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle id="alert-dialog-title">{"Faturamento por Convênio: "}</DialogTitle>
        <DialogContent>
          <RepBillCovenantLayout
            ref={refBillCovenant}
            billcovenant={billcovenantName}
            dateInit={dateInit}
            dateEnd={dateEnd}
            list={list}
          />
          <div className='data-bottom-margin'></div>
          <div className='only-buttons'>
            <ReactToPrint className='button-link'
              trigger={() =>
                <Box m={1}>
                  <Button variant='contained' size='small' color='primary' href="#">
                    Imprimir
                  </Button>
                </Box>}
              content={() => refBillCovenant.current}
              onAfterPrint={() => { setReportPreview(false) }}
              documentTitle={'Rel_' + billcovenant + '_' + dateInit + '_' + dateEnd}
            />
            <Box m={1}>
              <Button color='primary' variant='contained' size='small'
                onClick={_ => { setReportPreview(false) }} disabled={false}>
                Fechar
              </Button>
            </Box>
          </div>
          {/* <div className='data-bottom-margin'></div> */}

        </DialogContent>
      </Dialog>

    </div>
  )
}

export default RepBillCovenant


