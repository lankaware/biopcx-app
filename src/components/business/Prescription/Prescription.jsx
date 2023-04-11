import React, { useEffect, useRef, useState } from 'react';
import {
    Grid, Box, DialogContentText, Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions, Checkbox,
    MenuItem, FormControlLabel, Typography
} from "@mui/material";
import DataTable from 'react-data-table-component'
import ReactToPrint from "react-to-print"

import PrescTextEditor from "../../layout/PrescTextEditor";
import { getList, putRec } from "../../../services/apiconnect";
import { useStyles } from "../../../services/stylemui";
import { customStyles1, paginationBr } from '../../../services/datatablestyle'
import { defaultDateBr, prettyDate } from '../../../services/dateutils';

import PrescHist from './PrescHist';
import PrescToPrint from './PrescToPrint';
import { parseTextMacro } from '../../../services/textutils';

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
    const [clinicHist, clinicHistSet] = useState("")

    let patientId = props.patientId;

    const [intMedicine, intMedicineSet] = useState('');
    const [extMedicine, extMedicineSet] = useState('');
    const [prescText, prescTextSet] = useState('');
    const [loadDialog, loadDialogSet] = useState(false)

    const [confirmDialog, confirmDialogSet] = useState(false)
    const [textApplied, textAppliedSet] = useState('')
    const [textList, textListSet] = useState('')
    const [selectText, selectTextSet] = useState('')
    const [editorFocus, editorFocusSet] = useState(true)
    const [recUpdated, setRecUpdated] = useState(false)

    const textRef = useRef()

    const classes = useStyles();

    useEffect(async () => {
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
        getList('texttemplate/')
            .then(items => {
                textListSet(items.record)
            })
        if (props.prescDialog) {
            // intMedicineSet('Nome do paciente <BR/> RG <BR/> Endereço <BR/> <BR/>')
            await parseTextMacro('<h4><strong>@nome</strong></h4> @reg <BR/> @ender <BR/> <BR/>', props.patientId)
                .then(textResult => {
                    intMedicineSet(textResult)
                })
        }
    }, [props.prescDialog]);

    useEffect(() => {
        if (patientId !== "0") {
            getList('patientid/' + patientId)
                .then((items) => {
                    prescListSet(items.record[0].prescription || []);
                    clinicHistSet(items.record[0].clinicHist || "");
                })
        }
        setRecUpdated(true)
    }, [patientId, recUpdated]);

    useEffect(() => {
        prescTextSet(intMedicine + extMedicine)
    }, [extMedicine, intMedicine]);

    const cleanText = () => {
        intMedicineSet("");
        extMedicineSet("");
    }

    const columns = [
        {
            name: 'Nome',
            selector: row => row.name,
            sortable: true,
            width: '20vw',
        },
        {
            name: 'Tipo',
            selector: row => row.type,
            sortable: true,
            width: '10vw',
        },
    ]

    const addMed = () => {
        if (medicineWayOfUse === "Interno") {
            if (intMedicine.search("Uso interno:") !== -1) {
                intMedicineSet(intMedicine + "&#10152;&nbsp;" + medicineName + " <br>" + medicineDose + " <br>")
            } else {
                intMedicineSet(intMedicine + "<p> <strong>Uso interno: </strong> <br>" + "&#10152;&nbsp;" + medicineName + " <br> " + medicineDose + " <br>")
            }
        }

        if (medicineWayOfUse === "Externo") {
            if (extMedicine.search("Uso externo / inalatório:") !== -1) {
                extMedicineSet(extMedicine + "&#10152;&nbsp;" + medicineName + " <br>" + medicineDose + " <br>")
            } else {
                extMedicineSet(" <p> <strong> Uso externo / inalatório: </strong> <br>" + extMedicine + "&#10152;&nbsp;" + medicineName + " <br> " + medicineDose + " <br>")
            }
        }
        medicineNameSet("");
        medicineDoseSet("");
        medicineIdSet('')
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

    const savePresc = async () => {
        header = headerAdd === true ? headerText : "&nbsp;"
        footer = footerAdd === true ? footerText : "&nbsp;"
        printDialogSet(true)
        let presc = [...prescList, {
            "date": new Date(),
            "prescContent": prescText
        }];
        let uptoDated = prettyDate(defaultDateBr())
        let intMedOnly = intMedicine.split('Uso interno:')[1]
        let extMedOnly = extMedicine.split('Uso externo / inalatório:')[1]
        let newHist = `${clinicHist} </br>===========================================================================`
        newHist = `${newHist} </br><strong>${uptoDated}:</strong> &nbsp; </br> Prescrição: ${intMedOnly ? intMedOnly : ''} ${extMedOnly ? extMedOnly : ''} </br>`
        let recObj = {
            prescription: presc,
            clinicHist: newHist
        }
        recObj = JSON.stringify(recObj)
        putRec("patientid/" + patientId, recObj)
        .then((_) => {
            props.callUpdate(false)
          });
    }

    const cancelPresc = () => {
        cleanText()
        setRecUpdated(false)
        props.callUpdate(false)
        props.prescDialogSet(false)
    }

    const closePrintDialog = () => {
        cleanText();
        printDialogSet(false)
        setRecUpdated(false)
        props.callUpdate(false)
        props.prescDialogSet(false)
    }

    const handleMedicineChange = (e) => {
        const currentItemTemp = medicineList.findIndex((item) => { return item._id === e })
        medicineNameSet(medicineList[currentItemTemp].name)
        medicineWayOfUseSet(medicineList[currentItemTemp].wayOfuse)
        medicineDoseSet(medicineList[currentItemTemp].dosage)
        medicineIdSet(e)
    }

    const loadDialogOpen = () => {
        editorFocusSet(false)
        loadDialogSet(true)
    }

    const loadText = (textName, textToLoad) => {
        selectTextSet(textName)
        textAppliedSet(textToLoad)
        confirmDialogSet(true)
    }

    const loadTextConfirm = async function () {
        await parseTextMacro(textApplied, props.patientId)
            .then(newText => {
                intMedicineSet(newText + intMedicine);
                confirmDialogSet(false);
                loadDialogSet(false);
                editorFocusSet(true);
                // document.getElementById('text-editor-dialog').focus();
            });
    }

    const loadDialogClose = () => {
        confirmDialogSet(false)
        editorFocusSet(true)
        loadDialogSet(false)
        // document.getElementById('text-editor-dialog').focus();
    }

    const confirmDialogClose = () => {
        confirmDialogSet(false)
    }

    return (
        <>
            <Dialog open={props.prescDialog} maxWidth={false}>
                <DialogTitle>
                    <Typography className="tool-title-level1" noWrap={true} color="primary">Nova Receita</Typography>
                </DialogTitle>
                <DialogContent style={{ display: "flex", gap: "1rem" }}>
                    <Box sx={{ width: 3 / 10 }}>
                        <PrescHist prescList={prescList} prescListSet={prescListSet} intMedicineSet={intMedicineSet}
                            extMedicineSet={extMedicineSet} />
                    </Box>
                    <Box className="data-form" sx={{ width: 7 / 10 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id='medicineId'
                                    label='Nome do medicamento'
                                    value={medicineId}
                                    onChange={(event) => { handleMedicineChange(event.target.value) }}
                                    size='small'
                                    fullWidth={true}
                                    type='text'
                                    InputLabelProps={{ shrink: true, disabled: false }}
                                    select>
                                    {medicineList.map((option) => (
                                        <MenuItem key={option._id} value={option._id} >{option.name}</MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid item xs={10}>
                                <TextField label="Dosagem"
                                    fullWidth={true} value={medicineDose}
                                    InputLabelProps={{ shrink: true, disabled: false }}
                                    variant="outlined"
                                    size="small"
                                    onChange={(event) => medicineDoseSet(event.target.value)} />
                            </Grid>
                            <Grid item xs={3}>
                                <Button variant="outlined" onClick={addMed}>Adicionar Item</Button>
                            </Grid>
                            <Grid item xs={4}>
                                <Box >
                                    <Button onClick={loadDialogOpen} variant="outlined" sx={{ backgroundColor: '#fff' }}>
                                        Texto Padrão
                                    </Button>
                                </Box>
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
                            id={'text-editor-dialog'} // testar
                            display="flex"
                            justifyContent="center"
                            m={1}>
                            <PrescTextEditor
                                intMedicine={intMedicine}
                                intMedicineSet={intMedicineSet}
                                extMedicine={extMedicine}
                                extMedicineSet={extMedicineSet}
                            // autofocus={editorFocus}
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
                    </DialogContentText>
                    <PrescToPrint
                        ref={textRef}
                        prescText={prescText}
                        // header={header}
                        headerAdd={headerAdd}
                        footer={footer}
                        printLocal={props.printLocal}
                        doctorName={props.doctorName}
                        doctorCrm={props.doctorCrm}
                    />
                </DialogContent>
                <DialogActions>
                    <Box m={1}>
                        <Button onClick={closePrintDialog} color="primary" size='small' variant="contained" autoFocus>Cancelar</Button>
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
                        onAfterPrint={() => {
                            closePrintDialog()
                        }}
                        documentTitle={"Presc" + props.patientName + new Date()}
                    />
                </DialogActions>
            </Dialog>

            <Dialog open={loadDialog} maxWidth={'md'}>
                <DialogTitle id="alert-dialog-title">
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            Textos Padrões
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <div >
                        <DataTable
                            // title=""
                            noHeader={true}
                            columns={columns}
                            customStyles={customStyles1}
                            data={textList}
                            //selectableRows 
                            Clicked
                            // onSelectedRowsChange={handleChange}
                            keyField={'_id'}
                            highlightOnHover={true}
                            pagination={false}
                            fixedHeader={true}
                            // noContextMenu={true}
                            paginationComponentOptions={paginationBr}
                            paginationPerPage={10}
                            noDataComponent={'Nenhum registro disponível.'}
                            onRowClicked={(row, event) => { loadText(row.name, row.text) }}
                        />
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={loadDialogClose} color="secondary" variant="contained" size='small'>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={confirmDialog}>
                <DialogTitle id="alert-dialog-title">
                    {"Confirma o carregamento do texto selecionado?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {selectText}
                    </DialogContentText>
                    <DialogActions>
                        <Button onClick={loadTextConfirm} color="primary" variant="contained" autoFocus size='small'>
                            Confirmar
                        </Button>
                        <Button onClick={confirmDialogClose} color="secondary" variant="contained" size='small'>
                            Cancelar
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>


        </>
    );
}

export default PrescDialog;