import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import {
    Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from "@mui/material";

// import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
// import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import { useStyles } from "../../services/stylemui";
import { getList, putRec, postRec, deleteRec } from "../../services/apiconnect";

const objectRef = "exam/";
const objectId = "examid/";


const Exam = (props) => {
    let id = props.id;

    const [_id, _idSet] = useState(id);
    const [name, nameSet] = useState("");
    const [description, descriptionSet] = useState("");

    const [recUpdated, setRecUpdated] = useState(true)



    let insertMode = props.insertMode;
    let setInsertMode = props.setInsertMode;
    let editMode = props.editMode;
    let setEditMode = props.setEditMode;

    const [deleteDialog, setDeleteDialog] = useState(false);
    const [deleteInfoDialog, setDeleteInfoDialog] = useState(false);
    const [emptyRecDialog, setEmptyRecDialog] = useState(false);


    const classes = useStyles();

    useEffect(() => {
        console.log(id)
        if (id !== "0") {
            getList(objectId + id).then((items) => {
                console.log("Test", items);
                console.log("Test 2", items.record);

                _idSet(items.record._id)
                nameSet(items.record.name || "");
                descriptionSet(items.record.description || "")
            });
        }
        setRecUpdated(true);
    }, [id, recUpdated]);

    const saveRec = () => {
        if (!name) {
            setEmptyRecDialog(true);
            return null;
        }

        let recObj = {
            name,
            description
        };
        if (_id !== "0") {
            recObj = JSON.stringify(recObj);
            putRec(objectId + _id, recObj)
        } else {
            recObj = JSON.stringify(recObj);
            postRec(objectRef, recObj)
                .then((result) => {
                    _idSet(result.record._id);
                });
        }

        setEditMode(false);
        setInsertMode(false);
    };

    const refreshRec = () => {
        if (insertMode) {
            document.getElementById("backButton").click();
        }
        nameSet("");

        setRecUpdated(false)
        setEditMode(false);
    };

    const delRec = () => {
        setDeleteDialog(true);
    };

    const delConfirm = () => {
        console.log("_id", _id);
        deleteRec(objectId + _id).then((result) => { });
        setDeleteDialog(false);
        setDeleteInfoDialog(true);
    };

    const delCancel = () => {
        setDeleteDialog(false);
    };

    const delInformClose = () => {
        document.getElementById("backButton").click();
    };

    const emptyRecClose = () => {
        setEmptyRecDialog(false);
    };

    return (
        <div>
            <div className="tool-bar medicineAdd">
                <div>
                    <Typography variant="h5" className="tool-title" noWrap={true}>
                        Registro de Items solicitáveis
                    </Typography>
                </div>
                <div className='tool-buttons medicineAdd'>
                </div>
            </div>
            <div className="data-form medicineAdd">
                <Grid container spacing={2} sx={{ width: 1 }}>
                    <Grid item xs={12}>
                        <TextField
                            value={name}
                            onChange={(event) => {
                                nameSet(event.target.value);
                            }}
                            id="name"
                            label="Nome do Item"
                            fullWidth={true}
                            disabled={!insertMode}
                            InputLabelProps={{
                                shrink: true,
                                disabled: false,
                                classes: { root: classes.labelRoot },
                            }}
                            variant="outlined"
                            size="small"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            value={description}
                            onChange={(event) => {
                                descriptionSet(event.target.value);
                            }}
                            id="description"
                            label="Descrição"
                            fullWidth={true}
                            disabled={!editMode}
                            InputLabelProps={{
                                shrink: true,
                                disabled: false,
                                classes: { root: classes.labelRoot },
                            }}
                            variant="outlined"
                            size="small"
                            multiline
                            rows="2"
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            startIcon={<SaveAltIcon />}
                            onClick={(_) => saveRec()}
                            disabled={!editMode}
                        >
                            SALVAR
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            startIcon={<CancelIcon />}
                            onClick={(_) => {
                                refreshRec()
                            }}
                            disabled={!editMode}
                        >
                            CANCELAR
                        </Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            startIcon={<DeleteForeverIcon />}
                            onClick={(_) => delRec()}
                            disabled={editMode}
                        >
                            APAGAR
                        </Button>
                    </Grid>
                    {/* <Grid item xs={4}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              startIcon={<KeyboardReturnIcon />}
              href="/medicineList"
              id="backButton"
              disabled={editMode}
            >
              VOLTAR
            </Button>
          </Grid> */}

                </Grid>
            </div>

            <Dialog open={deleteDialog}>
                <DialogTitle id="alert-dialog-title">
                    {"Apagar o registro selecionado?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Após confirmada essa operação não poderá ser desfeita.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={delCancel} color="primary" variant="contained" autoFocus>
                        Cancelar
                    </Button>
                    <Button onClick={delConfirm} color="secondary" variant="contained">
                        Confirmar
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={deleteInfoDialog}>
                <DialogTitle id="alert-dialog-title">
                    {"Registro removido do cadastro."}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Clique para voltar a lista.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={delInformClose} color="primary" variant="contained">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={emptyRecDialog}
            // onClose={emptyRecClose}
            >
                <DialogTitle id="alert-dialog-title">
                    {"Registro sem descrição ou já existente não pode ser gravado."}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Clique para continuar.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={emptyRecClose} color="primary" variant="contained">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default Exam;
