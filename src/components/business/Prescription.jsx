import React, { useEffect } from 'react';
import {
    Grid, Box, FormControlLabel, DialogContentText, Button, Dialog, Autocomplete, DialogContent, DialogTitle, TextField, DialogActions,
    MenuItem,
} from "@mui/material";
import TextEditor from "../layout/TextEditor";
import { useState } from 'react';
import { getList, putRec } from "../../services/apiconnect";
import ReactToPrint from "react-to-print"
import { parseTextMacro } from '../../services/textutils';
import { useStyles } from "../../services/stylemui";

var header = null;
var footer = null;

const PrescDialog = props => {
    const [medicineName, medicineNameSet] = useState('');
    const [medicineDose, medicineDoseSet] = useState('');
    const [medicineList, medicineListSet] = useState([]);
    const [medicineId, medicineIdSet] = useState('');
    const [prescList, prescListSet] = useState([]);
    const [printDialog, printDialogSet] = useState(false);

    const patientId = props.patientId;

    const [prescText, prescTextSet] = useState('');
    const classes = useStyles();

    useEffect(() => {
        getList("medicine/").then((items) => { medicineListSet(items.record) })
        getList('texttemplate/').then(items => {
            for (const subItem of items.record) {
                if (subItem.name == "HEADER") {
                    header = subItem.text
                }
                if (subItem.name == "FOOTER") {
                    footer = subItem.text
                }
            }
        })
    }, []);

    const addMed = () => {
        prescTextSet(prescText + medicineName + " " + medicineDose + " <br>")
        medicineNameSet("");
        medicineDoseSet("");
    }

    const headerFunc = () => {
        prescTextSet(header + prescText)
    }

    const footerFunc = () => {
        prescTextSet(prescText + footer);
    }

    const savePresc = () => {
        printDialogSet(true)
        let presc = [...prescList, {
            "date": new Date(),
            "prescContent": prescText
        }];
        let recObj = {
            prescription: presc
        }

        recObj = JSON.stringify(recObj)
        console.log(recObj)
        putRec("patientid/" + patientId, recObj)
            .then(result => {
                console.log('put', result)
            })

        props.prescDialogSet(false)
    }

    const cancelPresc = () => {
        prescTextSet("");
        props.prescDialogSet(false)
    }

    const notPrint = () => {
        printDialogSet(false)
    }

    const printPresc = () => {
        printDialogSet(false)
    }

    const handleMedicineChange = (e) => {
        const currentItemTemp = medicineList.findIndex((item) => { return item._id === e })
        medicineNameSet(medicineList[currentItemTemp].name)
        medicineIdSet(e)
    }

    return (
        <>
            <Dialog open={props.prescDialog} maxWidth={false}>
                <DialogTitle>
                    Nova Receita
                </DialogTitle>
                <DialogContent >
                    <div className="data-form">
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
                            <Grid item xs={2}>
                            </Grid>

                            <Grid item xs={3}>
                                <Box display="flex"
                                    justifyContent="center">
                                    <Box mx={1}>
                                        <Button variant="contained" color="secondary" onClick={headerFunc}>Cabeçalho</Button>
                                    </Box>
                                    <Box mx={1}>
                                        <Button variant="contained" color="success" onClick={footerFunc}>Rodapé</Button>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                        <Box
                            display="flex"
                            justifyContent="center"
                            m={1}>
                            <TextEditor
                                content={prescText}
                                textSet={prescTextSet}
                            />
                        </Box>
                    </div>

                    <DialogActions>
                        <Button color="primary" size="small" sx={{ margin: "0px 2px" }} variant="contained" onClick={savePresc}>Salvar</Button>
                        <Button color="secondary" size="small" sx={{ margin: "0px 2px" }} variant="contained" onClick={cancelPresc}>Cancelar</Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            <Dialog open={printDialog}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja imprimir a receita?
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
                        content={() => prescText}
                        onAfterPrint={() => { printDialogSet(false) }}
                        documentTitle={"Presc" + props.patientName + new Date()}
                    />
                </DialogActions>
            </Dialog>

        </>


    );

}

export default PrescDialog;