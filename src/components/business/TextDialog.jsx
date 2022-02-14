import React, { useState, useEffect } from 'react'
import {
  Button, Dialog, DialogActions, DialogTitle, Box
} from "@mui/material";

import { getList, putRec } from '../../services/apiconnect'
import TextDialogContent from './TextDialogContent'
import { minWidth } from '@mui/system';

var textTitle = null
var textColor = null
var textContent = null
var textContentSet = null

const TextDialog = props => {

  const [clinicHist, clinicHistSet] = useState("")
  const [familyHist, familyHistSet] = useState("")
  const [patientHist, patientHistSet] = useState("")
  const [catheter, catheterSet] = useState("")
  const [surgery, surgerySet] = useState("")
  const [freeTextOneTitle, freeTextOneTitleSet] = useState("")
  const [freeTextOne, freeTextOneSet] = useState("")
  const [freeTextTwoTitle, freeTextTwoTitleSet] = useState("")
  const [freeTextTwo, freeTextTwoSet] = useState("")
  const [alert, alertSet] = useState("")
  const [updated, updatedSet] = useState(false)

  const patientId = props.patientId

  useEffect(() => {
    if (patientId) {
      getList('patientid/' + patientId)
        .then((items) => {
          clinicHistSet(items.record[0].clinicHist || "");
          familyHistSet(items.record[0].familyHist || "");
          patientHistSet(items.record[0].patientHist || "");
          catheterSet(items.record[0].catheter || "");
          surgerySet(items.record[0].surgery || "");
          freeTextOneTitleSet(items.record[0].freeTextOneTitle || "");
          freeTextOneSet(items.record[0].freeTextOne || "");
          freeTextTwoTitleSet(items.record[0].freeTextTwo || "");
          freeTextTwoSet(items.record[0].freeTextTwo || "");
          alertSet(items.record[0].alert || "");
        })
      // textTitle = 'História Clínica'
      // textContent = clinicHist
      // textContentSet = clinicHistSet
      // textColor = 'primary'
      changeContentToClinicHist()
    }
  }, [patientId, props.textDialog]);

  useEffect(() => {
    console.log('textContent', textContent)
    if (textContent) {
      textContentSet(textContent);
    }
    updatedSet(true)
  }, [updated]);

  const saveRec = () => {
    let recObj = {
      clinicHist,
      familyHist,
      patientHist,
      catheter,
      surgery,
      freeTextOneTitle,
      freeTextOne,
      freeTextTwoTitle,
      freeTextTwo,
      alert,
    }
    console.log("recObj", recObj)
    recObj = JSON.stringify(recObj);
    putRec('patientid/' + patientId, recObj)
  }

  const changeContentToClinicHist = () => {
    updatedSet(false)
    textTitle = 'História Clínica'
    textContent = clinicHist
    textContentSet = clinicHistSet
    textColor = '#1976d2'
  }

  const changeContentToPatientHist = () => {
    updatedSet(false)
    textTitle = 'Antecedentes Pessoais'
    textContent = patientHist
    textContentSet = patientHistSet
    textColor = '#9c27b0'
  }

  const changeContentToFamilyHist = () => {
    updatedSet(false)
    textTitle = 'Antecedentes Familiares'
    textContent = familyHist
    textContentSet = familyHistSet
    textColor = '#2e7d32'
  }

  const changeContentToCatheter = () => {

    updatedSet(false)
    textTitle = 'Cateterismo'
    textContent = catheter
    textContentSet = catheterSet
    textColor = '#d32f2f'
  }

  const changeContentToSurgery = () => {
    updatedSet(false)
    textTitle = 'Cirurgias'
    textContent = surgery
    textContentSet = surgerySet
    textColor = '#36aea2'
  }

  const changeContentToFreeTextOne = () => {
    updatedSet(false)
    textTitle = 'Texto Livre 1'
    textContent = freeTextOne
    textContentSet = freeTextOneSet
    textColor = '#ED6C02'
  }

  const changeContentToFreeTextTwo = () => {
    updatedSet(false)
    textTitle = 'Texto Livre 2'
    textContent = freeTextTwo
    textContentSet = freeTextTwoSet
    textColor = '#000957'
  }

  const changeContentToAlert = () => {
    updatedSet(false)
    textTitle = 'Alertas'
    textContent = alert
    textContentSet = alertSet
    textColor = '#f00'
  }

  const updateOriginText = () => {
    saveRec();
    props.textDialogSet(false)
  }

  const cancelUpdateText = () => {
    props.textDialogSet(false)
  }

  return (
    <>
      <Dialog open={props.textDialog} maxWidth={'lg'}>
        <DialogTitle id="alert-dialog-title">
          <Box display="flex">
            <Box m={1}>
              <Button color="primary" variant="contained" size="medium" startIcon={''}
                onClick={(_) => changeContentToClinicHist()} disabled={false}>Hist.Clínica
              </Button>
            </Box>
            <Box m={1}>
              <Button color="secondary" variant="contained" size="medium" startIcon={''}
                onClick={(_) => changeContentToPatientHist()} disabled={false}>Ant.Pessoais
              </Button>
            </Box>
            <Box m={1}>
              <Button color="success" variant="contained" size="medium" startIcon={''}
                onClick={(_) => changeContentToFamilyHist()} disabled={false}>Ant.Familía
              </Button>
            </Box>
            <Box m={1}>
              <Button color="error" variant="contained" size="medium" startIcon={''}
                onClick={(_) => changeContentToCatheter()} disabled={false}>Cateterismo
              </Button>
            </Box>
            <Box m={1}>
              <Button sx={{ backgroundColor: '#36aea2' }} variant="contained" size="medium" startIcon={''}
                onClick={(_) => changeContentToSurgery()} disabled={false}>Cirurgias
              </Button>
            </Box>
            <Box m={1}>
              <Button color="warning" variant="contained" size="medium" startIcon={''}
                onClick={(_) => changeContentToFreeTextOne()} disabled={false}>Txt Livre 1
              </Button>
            </Box>
            <Box m={1}>
              <Button color="primary" variant="contained" size="medium" startIcon={''} sx={{ backgroundColor: '#000957' }}
                onClick={(_) => changeContentToFreeTextTwo()} disabled={false}>Txt Livre 2
              </Button>
            </Box>
            <Box m={1}>
              <Button color="info" variant="contained" size="medium" startIcon={''}
                onClick={(_) => changeContentToAlert()} disabled={false}>Alertas
              </Button>
            </Box>
          </Box>
        </DialogTitle>
        <TextDialogContent
          textTitle={textTitle}
          textColor={textColor}
          textContent={textContent}
          textContentSet={textContentSet}
          patientId={patientId}
          updated={updated}
          updatedSet={updatedSet}
        />
        <DialogActions>
          <Button onClick={updateOriginText} color="primary" variant="contained" size='small'>
            Salvar
          </Button>
          <Button onClick={cancelUpdateText} color="secondary" variant="contained" size='small'>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TextDialog