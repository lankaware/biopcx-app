import React, { useEffect, useRef, useState } from 'react';
import {
    Grid, Box, DialogContentText, Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions, Checkbox,
    MenuItem, FormControlLabel, Typography
} from "@mui/material";
import ReqTextEditor from "../../layout/ReqTextEditor";
import { getList, putRec } from "../../../services/apiconnect";
import ReactToPrint from "react-to-print"
import { useStyles } from "../../../services/stylemui";
import ReqHist from './ReqHist';
import DataTable from 'react-data-table-component'
import ReqToPrint from './ReqToPrint';
import { parseTextMacro } from '../../../services/textutils';
import { customStyles1, paginationBr } from '../../../services/datatablestyle'
import { defaultDateBr, prettyDate } from '../../../services/dateutils';

var headerText = null;
var header = null;
var footerText = null;
var footer = null;

const ReqDialog = props => {
    const [reqText, reqTextSet] = useState('');
    const [examName, examNameSet] = useState('');
    const [examList, examListSet] = useState([]);
    const [examId, examIdSet] = useState('');
    const [reqList, reqListSet] = useState([]);
    const [printDialog, printDialogSet] = useState(false);
    const [headerAdd, headerAddSet] = useState(false);
    const [footerAdd, footerAddSet] = useState(false);
    const [clinicHist, clinicHistSet] = useState("")

    const [loadDialog, loadDialogSet] = useState(false)
    const [editorFocus, editorFocusSet] = useState(true)
    const [textApplied, textAppliedSet] = useState('')
    const [selectText, selectTextSet] = useState('')
    const [confirmDialog, confirmDialogSet] = useState(false)
    const [textList, textListSet] = useState('')
    const [recUpdated, setRecUpdated] = useState(false)

    let patientId = props.patientId;

    const textRef = useRef()

    const classes = useStyles();

    useEffect(async () => {
        getList("exam/")
            .then((items) => { examListSet(items.record) })
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
        if (props.reqDialog) {
            // intMedicineSet('Nome do paciente <BR/> RG <BR/> Endereço <BR/> <BR/>')
            await parseTextMacro('<h4><strong>@nome</strong></h4> @reg <BR/> @ender <BR/>.<BR/>', props.patientId)
                .then(textResult => {
                    reqTextSet(textResult)
                })
        }
    }, [props.reqDialog]);

    useEffect(() => {
        if (patientId && patientId !== "0") {
            getList('patientid/' + patientId)
                .then((items) => {
                    reqListSet(items.record[0].request || "");
                    clinicHistSet(items.record[0].clinicHist || "");
                })
        }
        setRecUpdated(true)
    }, [patientId, recUpdated]);

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

    const addExam = () => {
        const examLines = examName.split('\n')
        let newText = ''
        examLines.forEach(newLine => {
            console.log({newLine})
            newText = `${newText} </br> ${newLine}`
        })
        reqTextSet(`${reqText} ${newText}`)
        examIdSet('')
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

    const saveReq = () => {
        header = headerAdd === true ? headerText : "&nbsp;"
        footer = footerAdd === true ? footerText : "&nbsp;"
        printDialogSet(true)
        let req = [...reqList, {
            "date": new Date(),
            "reqContent": reqText
        }];

        let uptoDated = prettyDate(defaultDateBr())
        let textOnly = reqText.split('<BR/>.<BR/>')[1]
        let newHist = `${clinicHist} </br><strong>${uptoDated}:</strong> &nbsp; </br> Solicitação: </br> ${textOnly}`
        let recObj = {
            request: req,
            clinicHist: newHist
        }

        recObj = JSON.stringify(recObj)
        putRec("patientid/" + patientId, recObj)
    }

    const cancelreq = () => {
        reqTextSet("");
        setRecUpdated(false)
        props.callUpdate(false)
        props.reqDialogSet(false)
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
                reqTextSet(reqText + newText)
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

    const closePrintDialog = () => {
        reqTextSet("");
        printDialogSet(false)
        setRecUpdated(false)
        props.callUpdate(false)
        props.reqDialogSet(false)
    }

    const handleExamChange = (e) => {
        const currentItemTemp = examList.findIndex((item) => { return item._id === e })
        examNameSet(examList[currentItemTemp].description)
        examIdSet(e)
    }

    const confirmDialogClose = () => {
        confirmDialogSet(false)
    }

    return (
        <>
            <Dialog open={props.reqDialog} maxWidth={false}>
                <DialogTitle>
                    <Typography className="tool-title-level1" noWrap={true} color="primary">Nova Solicitação</Typography>
                </DialogTitle>
                <DialogContent style={{ display: "flex", gap: "1rem" }}>
                    <Box sx={{ width: 3 / 10 }}>
                        <ReqHist reqList={reqList} reqListSet={reqListSet} reqTextSet={reqTextSet} />
                    </Box>
                    <Box className="data-form" sx={{ width: 7 / 10 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    id='Id'
                                    label='Nome do Item Solicitado'
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
                            </Grid>
                            <Grid item xs={6}></Grid>
                            <Grid item xs={3}>
                                <Button variant="outlined" onClick={addExam}>Adicionar Item</Button>
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
                            display="flex"
                            justifyContent="center"
                            m={1}>
                            <ReqTextEditor
                                reqText={reqText}
                                reqTextSet={reqTextSet}
                            />
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" size="small" sx={{ margin: "0px 2px" }} variant="contained" onClick={saveReq}>Salvar</Button>
                    <Button color="secondary" size="small" sx={{ margin: "0px 2px" }} variant="contained" onClick={cancelreq}>Cancelar</Button>
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

            <Dialog open={printDialog}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja imprimir a Solicitação?
                    </DialogContentText>
                    <ReqToPrint 
                    ref={textRef} 
                    reqText={reqText} 
                    header={header} 
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
                        onAfterPrint={() => { closePrintDialog() }}
                        documentTitle={"req" + props.patientName + new Date()}
                    // pageStyle="@page { size: 2.5in 4in }"
                    />
                </DialogActions>
            </Dialog>

        </>
    );

}

export default ReqDialog;