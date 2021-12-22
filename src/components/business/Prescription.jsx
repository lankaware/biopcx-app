import React, { useEffect } from 'react';
import {
    Grid, Checkbox, FormControlLabel, Button, Dialog, Autocomplete, DialogContent, DialogTitle, TextField, DialogActions
} from "@mui/material";
import TextEditor from "../layout/TextEditor";
import { useState } from 'react';
import { getList, putRec } from "../../services/apiconnect";
import ReactToPrint from "react-to-print"


const PrescDialog = props => {
    const [medicineName, medicineNameSet] = useState('');
    const [medicineDose, medicineDoseSet] = useState('');
    const [medicineList, medicineListSet] = useState('');
    const [medicineId, medicineIdSet] = useState('');
    const [prescList, prescListSet] = useState([]);
    const [presc, prescSet] = useState([]);
    const [header, headerSet] = useState(false);
    const [footer, footerSet] = useState(false);


    const _id = props._id;

    const [prescText, prescTextSet] = useState('');

    useEffect(() => {
        getList("medicine/").then((items) => { medicineListSet(items.record) })
    }, []);

    const addMed = () => {
        prescTextSet(prescText + medicineName + " " + medicineDose + " <br>")
        medicineNameSet("");
        medicineDoseSet("");
        // Isso mexer depois
    }

    const headerFunc = () => {
        return;
    }

    const footerFunc = () => {
        return;
    }

    const savePresc = () => {
        let presc = [...prescList, {
            "date": new Date(),
            "prescContent": prescText
        }];
        let recObj = {
            prescription: presc
        }

        recObj = JSON.stringify(recObj)
        console.log(recObj)
        putRec("patientid/" + _id, recObj)
            .then(result => {
                console.log('put', result)
            })
        props.prescDialogSet(false)
    }

    const cancelPresc = () => {
        prescTextSet("");
        props.prescDialogSet(false)
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
                            <Grid item xs={4}>
                                <Autocomplete
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
                                />
                            </Grid>
                            <Grid item xs={3}>
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
                                <FormControlLabel
                                    label="Cabeçalho"
                                    control={
                                        <Checkbox
                                            checked={header}
                                            onChange={ headerFunc }
                                        />
                                    }
                                />
                            </Grid>
                            <Grid item xs={1}>
                                <FormControlLabel
                                    label="Rodapé"
                                    control={
                                        <Checkbox
                                            checked={footer}
                                            onChange={ footerFunc }
                                        />
                                    }
                                />
                            </Grid>



                            <Grid item xs={12}>
                                <TextEditor
                                    content={prescText}
                                    textSet={prescTextSet}
                                />
                            </Grid>
                        </Grid>
                    </div>

                    <DialogActions>
                        <Button color="primary" size="small" sx={{ margin: "0px 2px" }} variant="contained" onClick={savePresc}>Salvar</Button>
                        <Button color="secondary" size="small" sx={{ margin: "0px 2px" }} variant="contained" onClick={cancelPresc}>Cancelar</Button>
                    </DialogActions>


                </DialogContent>
            </Dialog>

        </>
    );

}

export default PrescDialog;