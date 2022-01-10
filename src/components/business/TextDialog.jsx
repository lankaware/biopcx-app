import React, { useState, useEffect } from 'react'
import {
  Button, Dialog, DialogActions, DialogTitle, DialogContentText, Box
} from "@mui/material";

import { getList, putRec } from '../../services/apiconnect'
import TextDialogContent from './TextDialogContent'

var textTitle = null
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
  const [updated, updatedSet] = useState(false)



  const patientId = props.patientId

  useEffect(() => {
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


      })

      textTitle = 'História Clínica'
      textContent = clinicHist
      textContentSet = clinicHistSet
  }, [patientId, props.textDialog]);

  useEffect(() => {
    textContentSet(textContent);
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
    }
    console.log("test", recObj)
    recObj = JSON.stringify(recObj);
    putRec('patientid/' + patientId, recObj)
  }

  const changeContentToClinicHist = () => {
    updatedSet(false)
    textTitle = 'História Clínica'
    textContent = clinicHist
    textContentSet = clinicHistSet
  }

  const changeContentToPatientHist = () => {
    updatedSet(false)
    textTitle = 'Antecedentes Pessoais'
    textContent = patientHist
    textContentSet = patientHistSet
  }

  const changeContentToFamilyHist = () => {
    updatedSet(false)
    textTitle = 'Antecedentes Familiares'
    textContent = familyHist
    textContentSet = familyHistSet
  }

  const changeContentToCatheter = () => {

    updatedSet(false)
    textTitle = 'Cateterismo'
    textContent = catheter
    textContentSet = catheterSet
  }

  const changeContentToSurgery = () => {
    updatedSet(false)
    textTitle = 'Cirurgias'
    textContent = surgery
    textContentSet = surgerySet
  }

  const changeContentToFreeTextOne = () => {
    updatedSet(false)
    textTitle = 'Texto Livre 1'
    textContent = freeTextOne
    textContentSet = freeTextOneSet
  }

  const changeContentToFreeTextTwo = () => {
    updatedSet(false)
    textTitle = 'Text Livre 2'
    textContent = freeTextTwo
    textContentSet = freeTextTwoSet
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
      <Dialog open={props.textDialog} maxWidth={false}>
        <DialogTitle id="alert-dialog-title">
          <Box className="data-form" display="flex"
            justifyContent="space-between">
            <Button color="primary" variant="contained" size="large" startIcon={''} 
              onClick={(_) => changeContentToClinicHist()} disabled={false}>Hist.Clínica
            </Button>
            <Button color="secondary" variant="contained" size="large" startIcon={''} 
              onClick={(_) => changeContentToPatientHist()} disabled={false}>Ant.Pessoais
            </Button>
            <Button color="success" variant="contained" size="large" startIcon={''} 
              onClick={(_) => changeContentToFamilyHist()} disabled={false}>Ant.Familía
            </Button>
            <Button color="error" variant="contained" size="large" startIcon={''} 
              onClick={(_) => changeContentToCatheter()} disabled={false}>Cateterismo
            </Button>
            <Button color="info" variant="contained" size="large" startIcon={''} 
              onClick={(_) => changeContentToSurgery()} disabled={false}>Cirurgias
            </Button>
            <Button color="warning" variant="contained" size="large" startIcon={''} 
              onClick={(_) => changeContentToFreeTextOne()} disabled={false}>Txt Livre 1
            </Button>
            <Button color="primary" variant="contained" size="large" startIcon={''} sx={{ backgroundColor: '#000957' }}
              onClick={(_) => changeContentToFreeTextTwo()} disabled={false}>Txt Livre 2
            </Button>

          </Box>
        </DialogTitle>
        <TextDialogContent
          textTitle={textTitle}
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