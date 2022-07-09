import React, { useState, useEffect } from 'react'
import {
  Button, Dialog, DialogActions, DialogTitle, Box, AppBar, Tabs, Tab, Toolbar
} from "@mui/material";
import { Form } from 'reactstrap';

import { getList, putRec } from '../../services/apiconnect'
import TextDialogContentNew from './TextDialogContentNew'
import TabPanel, { posTab } from '../commons/TabPanel'
import { theme } from '../../services/customtheme'

const TextDialogNew = props => {

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
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    if (patientId && patientId !== "0") {
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
    }
  }, [patientId]);

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

  const updateOriginText = () => {
    saveRec();
    props.textDialogSet(false)
  }

  const cancelUpdateText = () => {
    props.textDialogSet(false)
  }

  // const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <Dialog open={props.textDialog} maxWidth={'lg'} >
        <DialogTitle id="alert-dialog-title">
          {/* <Form className='data-form-level2'> */}
          {/* <div> */}
          <AppBar position="relative" color="default">
            {/* <Toolbar variant="dense"> */}
              <Tabs
                value={tabValue}
                onChange={(event, newValue) => { setTabValue(newValue) }}
                indicatorColor="primary"
                textColor="primary"
                variant="standard"
                // aria-label="full width tabs example"
              >
                <Tab label="Hist.Clínica" {...posTab(0)} />
                <Tab label="Antec.Pessoais" {...posTab(1)} />
                <Tab label="Antec.Família" {...posTab(2)} />
                <Tab label="Cateterismo" {...posTab(3)} />
                <Tab label="Cirurgias" {...posTab(4)} />
                <Tab label="Alertas" {...posTab(5)} />
                <Tab label="Livre 1" {...posTab(6)} />
                <Tab label="Livre 2" {...posTab(7)} />
              </Tabs>
            {/* </Toolbar> */}
          </AppBar>
          {/* <Offset /> */}
          <TabPanel value={tabValue} index={0} dir={theme.direction}>
            <TextDialogContentNew
              textContent={clinicHist}
              textContentSet={clinicHistSet}
              patientId={patientId}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={1} dir={theme.direction}>
            <TextDialogContentNew
              textContent={patientHist}
              textContentSet={patientHistSet}
              patientId={patientId}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={2} dir={theme.direction}>
            <TextDialogContentNew
              textContent={familyHist}
              textContentSet={familyHistSet}
              patientId={patientId}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={3} dir={theme.direction}>
            <TextDialogContentNew
              textContent={catheter}
              textContentSet={catheterSet}
              patientId={patientId}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={4} dir={theme.direction}>
            <TextDialogContentNew
              textContent={surgery}
              textContentSet={surgerySet}
              patientId={patientId}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={5} dir={theme.direction}>
            <TextDialogContentNew
              textContent={alert}
              textContentSet={alertSet}
              patientId={patientId}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={6} dir={theme.direction}>
            <TextDialogContentNew
              textContent={freeTextOne}
              textContentSet={freeTextOneSet}
              patientId={patientId}
            />
          </TabPanel>
          <TabPanel value={tabValue} index={7} dir={theme.direction}>
            <TextDialogContentNew
              textContent={freeTextTwo}
              textContentSet={freeTextTwoSet}
              patientId={patientId}
            />
          </TabPanel>

          {/* </div> */}
          {/* </Form> */}
        </DialogTitle>

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

export default TextDialogNew