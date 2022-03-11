import React, { useEffect, useRef } from 'react';
import {
    Grid, Box, DialogContentText, Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions, Checkbox,
    MenuItem, FormControlLabel, Typography
} from "@mui/material";
import PrescTextEditor from "../../layout/PrescTextEditor";
import { useState } from 'react';
import { getList, putRec } from "../../../services/apiconnect";
import ReactToPrint from "react-to-print"
import { useStyles } from "../../../services/stylemui";
import reqHist from './ReqHist';
import reqToPrint from './ReqToPrint';

var headerText = null;
var header = null;
var footerText = null;
var footer = null;


const ReqDialog = props => {
    const [reqText, reqTextSet] = useState('');
    const [examName, examNameSet] = useState('');
    const [examList, examListSet] = useState([]);
    const [examId, examIdSet] = useState('');
    const [reqList,reqListSet] = useState([]);
    const [printDialog, printDialogSet] = useState(false);
    const [headerAdd, headerAddSet] = useState(false);
    const [footerAdd, footerAddSet] = useState(false);

    let patientId = props.patientId;

    const textRef = useRef()

    const classes = useStyles();

    useEffect(() => {
        // getList("medicine/")
        //     .then((items) => { medicineListSet(items.record) })
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
                    reqListSet(items.record[0].request);
                })
        }
    }, [patientId]);

    // useEffect(() => {
    //     reqTextSet(intMedicine + extMedicine)
    // }, [extMedicine, intMedicine]);

    const addExam = () => {
        reqTextSet(`${reqText} <br>${examName} <br>`)
        // if (medicineWayOfUse === "Interno") {
        //     if (intMedicine.search("Interno:") !== -1) {
        //         intMedicineSet(intMedicine + medicineName + " " + medicineDose + " <br>")
        //     } else {
        //         intMedicineSet("Interno:" + " <br>" + intMedicine + medicineName + " " + medicineDose + " <br>")
        //     }
        // }

        // if (medicineWayOfUse === "Externo") {
        //     if (extMedicine.search("Externo:") !== -1) {
        //         extMedicineSet(extMedicine + medicineName + " " + medicineDose + " <br>")
        //     } else {
        //         extMedicineSet("Externo:" + " <br>" + extMedicine + medicineName + " " + medicineDose + " <br>")
        //     }
        // }
        // medicineNameSet("");
        // medicineDoseSet("");
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

    const savereq = () => {
        header = headerAdd === true ? headerText : "&nbsp;"
        footer = footerAdd === true ? footerText : "&nbsp;"
        printDialogSet(true)
        let req = [...reqList, {
            "date": new Date(),
            "reqContent": reqText
        }];
        let recObj = {
            req: req
        }

        recObj = JSON.stringify(recObj)
        putRec("patientid/" + patientId, recObj)

        props.reqDialogSet(false)
    }

    const cancelreq = () => {
        reqTextSet("");
        props.reqDialogSet(false)
    }

    const notPrint = () => {
        printDialogSet(false)
    }

    const handleExamChange = (e) => {
        const currentItemTemp = examList.findIndex((item) => { return item._id === e })
        examNameSet(examList[currentItemTemp].name)
        examIdSet(e)

    }

    return (
        <>
            <Dialog open={props.reqDialog} maxWidth={false}>
                <DialogTitle>
                    <Typography variant="h6" className="tool-title-level1" noWrap={true} color="primary">Nova Solicitação</Typography>
                </DialogTitle>
                <DialogContent style={{ display: "flex", gap: "1rem" }}>
                    <Box sx={{ width: 3 / 10 }}>
                        <reqHist reqList={reqList} reqListSet={reqListSet} reqTextSet={reqTextSet} />
                    </Box>
                    {/*  <div >   className="data-form" */}
                    <Box className="data-form" sx={{ width: 7 / 10 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <TextField
                                    id='Id'
                                    label='Nome do Exame'
                                    value={examId}
                                    onChange={(event) => { handleExamChange(event.target.value) }}
                                    size='small'
                                    fullWidth={true}
                                    type='text'
                                    InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                    select>
                                    {examList.map((option) => (
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
                            {/* <Grid item xs={2}>
                                <TextField label="Dosagem"
                                    fullWidth={true} value={medicineDose}
                                    InputLabelProps={{ shrink: true, disabled: false }}
                                    variant="outlined"
                                    size="small"
                                    onChange={(event) => medicineDoseSet(event.target.value)} />
                            </Grid> */}
                            <Grid item xs={2}>
                                <Button variant="outlined" onClick={addExam}>Adicionar</Button>
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
                            <reqTextEditor
                                reqText={reqText}
                                reqTextSet={reqTextSet}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" size="small" sx={{ margin: "0px 2px" }} variant="contained" onClick={savereq}>Salvar</Button>
                    <Button color="secondary" size="small" sx={{ margin: "0px 2px" }} variant="contained" onClick={cancelreq}>Cancelar</Button>
                </DialogActions>

            </Dialog>

            <Dialog open={printDialog}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja imprimir a Solicitação?
                        <reqToPrint ref={textRef} reqText={reqText} header={header} footer={footer} />
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
                        documentTitle={"req" + props.patientName + new Date()}
                        pageStyle="@page { size: 2.5in 4in }"
                    />
                </DialogActions>
            </Dialog>

        </>


    );

}

export default ReqDialog;