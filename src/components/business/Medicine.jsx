import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Box
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";

import { useStyles } from "../../services/stylemui";
import { getList, putRec, postRec, deleteRec } from "../../services/apiconnect";

const objectRef = "medicine/";
const objectId = "medicineid/";


const Medicine = (props) => {
  let { id } = useParams();

  const [_id, _idSet] = useState(id);
  const [name, nameSet] = useState("");
  const [chemName, chemNameSet] = useState("");
  const [wayOfuse, wayOfuseSet] = useState("");
  const [dosage, dosageSet] = useState("");
  const [lab, labSet] = useState("");

  const [nameTemp, nameSetTemp] = useState("");
  const [chemNameTemp, chemNameSetTemp] = useState("");
  const [wayOfuseTemp, wayOfuseSetTemp] = useState("");
  const [dosageTemp, dosageSetTemp] = useState("");
  const [labTemp, labSetTemp] = useState("");

  const [insertMode, setInsertMode] = useState(id === "0");
  const [editMode, setEditMode] = useState(id === "0");

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteInfoDialog, setDeleteInfoDialog] = useState(false);
  const [emptyRecDialog, setEmptyRecDialog] = useState(false);


  const classes = useStyles();

  useEffect(() => {
    if (id !== "0") {
      getList(objectId + id).then((items) => {
        console.log("Test", items);
        console.log("Test 2", items.record);

        _idSet(items.record._id)
        nameSet(items.record.name || "");
        chemNameSet(items.record.chemName || "");
        wayOfuseSet(items.record.wayOfuse || "");
        dosageSet(items.record.dosage || "");
        labSet(items.record.lab || "");
        nameSetTemp(items.record.name || "");
        chemNameSetTemp(items.record.chemName || "");
        wayOfuseSetTemp(items.record.wayOfuse || "");
        dosageSetTemp(items.record.dosage || "");
        labSetTemp(items.record.lab || "");
      });
    }
  }, [id]);

  const saveRec = () => {
    if (!name) {
      setEmptyRecDialog(true);
      return null;
    }

    let recObj = {
      name,
      chemName,
      wayOfuse,
      dosage,
      lab,
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
    nameSetTemp(name);
    chemNameSetTemp(chemName);
    wayOfuseSetTemp(wayOfuse);
    dosageSetTemp(dosage);
    labSetTemp(lab);

    setEditMode(false);
    setInsertMode(false);
  };

  const refreshRec = () => {
    if (insertMode) {
      document.getElementById("backButton").click();
    }
    nameSet(nameTemp);
    chemNameSet(chemNameTemp);
    wayOfuseSet(wayOfuseTemp);
    dosageSet(dosageTemp);
    labSet(labTemp);

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
      <div className="tool-bar">
        <div>
          <Typography variant="h5" className="tool-title" noWrap={true}>
            Registro de Medicamento
          </Typography>
        </div>
        <div className='tool-buttons'>
          <Box m={1}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              startIcon={<EditIcon />}
              onClick={(_) => setEditMode(true)}
              disabled={editMode}
            >
              EDITAR
            </Button>
          </Box>
          <Box m={1}>
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
          </Box>
          <Box m={1}>
            <Button
              color="primary"
              variant="contained"
              size="small"
              startIcon={<CancelIcon />}
              onClick={(_) => refreshRec()}
              disabled={!editMode}
            >
              CANCELAR
            </Button>
          </Box>
          <Box m={1}>
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
          </Box>
          <Box m={1}>
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
          </Box>
        </div>
      </div>
      <div className="data-form">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              value={name}
              onChange={(event) => {
                nameSet(event.target.value.toUpperCase());
              }}
              id="name"
              label="Nome do medicamento"
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
          <Grid item xs={6}>
            <TextField
              value={chemName}
              onChange={(event) => {
                chemNameSet(event.target.value);
              }}
              id="chemName"
              label="Nome quimico"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{
                shrink: true,
                disabled: false,
                classes: { root: classes.labelRoot },
              }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={wayOfuse}
              onChange={(event) => {
                wayOfuseSet(event.target.value);
              }}
              id="wayOfuse"
              label="Via de uso"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{
                shrink: true,
                disabled: false,
                classes: { root: classes.labelRoot },
              }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={dosage}
              onChange={(event) => {
                dosageSet(event.target.value);
              }}
              id="dosage"
              label="Posologia"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{
                shrink: true,
                disabled: false,
                classes: { root: classes.labelRoot },
              }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={lab}
              onChange={(event) => {
                labSet(event.target.value);
              }}
              id="lab"
              label="Laboratório"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{
                shrink: true,
                disabled: false,
                classes: { root: classes.labelRoot },
              }}
              variant="outlined"
              size="small"
            />
          </Grid>

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

export default Medicine;
