import React, { useEffect, useRef, useState } from 'react';
import {
    Grid, Box, DialogContentText, Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions, Checkbox,
    MenuItem, FormControlLabel, Typography
} from "@mui/material";
import ReactToPrint from "react-to-print"

import PrescTextEditor from "../../layout/PrescTextEditor";
import { getList, putRec } from "../../../services/apiconnect";
import { useStyles } from "../../../services/stylemui";

import PrescHist from './PrescHist';
import PrescToPrint from './PrescToPrint';

var headerText = null;
var header = null;
var footerText = null;
var footer = null;


const PrescDialog = props => {
    const [medicineName, medicineNameSet] = useState('');
    const [medicineDose, medicineDoseSet] = useState('');
    const [medicineWayOfUse, medicineWayOfUseSet] = useState('');
    const [medicineList, medicineListSet] = useState([]);
    const [medicineId, medicineIdSet] = useState('');
    const [prescList, prescListSet] = useState([]);
    const [printDialog, printDialogSet] = useState(false);
    const [headerAdd, headerAddSet] = useState(false);
    const [footerAdd, footerAddSet] = useState(false);

    let patientId = props.patientId;

    const [intMedicine, intMedicineSet] = useState('');
    const [extMedicine, extMedicineSet] = useState('');
    const [prescText, prescTextSet] = useState('');



    const textRef = useRef()

    const classes = useStyles();

    useEffect(() => {
        getList("medicine/")
            .then((items) => { medicineListSet(items.record) })
        getList('texttemplate/')
            .then(items => {
                for (const subItem of items.record) {
                    if (subItem.name === "HEADER") {
                        headerText = subItem.text
                    }
                    if (subItem.name === "FOOTER") {
                        footerText = subItem.text
                    }
                }
            })

    }, []);

    useEffect(() => {
        if (patientId) {
            getList('patientid/' + patientId)
                .then((items) => {
                    prescListSet(items.record[0].prescription || []);
                })
        }
    }, [patientId]);

    useEffect(() => {
        prescTextSet(intMedicine + extMedicine)
    }, [extMedicine, intMedicine]);

    const addMed = () => {
        if (medicineWayOfUse === "Interno") {
            if (intMedicine.search("Interno:") !== -1) {
                intMedicineSet(intMedicine + medicineName + " " + medicineDose + " <br>")
            } else {
                intMedicineSet("Interno:" + " <br>" + intMedicine + medicineName + " " + medicineDose + " <br>")
            }
        }

        if (medicineWayOfUse === "Externo") {
            if (extMedicine.search("Externo:") !== -1) {
                extMedicineSet(extMedicine + medicineName + " " + medicineDose + " <br>")
            } else {
                extMedicineSet("Externo:" + " <br>" + extMedicine + medicineName + " " + medicineDose + " <br>")
            }
        }
        medicineNameSet("");
        medicineDoseSet("");
    }

    const headerFunc = () => {
        if (headerAdd === true) {
            headerAddSet(false)
        } else {
            headerAddSet(true)
        }
    }

    const footerFunc = () => {
        if (footerAdd === true) {
            footerAddSet(false)
        } else {
            footerAddSet(true)
        }
    }

    const savePresc = () => {
        header = headerAdd === true ? headerText : "&nbsp;"
        footer = footerAdd === true ? footerText : "&nbsp;"
        printDialogSet(true)
        let presc = [...prescList, {
            "date": new Date(),
            "prescContent": prescText
        }];
        let recObj = {
            prescription: presc
        }

        recObj = JSON.stringify(recObj)
        putRec("patientid/" + patientId, recObj)

        props.prescDialogSet(false)
    }

    const cancelPresc = () => {
        prescTextSet("");
        props.prescDialogSet(false)
    }

    const notPrint = () => {
        printDialogSet(false)
    }

    const handleMedicineChange = (e) => {
        const currentItemTemp = medicineList.findIndex((item) => { return item._id === e })
        medicineNameSet(medicineList[currentItemTemp].name)
        medicineWayOfUseSet(medicineList[currentItemTemp].wayOfuse)
        medicineIdSet(e)

    }

    return (
        <>
            <Dialog open={props.prescDialog} maxWidth={false}>
                <DialogTitle>
                    <Typography variant="h6" className="tool-title-level1" noWrap={true} color="primary">Nova Receita</Typography>
                </DialogTitle>
                <DialogContent style={{ display: "flex", gap: "1rem" }}>
                    <Box sx={{ width: 3 / 10 }}>
                        <PrescHist prescList={prescList} prescListSet={prescListSet} intMedicineSet={intMedicineSet}
                            extMedicineSet={extMedicineSet} />
                    </Box>
                    {/*  <div >   className="data-form" */}
                    <Box className="data-form" sx={{ width: 7 / 10 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField
                                    id='medicineId'
                                    label='Nome do medicamento'
                                    value={medicineId}
                                    onChange={(event) => { handleMedicineChange(event.target.value) }}
                                    size='small'
                                    fullWidth={true}
                                    type='text'
                                    InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                    select>
                                    {medicineList.map((option) => (
                                        <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                                    ))}
                                </TextField>
                                {/* <Autocomplete
                                    id="medicine"
                                    options={medicineList}
                                    getOptionLabel={(option) => option.name}
                                    size="small"
                                    onChange={(event, newValue) => { medicineIdSet(newValue._id) }}
                                    inputValue={medicineName}
                                    onInputChange={(event, newInputValue) => { if (event && event.type !== "blur") medicineNameSet(newInputValue) }}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Nome do medicamento"
                                            fullWidth={true} value={medicineName} onChange={(event) => medicineNameSet(event.target.value)}
                                        />
                                    )}
                                /> */}
                            </Grid>
                            <Grid item xs={2}>
                                <TextField label="Dosagem"
                                    fullWidth={true} value={medicineDose}
                                    InputLabelProps={{ shrink: true, disabled: false }}
                                    variant="outlined"
                                    size="small"
                                    onChange={(event) => medicineDoseSet(event.target.value)} />
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="outlined" onClick={addMed}>Adicionar</Button>
                            </Grid>
                            <Grid item xs={1}>
                            </Grid>

                            <Grid item xs={3}>
                                <Box display="flex"
                                    justifyContent="center">
                                    <Box mx={1}>
                                        <FormControlLabel checked={headerAdd} control={<Checkbox onClick={headerFunc} />} label="Cabeçalho" />
                                    </Box>
                                    <Box mx={1}>
                                        <FormControlLabel checked={footerAdd} control={<Checkbox onClick={footerFunc} />} label="Rodapé" />
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box
                            display="flex"
                            justifyContent="center"
                            m={1}>
                            <PrescTextEditor
                                intMedicine={intMedicine}
                                intMedicineSet={intMedicineSet}
                                extMedicine={extMedicine}
                                extMedicineSet={extMedicineSet}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" size="small" sx={{ margin: "0px 2px" }} variant="contained" onClick={savePresc}>Salvar</Button>
                    <Button color="secondary" size="small" sx={{ margin: "0px 2px" }} variant="contained" onClick={cancelPresc}>Cancelar</Button>
                </DialogActions>

            </Dialog>

            <Dialog open={printDialog}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja imprimir a receita?
                        <PrescToPrint ref={textRef} prescText={prescText} header={header} footer={footer} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Box m={1}>
                        <Button onClick={notPrint} color="primary" size='small' variant="contained" autoFocus>Cancelar</Button>
                    </Box>
                    <ReactToPrint
                        trigger={() =>
                            <Box m={1}>
                                <Button variant='contained' size='small' color='secondary' href="#">
                                    Imprimir
                                </Button>
                            </Box>
                        }
                        content={() => textRef.current}
                        onAfterPrint={() => { printDialogSet(false) }}
                        documentTitle={"Presc" + props.patientName + new Date()}
                        pageStyle="@page { size: 2.5in 4in }"
                    />
                </DialogActions>
            </Dialog>

        </>


    );

}

export default PrescDialog;