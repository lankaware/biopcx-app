import React, { useState, useEffect, useRef, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent,
  DialogContentText, DialogTitle, MenuItem, Box
} from "@mui/material";
// import { Box } from "@mui/system";
import Webcam from "react-webcam";

import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import NotesIcon from '@mui/icons-material/Notes';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import AssignmentIcon from '@mui/icons-material/Assignment';

// import { useStyles } from "../../services/stylemui";
import { getList, putRec, postRec, deleteRec } from "../../services/apiconnect";
import { ageCalc } from "../../services/dateutils";
import { imcCalc } from "../../services/genfunctions";
import TextDialog from "./TextDialog.jsx";
import PrescDialog from "./Prescription/Prescription";
import ReqDialog from "./Request/Request"

import { PatientContext } from '../../context/PatientContext'
import { AuthContext } from '../../context/AuthContext'


// import { timeBr } from '../../services/dateutils';

const objectRef = "patient/";
const objectId = "patientid/";

const Patient = (props) => {

  const { id } = useParams()

  const { cityList, covenantList, stateList, relativeList, unitList } = useContext(PatientContext);

  const { role } = useContext(AuthContext);

  const webcamRef = useRef("")

  const [preCad, preCadSet] = useState(false)
  const [_id, _idSet] = useState(id)
  const [photo, photoSet] = useState("")
  const [name, nameSet] = useState("")
  const [lastname, lastnameSet] = useState("")
  const [internalRegister, internalRegisterSet] = useState("")
  const [unitId, unitIdSet] = useState("")
  const [phone, phoneSet] = useState("")
  const [email, emailSet] = useState("")
  const [zip, zipSet] = useState("")
  const [address, addressSet] = useState("")
  const [addressNumber, addressNumberSet] = useState("")
  const [addressComplement, addressComplementSet] = useState("")
  const [neighborhood, neighborhoodSet] = useState("")
  const [cityId, cityIdSet] = useState("")
  const [covenantId, covenantIdSet] = useState("")
  const [covPlan, covPlanSet] = useState("")
  const [covRegistration, covRegistrationSet] = useState("")
  const [covValid, covValidSet] = useState("")
  const [birthDate, birthDateSet] = useState("")
  const [birthCityId, birthCityIdSet] = useState("")
  const [cpf, cpfSet] = useState("")
  const [rg, rgSet] = useState("")
  const [rgDate, rgDateSet] = useState("")
  const [rgAgency, rgAgencySet] = useState("")
  const [rgStateId, rgStateIdSet] = useState("")
  const [mothersName, mothersNameSet] = useState("")
  const [fathersName, fathersNameSet] = useState("")
  const [gender, genderSet] = useState("")
  const [maritalStatus, maritalStatusSet] = useState("")
  const [blodyType, blodyTypeSet] = useState("")
  const [cns, cnsSet] = useState("")
  const [indicatedBy, indicatedBySet] = useState("")
  const [responsible, responsibleSet] = useState("")
  const [responsiblePhone, responsiblePhoneSet] = useState("")
  const [createdAt, createdAtSet] = useState("")
  const [relativeId, relativeIdSet] = useState("")
  const [relativeType, relativeTypeSet] = useState("")
  const [height, heightSet] = useState("")
  const [weight, weightSet] = useState("")
  const [imc, imcSet] = useState("")
  const [firstAppoint, firstAppointSet] = useState("")
  const [lastAppoint, lastAppointSet] = useState("")
  const [prescList, prescListSet] = useState("");
  const [reqList, reqListSet] = useState("");

  const [prescDialog, prescDialogSet] = useState(false);
  const [reqDialog, reqDialogSet] = useState(false);

  const [insertMode, setInsertMode] = useState(id === "0" || preCad);
  const [editMode, setEditMode] = useState(id === "0");

  const [photoDialog, photoSetDialog] = useState(false);
  const [textDialog, textDialogSet] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteInfoDialog, setDeleteInfoDialog] = useState(false);
  const [emptyRecDialog, setEmptyRecDialog] = useState(false);
  const [emptyFieldDialog, setEmptyFieldDialog] = useState('');
  const [recUpdated, setRecUpdated] = useState(true)

  // const classes = useStyles();

  const videoConstraints = {
    width: 160,
    height: 200,
    facingMode: "user",
  };

  console.log(role, "role")

  useEffect(() => {
    if (_id !== '0') {
      getList(objectId + _id)
        .then((items) => {
          _idSet(items.record[0]._id);
          preCadSet(items.record[0].preCad || false);
          photoSet(items.record[0].photo || "");
          nameSet(items.record[0].name || "");
          lastnameSet(items.record[0].lastname || "");
          internalRegisterSet(items.record[0].internalRegister || "");
          unitIdSet(items.record[0].unit_id || "");
          phoneSet(items.record[0].phone || "");
          emailSet(items.record[0].email || "");
          zipSet(items.record[0].zip || "");
          addressSet(items.record[0].address || "");
          addressNumberSet(items.record[0].addressNumber || "");
          addressComplementSet(items.record[0].addressComplement || "");
          neighborhoodSet(items.record[0].neighborhood || "");
          cityIdSet(items.record[0].city_id || "");
          covenantIdSet(items.record[0].covenant_id || "");
          covPlanSet(items.record[0].covPlan || "");
          covRegistrationSet(items.record[0].covRegistration || "");
          covValidSet((items.record[0].covValid || "").substr(0, 10));
          birthDateSet((items.record[0].birthDate || "").substr(0, 10));
          birthCityIdSet(items.record[0].birthCity_id || "");
          cpfSet(items.record[0].cpf || "");
          rgSet(items.record[0].rg || "");
          rgDateSet((items.record[0].rgDate || "").substr(0, 10));

          rgAgencySet(items.record[0].rgAgency || "");
          rgStateIdSet(items.record[0].rgState_id || "");
          mothersNameSet(items.record[0].mothersName || "");
          fathersNameSet(items.record[0].fathersName || "");
          genderSet(items.record[0].gender || "");
          maritalStatusSet(items.record[0].maritalStatus || "");
          blodyTypeSet(items.record[0].blodyType || "");
          cnsSet(items.record[0].cns || "");
          indicatedBySet(items.record[0].indicatedBy || "");
          responsibleSet(items.record[0].responsible || "");
          responsiblePhoneSet(items.record[0].responsiblePhone || "");
          createdAtSet((items.record[0].createdAt || "").substr(0, 10));
          relativeIdSet(items.record[0].relative_id || "");
          relativeTypeSet(items.record[0].relativeType || "");
          heightSet(items.record[0].height || "");
          weightSet(items.record[0].weight || "");
          imcSet(items.record[0].imc || "");
          firstAppointSet((items.record[0].firstAppoint || "").substr(0, 10));
          lastAppointSet((items.record[0].lastAppoint || "").substr(0, 10));

          // prescListSet(items.record[0].prescription || []);
          // reqListSet(items.record[0].request || []);

        });
    }
    setRecUpdated(true)
  }, [_id, recUpdated]);

  const saveRec = () => {
    if (!name) {
      setEmptyFieldDialog('Nome')
      setEmptyRecDialog(true);
      return null;
    }
    if (!lastname) {
      setEmptyFieldDialog('Sobrenome')
      setEmptyRecDialog(true);
      return null;
    }
    if (!cpf) {
      setEmptyFieldDialog('CPF')
      setEmptyRecDialog(true);
      return null;
    }
    if (!birthDate) {
      setEmptyFieldDialog('Data de Nascimento')
      setEmptyRecDialog(true);
      return null;
    }
    if (!gender) {
      setEmptyFieldDialog('Sexo')
      setEmptyRecDialog(true);
      return null;
    }
    if (!internalRegister) {
      setEmptyFieldDialog('Registro Clínica')
      setEmptyRecDialog(true);
      return null;
    }
    if (!unitId) {
      setEmptyFieldDialog('Unidade')
      setEmptyRecDialog(true);
      return null;
    }

    let recObj = {
      preCad: false,
      photo,
      name,
      lastname,
      internalRegister,
      unit_id: unitId || null,
      phone,
      email,
      zip,
      address,
      addressNumber,
      addressComplement,
      neighborhood,
      city_id: cityId || null,
      covenant_id: covenantId || null,
      covPlan,
      covRegistration,
      covValid,
      birthDate,
      birthCity_id: birthCityId || null,
      cpf,
      rg,
      rgDate,
      rgAgency,
      rgState_id: rgStateId || null,
      mothersName,
      fathersName,
      gender,
      maritalStatus,
      blodyType,
      cns,
      indicatedBy,
      responsible,
      responsiblePhone,
      // createdAt,
      relative_id: relativeId || null,
      relativeType,
      height,
      weight,
      imc,
      firstAppoint,
      lastAppoint,

    };
    if (_id !== '0') {
      recObj = JSON.stringify(recObj);
      putRec(objectId + _id, recObj)
    } else {
      recObj = JSON.stringify(recObj);
      postRec(objectRef, recObj)
        .then((result) => {
          _idSet(result.record._id);
        });
    }
    setRecUpdated(false)
    setEditMode(false);
    setInsertMode(false);
  };

  const refreshRec = () => {
    if (insertMode) {
      document.getElementById("backButton").click();
    }
    setRecUpdated(false)
    setEditMode(false);
  };

  const delRec = () => {
    setDeleteDialog(true);
  };

  const delConfirm = () => {
    deleteRec(objectId + _id)
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

  const capture = () => {
    const capturedPhoto = webcamRef.current.getScreenshot({
      width: 900,
      height: 900,
    });
    photoSet(capturedPhoto);
  };

  const openPresc = () => {
    // setRecUpdated(false)
    prescDialogSet(true)
  }

  const openReq = () => {
    reqDialogSet(true)
  }

  const openTextDialog = () => {
    textDialogSet(true)
  }


  return (
    <div>
      <div className="tool-bar">
        <div>
          <Typography variant="h5" className="tool-title" noWrap={true}>Registro de Paciente</Typography>
        </div>
        <div className='tool-buttons'>
          <Box m={1}>
            <Button color="primary" variant="contained" size="small" startIcon={<EditIcon />}
              onClick={(_) => setEditMode(true)} disabled={editMode}>EDITAR
            </Button>
          </Box>
          <Box m={1}>
            <Button color="primary" variant="contained" size="small" startIcon={<SaveAltIcon />}
              onClick={(_) => { saveRec() }} disabled={!editMode}>SALVAR
            </Button>
          </Box>
          <Box m={1}>
            <Button color="primary" variant="contained" size="small" startIcon={<CancelIcon />}
              onClick={(_) => refreshRec()} disabled={!editMode}>CANCELAR
            </Button>
          </Box>
          <Box m={1}>
            <Button color="primary" variant="contained" size="small" startIcon={<DeleteForeverIcon />}
              onClick={(_) => delRec()} disabled={editMode}>APAGAR
            </Button>
          </Box>
          <Box m={1}>
            <Button color="primary" variant="contained" size="small" startIcon={<KeyboardReturnIcon />}
              href="/patientList" id="backButton" disabled={editMode}>VOLTAR
            </Button>
          </Box>
        </div>
      </div>

      <div className="data-form2">
        <div className="tool-bar">
          <div>
            <Typography variant="h6" className="tool-title-level1" noWrap={true} color="primary">Dados Principais</Typography>
          </div>

          <Box m={1}>
            <div className='tool-buttons2'>
              <Box mr={1} mb={1}>
                <Button color="warning" variant="contained" size="small" startIcon={<HistoryEduIcon />} sx={{ backgroundColor: '#f5b942', color: '#160eed' }}
                  onClick={(_) => openTextDialog()} disabled={insertMode && role == 'ADMIN' ? false : true}>HISTÓRICO
                </Button>
              </Box>
              <Box mr={1}>
                <Button color="warning" variant="contained" size="small" startIcon={<NotesIcon />} sx={{ backgroundColor: '#f5b942', color: '#160eed' }}
                  onClick={(_) => openPresc()} disabled={insertMode && role == 'ADMIN' ? false : true} id="prescButton" >RECEITAS
                </Button>
              </Box>
              <Box mr={1}>
                <Button color="warning" variant="contained" size="small" startIcon={<AssignmentIcon />} sx={{ backgroundColor: '#f5b942', color: '#160eed' }}
                  onClick={(_) => openReq()} disabled={insertMode && role == 'ADMIN' ? false : true} id="prescButton" >SOLICITAÇÕES
                </Button>
              </Box>
            </div>
          </Box>
        </div>

        <Grid container spacing={1}>
          <Grid item xs={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} sx={{ justifyContent: 'center' }}>
                <Box className="photo-square">
                  {photo !== "" ? <img src={photo} alt={'Foto do Paciente'} /> : <img src="" alt={''} />}
                </Box>
              </Grid>
              <Grid item xs={8} >
                <Button sx={{ alignSelf: 'center' }} color="primary" variant="contained" size="small" startIcon={<CameraAltIcon />}
                  disabled={!editMode} onClick={(e) => { photoSetDialog(true) }} fullWidth={true}>Editar
                </Button>
              </Grid>
              <Grid item xs={8} >
                <Button sx={{ alignSelf: 'center' }} color="error" variant="contained" size="small" startIcon={<DeleteIcon />}
                  disabled={photo === "" || !editMode} onClick={(e) => { photoSet("") }} fullWidth={true}>Excluir
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={5}>
                <TextField
                  value={internalRegister}
                  onChange={(event) => { internalRegisterSet(event.target.value.toUpperCase()) }}
                  id="internalRegister"
                  label="Registro Clínica *"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={7}>
                <TextField
                  value={name}
                  onChange={(event) => { nameSet(event.target.value.toUpperCase()) }}
                  id="name"
                  label="Nome *"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  value={lastname}
                  onChange={(event) => { lastnameSet(event.target.value.toUpperCase()) }}
                  id="lastname"
                  label="Sobrenome *"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  value={gender}
                  onChange={(event) => { genderSet(event.target.value.toUpperCase()) }}
                  id="gender"
                  label="Sexo *"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={birthDate}
                  onChange={(event) => { birthDateSet(event.target.value) }}
                  id="birthDate"
                  label="Data de Nascimento *"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "date" }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  value={ageCalc(birthDate) || ''}
                  id="age"
                  label="Idade"
                  fullWidth={true}
                  disabled={true}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  sx={{ color: "black" }}
                />
              </Grid>

              <Grid item xs={4}>
                <TextField
                  value={cpf}
                  onChange={(event) => { cpfSet(event.target.value) }}
                  id="cpf"
                  label="CPF *"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  id='covenant'
                  label='Convênio'
                  value={covenantId}
                  onChange={(event) => { covenantIdSet(event.target.value) }}
                  size='small'
                  fullWidth={true}
                  disabled={!editMode}
                  type='text'
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  select>
                  {covenantList.map((option) => (
                    <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  value={covPlan}
                  onChange={(event) => { covPlanSet(event.target.value.toUpperCase()) }}
                  id="covPlan"
                  label="Plano"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={covRegistration}
                  onChange={(event) => { covRegistrationSet(event.target.value) }}
                  id="covRegistration"
                  label="Matrícula Convênio"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "number" }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={covValid}
                  onChange={(event) => { covValidSet(event.target.value) }}
                  id="covValid"
                  label="Validade do Plano"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "date" }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  id='unit'
                  label='Unidade *'
                  value={unitId}
                  onChange={(event) => { unitIdSet(event.target.value) }}
                  size='small'
                  fullWidth={true}
                  disabled={!editMode}
                  type='text'
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  // sx={{ width: 150 }}
                  select>
                  {unitList.map((option) => (
                    <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>

            <Grid container spacing={2}>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <TextField
                  value={height}
                  onChange={(event) => { heightSet(event.target.value) }}
                  id="height"
                  label="Altura"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "number" }}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <TextField
                  value={weight}
                  onChange={(event) => { weightSet(event.target.value) }}
                  onBlur={(e) => imcSet(imcCalc(weight, height))}
                  id="weight"
                  label="Peso"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "number" }}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <TextField
                  value={imc}
                  id="imc"
                  label="IMC"
                  fullWidth={true}
                  disabled={true}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "number" }}
                />
              </Grid>
              <Grid item xs={2}></Grid>
              <Grid item xs={10}>
                <TextField
                  value={createdAt}
                  onChange={(event) => { createdAtSet(event.target.value) }}
                  id="createdAt"
                  label="Data de Cadastro"
                  fullWidth={true}
                  disabled={true}
                  InputLabelProps={{ shrink: true, disabled: false, }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "date" }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
      <div className="data-form">
        <div>
          <Typography variant="h6" className="tool-title-level1" noWrap={true} color="primary">Dados de Contato</Typography>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              value={phone}
              onChange={(event) => { phoneSet(event.target.value) }}
              id="phone"
              label="Telefones"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={email}
              onChange={(event) => { emailSet(event.target.value) }}
              id="email"
              label="Email"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={address}
              onChange={(event) => { addressSet(event.target.value.toUpperCase()) }}
              id="address"
              label="Endereço"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={addressNumber}
              onChange={(event) => { addressNumberSet(event.target.value.toUpperCase()) }}
              id="addressNumber"
              label="Número"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              value={addressComplement}
              onChange={(event) => { addressComplementSet(event.target.value.toUpperCase()) }}
              id="addressComplement"
              label="Complemento"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={neighborhood}
              onChange={(event) => { neighborhoodSet(event.target.value.toUpperCase()) }}
              id="neighborhood"
              label="Bairro"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id='city'
              label='Cidade'
              value={cityId}
              onChange={(event) => { cityIdSet(event.target.value) }}
              size='small'
              fullWidth={true}
              disabled={!editMode}
              type='text'
              InputLabelProps={{ shrink: true, disabled: false, }}
              select>
              {cityList.map((option) => (
                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
              ))}
            </TextField>

          </Grid>
          <Grid item xs={2}>
            <TextField
              value={zip}
              onChange={(event) => { zipSet(event.target.value) }}
              id="zip"
              label="CEP"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              value={responsible}
              onChange={(event) => { responsibleSet(event.target.value.toUpperCase()) }}
              id="responsibleTemp"
              label="Responsável"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={responsiblePhone}
              onChange={(event) => { responsiblePhoneSet(event.target.value.toUpperCase()) }}
              id="responsiblePhone"
              label="Telefone do Responsável"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id='relative'
              label='Parente Cadastrado'
              value={relativeId}
              onChange={(event) => { relativeIdSet(event.target.value) }}
              size='small'
              fullWidth={true}
              disabled={!editMode}
              type='text'
              InputLabelProps={{ shrink: true, disabled: false, }}
              select>
              {relativeList.map((option) => (
                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
              ))}
            </TextField>

          </Grid>
          <Grid item xs={2}>
            <TextField
              value={relativeType}
              onChange={(event) => { relativeTypeSet(event.target.value.toUpperCase()) }}
              id="relativeType"
              label="Grau Parentesco"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>
        </Grid>
      </div>
      <div className="data-form">
        <div>
          <Typography variant="h6" className="tool-title-level1" noWrap={true} color="primary">Informações Complementares</Typography>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <TextField
              id='birthCity'
              label='Cidade de Nascimento'
              value={birthCityId}
              onChange={(event) => { birthCityIdSet(event.target.value) }}
              size='small'
              fullWidth={true}
              disabled={!editMode}
              type='text'
              InputLabelProps={{ shrink: true, disabled: false, }}
              select>
              {cityList.map((option) => (
                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={maritalStatus}
              onChange={(event) => { maritalStatusSet(event.target.value.toUpperCase()) }}
              id="maritalStatus"
              label="Estado Civil"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={rg}
              onChange={(event) => { rgSet(event.target.value) }}
              id="rg"
              label="RG"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={rgDate}
              onChange={(event) => { rgDateSet(event.target.value) }}
              id="rgDate"
              label="Data Emissão RG"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "date" }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={rgAgency}
              onChange={(event) => { rgAgencySet(event.target.value.toUpperCase()) }}
              id="rgAgency"
              label="Órgão Emissor"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              id='rgState'
              label='Estado'
              value={rgStateId}
              onChange={(event) => { rgStateIdSet(event.target.value) }}
              size='small'
              fullWidth={true}
              disabled={!editMode}
              type='text'
              InputLabelProps={{ shrink: true, disabled: false, }}
              select>
              {stateList.map((option) => (
                <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={mothersName}
              onChange={(event) => { mothersNameSet(event.target.value.toUpperCase()) }}
              id="mothersName"
              label="Nome da Mãe"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={fathersName}
              onChange={(event) => { fathersNameSet(event.target.value.toUpperCase()) }}
              id="fathersName"
              label="Nome do Pai"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={cns}
              onChange={(event) => { cnsSet(event.target.value) }}
              id="cns"
              label="CNS"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={blodyType}
              onChange={(event) => { blodyTypeSet(event.target.value.toUpperCase()) }}
              id="blodyType"
              label="Tipo Sanguineo"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={indicatedBy}
              onChange={(event) => { indicatedBySet(event.target.value.toUpperCase()) }}
              id="indicatedBy"
              label="Indicado Por"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>

          <Grid item xs={2}>
            <TextField
              value={firstAppoint}
              onChange={(event) => { firstAppointSet(event.target.value) }}
              id="firstAppoint"
              label="Data da primeira consulta"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "date" }}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              value={lastAppoint}
              onChange={(event) => { lastAppointSet(event.target.value) }}
              id="lastAppoint"
              label="Data da ultima consulta"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{ shrink: true, disabled: false, }}
              variant="outlined"
              size="small"
              inputProps={{ type: "date" }}
            />
          </Grid>

        </Grid>
      </div>

      <PrescDialog
        prescDialog={prescDialog}
        prescDialogSet={prescDialogSet}
        prescList={prescList}
        prescListSet={prescListSet}
        patientId={_id}
        callUpdate={setRecUpdated}
      />

      <ReqDialog
        reqDialog={reqDialog}
        reqDialogSet={reqDialogSet}
        reqList={reqList}
        reqListSet={reqListSet}
        patientId={_id}
        callUpdate={setRecUpdated}
      />

      <TextDialog
        textDialog={textDialog}
        textDialogSet={textDialogSet}
        patientId={_id}
        patientName={name}
        reqList={reqList}
        reqListSet={reqListSet}
        prescList={prescList}
        prescListSet={prescListSet}
        callUpdate={setRecUpdated}
      />

      <Dialog open={photoDialog}>
        <DialogTitle id="alert-dialog-title">{"Foto"}</DialogTitle>
        <DialogContent>
          <Box sx={{ margin: "0vw 6vw" }}>
            <Webcam
              className="webcam"
              audio={false}
              screenshotFormat="image/jpeg"
              forceScreenshotSourceSize="true"
              screenshotQuality={0.5}
              videoConstraints={videoConstraints}
              ref={webcamRef}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { photoSetDialog(false) }} color="primary" variant="contained"
            autoFocus>Voltar
          </Button>
          <Button onClick={() => { capture(); photoSetDialog(false); }}
            color="secondary" variant="contained">Tirar foto
          </Button>
        </DialogActions>
      </Dialog>

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
          <Button onClick={delCancel} color="primary" variant="contained" autoFocus>Cancelar</Button>
          <Button onClick={delConfirm} color="secondary" variant="contained">Confirmar</Button>
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
          <Button onClick={delInformClose} color="primary" variant="contained">Ok</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={emptyRecDialog}>
        <DialogTitle id="alert-dialog-title">
          {`O campo ${emptyFieldDialog} é obrigatório.`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Clique Ok para continuar.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={emptyRecClose} color="primary" variant="contained">Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Patient;
