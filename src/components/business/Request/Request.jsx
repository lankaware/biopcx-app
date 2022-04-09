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
import ReqToPrint from './ReqToPrint';

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

    let patientId = props.patientId;

    const textRef = useRef()

    const classes = useStyles();

    useEffect(() => {
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

    }, []);

    useEffect(() => {
        if (patientId) {
            getList('patientid/' + patientId)
                .then((items) => {
                    reqListSet(items.record[0].request || "");
                })
        }
    }, [patientId]);

    const addExam = () => {
        reqTextSet(`${reqText} ${examName} <br>`)
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
        let recObj = {
            request: req
        }

        recObj = JSON.stringify(recObj)
        putRec("patientid/" + patientId, recObj)
    }

    const cancelreq = () => {
        reqTextSet("");
        props.reqDialogSet(false)
    }

    const closePrintDialog = () => {
        reqTextSet("");
        printDialogSet(false)
        props.reqDialogSet(false)
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
                    <Typography className="tool-title-level1" noWrap={true} color="primary">Nova Solicitação</Typography>
                </DialogTitle>
                <DialogContent style={{ display: "flex", gap: "1rem" }}>
                    <Box sx={{ width: 3 / 10 }}>
                        <ReqHist reqList={reqList} reqListSet={reqListSet} reqTextSet={reqTextSet} />
                    </Box>
                    <Box className="data-form" sx={{ width: 7 / 10 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
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
                            </Grid>
                            <Grid item xs={2}>
                                <Button variant="outlined" onClick={addExam}>Adicionar</Button>
                            </Grid>
                            <Grid item xs={1}></Grid>
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

            <Dialog open={printDialog}>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deseja imprimir a Solicitação?
                        <ReqToPrint ref={textRef} reqText={reqText} header={header} footer={footer} />
                    </DialogContentText>
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
                        pageStyle="@page { size: 2.5in 4in }"
                    />
                </DialogActions>
            </Dialog>

        </>
    );

}

export default ReqDialog;