import React, { useState, useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { useParams } from "react-router-dom";
import { Form } from "reactstrap";
import {
  Grid,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Autocomplete,
  AppBar,
  Tabs,
  Tab,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import CameraIcon from "@mui/icons-material/Camera";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { useStyles } from "../../services/stylemui";
import { getList, putRec, postRec, deleteRec } from "../../services/apiconnect";
import TabPanel, { posTab } from "../commons/TabPanel";
import { theme } from "../../services/customtheme";
import { Box } from "@mui/system";

// import { timeBr } from '../../services/dateutils';

const objectRef = "patient/";
const objectId = "patientid/";

const Patient = (props) => {
  let { id } = useParams();

  const webcamRef = useRef("");
  const [captPhoto, captPhotoSet] = useState("");

  const [_id, _idSet] = useState("");
  const [photo, photoSet] = useState("");
  const [name, nameSet] = useState("");
  const [phone, phoneSet] = useState("");
  const [email, emailSet] = useState("");
  const [zip, zipSet] = useState("");
  const [address, addressSet] = useState("");
  const [addressNumber, addressNumberSet] = useState("");
  const [addressComplement, addressComplementSet] = useState("");
  const [neighborhood, neighborhoodSet] = useState("");
  const [cityId, cityIdSet] = useState("");
  const [cityName, cityNameSet] = useState("");
  const [covenantId, covenantIdSet] = useState("");
  const [covenantName, covenantNameSet] = useState("");
  const [covPlan, covPlanSet] = useState("");
  const [covRegistration, covRegistrationSet] = useState("");
  const [covValid, covValidSet] = useState("");
  const [birthDate, birthDateSet] = useState("");
  const [birthCityId, birthCityIdSet] = useState("");
  const [birthCityName, birthCityNameSet] = useState("");
  const [cpf, cpfSet] = useState("");
  const [rg, rgSet] = useState("");
  const [rgDate, rgDateSet] = useState("");
  const [rgAgency, rgAgencySet] = useState("");
  const [rgStateId, rgStateIdSet] = useState("");
  const [rgStateName, rgStateNameSet] = useState("");
  const [mothersName, mothersNameSet] = useState("");
  const [fathersName, fathersNameSet] = useState("");
  const [gender, genderSet] = useState("");
  const [maritalStatus, maritalStatusSet] = useState("");
  const [blodyType, blodyTypeSet] = useState("");
  const [cns, cnsSet] = useState("");
  const [indicatedBy, indicatedBySet] = useState("");
  const [responsible, responsibleSet] = useState("");
  const [responsiblePhone, responsiblePhoneSet] = useState("");
  const [registerDate, registerDateSet] = useState("");
  const [relativeId, relativeIdSet] = useState("");
  const [relativeName, relativeNameSet] = useState("");
  const [relativeType, relativeTypeSet] = useState("");


  const [photoTemp, photoSetTemp] = useState(""); 
  const [nameTemp, nameSetTemp] = useState("");
  const [phoneTemp, phoneSetTemp] = useState("");
  const [emailTemp, emailSetTemp] = useState("");
  const [zipTemp, zipSetTemp] = useState("");
  const [addressTemp, addressSetTemp] = useState("");
  const [addressNumberTemp, addressNumberSetTemp] = useState("");
  const [addressComplementTemp, addressComplementSetTemp] = useState("");
  const [neighborhoodTemp, neighborhoodSetTemp] = useState("");
  const [cityIdTemp, cityIdSetTemp] = useState("");
  const [cityNameTemp, cityNameSetTemp] = useState("");
  const [covenantIdTemp, covenantIdSetTemp] = useState("");
  const [covenantNameTemp, covenantNameSetTemp] = useState("");
  const [covPlanTemp, covPlanSetTemp] = useState("");
  const [covRegistrationTemp, covRegistrationSetTemp] = useState("");
  const [covValidTemp, covValidSetTemp] = useState("");
  const [birthDateTemp, birthDateSetTemp] = useState("");
  const [birthCityIdTemp, birthCityIdSetTemp] = useState("");
  const [birthCityNameTemp, birthCityNameSetTemp] = useState("");
  const [cpfTemp, cpfSetTemp] = useState("");
  const [rgTemp, rgSetTemp] = useState("");
  const [rgDateTemp, rgDateSetTemp] = useState("");
  const [rgAgencyTemp, rgAgencySetTemp] = useState("");
  const [rgStateIdTemp, rgStateIdSetTemp] = useState("");
  const [rgStateNameTemp, rgStateNameSetTemp] = useState("");
  const [mothersNameTemp, mothersNameSetTemp] = useState("");
  const [fathersNameTemp, fathersNameSetTemp] = useState("");
  const [genderTemp, genderSetTemp] = useState("");
  const [maritalStatusTemp, maritalStatusSetTemp] = useState("");
  const [blodyTypeTemp, blodyTypeSetTemp] = useState("");
  const [cnsTemp, cnsSetTemp] = useState("");
  const [indicatedByTemp, indicatedBySetTemp] = useState("");
  const [responsibleTemp, responsibleSetTemp] = useState("");
  const [responsiblePhoneTemp, responsiblePhoneSetTemp] = useState("");
  const [registerDateTemp, registerDateSetTemp] = useState("");
  const [relativeIdTemp, relativeIdSetTemp] = useState("");
  const [relativeNameTemp, relativeNameSetTemp] = useState("");
  const [relativeTypeTemp, relativeTypeSetTemp] = useState("");

  const [cityList, cityListSet] = useState([]);
  const [covenantList, covenantListSet] = useState([]);
  const [stateList, stateListSet] = useState([]);
  const [relativeList, relativeListSet] = useState([]);
  // const [availabilityList, availabilityListSet] = useState([])

  const [insertMode, setInsertMode] = useState(id === "0");
  const [editMode, setEditMode] = useState(id === "0");

  const [photoDialog, photoSetDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [deleteInfoDialog, setDeleteInfoDialog] = useState(false);
  const [emptyRecDialog, setEmptyRecDialog] = useState(false);

  const [tabValue, setTabValue] = useState(0);

  const classes = useStyles();

  const videoConstraints = {
    width: 160,
    height: 200,
    facingMode: "user",
  };

  useEffect(() => {
    if (id !== "0") {
      getList(objectId + id).then((items) => {
        console.log("items", items);

        _idSet(items.record[0]._id);

        photoSet(items.record[0].photo || "");
        nameSet(items.record[0].name || "");
        phoneSet(items.record[0].phone || "");
        emailSet(items.record[0].email || "");
        zipSet(items.record[0].zip || "");
        addressSet(items.record[0].address || "");
        addressNumberSet(items.record[0].addressNumber || "");
        addressComplementSet(items.record[0].addressComplement || "");
        neighborhoodSet(items.record[0].neighborhood || "");
        cityIdSet(items.record[0].city_id || "");
        cityNameSet(items.record[0].city_name[0] || "");
        covenantIdSet(items.record[0].covenant_id || "");
        covenantNameSet(items.record[0].covenant_name[0] || "");
        covPlanSet(items.record[0].covPlan || "");
        covRegistrationSet(items.record[0].covRegistration || "");
        covValidSet((items.record[0].covValid || "").substr(0, 10));
        birthDateSet((items.record[0].birthDate || "").substr(0, 10));
        birthCityIdSet(items.record[0].birthCity_id || "");
        birthCityNameSet(items.record[0].birthCity_name[0] || "");
        cpfSet(items.record[0].cpf || "");
        rgSet(items.record[0].rg || "");
        rgDateSet((items.record[0].rgDate || "").substr(0, 10));
        rgAgencySet(items.record[0].rgAgency || "");
        rgStateIdSet(items.record[0].rgState_id || "");
        rgStateNameSet(items.record[0].rgState_name[0] || "");
        mothersNameSet(items.record[0].mothersName || "");
        fathersNameSet(items.record[0].fathersName || "");
        genderSet(items.record[0].gender || "");
        maritalStatusSet(items.record[0].maritalStatus || "");
        blodyTypeSet(items.record[0].blodyType || "");
        cnsSet(items.record[0].cns || "");
        indicatedBySet(items.record[0].indicatedBy || "");
        responsibleSet(items.record[0].responsible || "");
        responsiblePhoneSet(items.record[0].responsiblePhone || "");
        registerDateSet((items.record[0].registerDate || "").substr(0, 10));
        relativeIdSet(items.record[0].relative_id || "");
        relativeNameSet(items.record[0].relative_name[0] || "");
        relativeTypeSet(items.record[0].relativeType || "");

        photoSetTemp(items.record[0].name || "");
        nameSetTemp(items.record[0].name || "");
        phoneSetTemp(items.record[0].phone || "");
        emailSetTemp(items.record[0].email || "");
        zipSetTemp(items.record[0].zip || "");
        addressSetTemp(items.record[0].address || "");
        addressNumberSetTemp(items.record[0].addressNumber || "");
        addressComplementSetTemp(items.record[0].addressComplement || "");
        neighborhoodSetTemp(items.record[0].neighborhood || "");
        cityIdSetTemp(items.record[0].city_id || "");
        cityNameSetTemp(items.record[0].city_name[0] || "");
        covenantIdSetTemp(items.record[0].covenant_id || "");
        covenantNameSetTemp(items.record[0].covenant_name[0] || "");
        covPlanSetTemp(items.record[0].covPlan || "");
        covRegistrationSetTemp(items.record[0].covRegistration || "");
        covValidSetTemp((items.record[0].covValid || "").substr(0, 10));
        birthDateSetTemp((items.record[0].birthDate || "").substr(0, 10));
        birthCityIdSetTemp(items.record[0].birthCity_id || "");
        birthCityNameSetTemp(items.record[0].birthCity_name[0] || "");
        cpfSetTemp(items.record[0].cpf || "");
        rgSetTemp(items.record[0].rg || "");
        rgDateSetTemp((items.record[0].rgDate || "").substr(0, 10));
        rgAgencySetTemp(items.record[0].rgAgency || "");
        rgStateIdSetTemp(items.record[0].rgState_id || "");
        rgStateNameSetTemp(items.record[0].rgState_name[0] || "");
        mothersNameSetTemp(items.record[0].mothersName || "");
        fathersNameSetTemp(items.record[0].fathersName || "");
        genderSetTemp(items.record[0].gender || "");
        maritalStatusSetTemp(items.record[0].maritalStatus || "");
        blodyTypeSetTemp(items.record[0].blodyType || "");
        cnsSetTemp(items.record[0].cns || "");
        indicatedBySetTemp(items.record[0].indicatedBy || "");
        responsibleSetTemp(items.record[0].responsible || "");
        responsiblePhoneSetTemp(items.record[0].responsiblePhone || "");
        registerDateSetTemp((items.record[0].registerDate || "").substr(0, 10));
        relativeIdSetTemp(items.record[0].relative_id || "");
        relativeNameSetTemp(items.record[0].relative_name[0] || "");
        relativeTypeSetTemp(items.record[0].relativeType || "");
      });
    }
    getList("city/").then((items) => {
      cityListSet(items.record);
    });
    getList("covenant/").then((items) => {
      covenantListSet(items.record);
    });
    getList("state/").then((items) => {
      stateListSet(items.record);
    });
    getList("patient/").then((items) => {
      relativeListSet(items.record);
    });
  }, [id]);

  const saveRec = () => {
    if (!name) {
      setEmptyRecDialog(true);
      return null;
    }
    console.log("covenantId", covenantId);
    let recObj = {
      photo,
      name,
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
      registerDate,
      relative_id: relativeId || null,
      relativeType,
    };
    if (id !== "0") {
      recObj = JSON.stringify(recObj);
      putRec(objectId + _id, recObj).then((result) => {
        console.log("put", result);
      });
    } else {
      recObj = JSON.stringify(recObj);
      postRec(objectRef, recObj).then((result) => {
        console.log("result", result);
        _idSet(result.record._id);
      });
    }
    photoSetTemp(photo);
    nameSetTemp(name);
    phoneSetTemp(phone);
    emailSetTemp(email);
    zipSetTemp(zip);
    addressSetTemp(address);
    addressNumberSetTemp(addressNumber);
    addressComplementSetTemp(addressComplement);
    neighborhoodSetTemp(neighborhood);
    cityIdSetTemp(cityId);
    cityNameSetTemp(cityName);
    covenantIdSetTemp(covenantId);
    covenantNameSetTemp(covenantName);
    covPlanSetTemp(covPlan);
    covRegistrationSetTemp(covRegistration);
    covValidSetTemp(covValid);
    birthDateSetTemp(birthDate);
    birthCityIdSetTemp(birthCityId);
    birthCityNameSetTemp(birthCityName);
    cpfSetTemp(cpf);
    rgSetTemp(rg);
    rgDateSetTemp(rgDate);
    rgAgencySetTemp(rgAgency);
    rgStateIdSetTemp(rgStateId);
    rgStateNameSetTemp(rgStateName);
    mothersNameSetTemp(mothersName);
    fathersNameSetTemp(fathersName);
    genderSetTemp(gender);
    maritalStatusSetTemp(maritalStatus);
    blodyTypeSetTemp(blodyType);
    cnsSetTemp(cns);
    indicatedBySetTemp(indicatedBy);
    responsibleSetTemp(responsible);
    responsiblePhoneSetTemp(responsiblePhone);
    registerDateSetTemp(registerDate);
    relativeIdSetTemp(relativeId);
    relativeNameSetTemp(relativeName);
    relativeTypeSetTemp(relativeType);

    setEditMode(false);
    setInsertMode(false);
  };

  const refreshRec = () => {
    if (insertMode) {
      document.getElementById("backButton").click();
    }
    photoSet(photoTemp);
    nameSet(nameTemp);
    phoneSet(phoneTemp);
    emailSet(emailTemp);
    zipSet(zipTemp);
    addressSet(addressTemp);
    addressNumberSet(addressNumberTemp);
    addressComplementSet(addressComplementTemp);
    neighborhoodSet(neighborhoodTemp);
    cityIdSet(cityIdTemp);
    cityNameSet(cityNameTemp);
    covenantIdSet(covenantIdTemp);
    covenantNameSet(covenantNameTemp);
    covPlanSet(covPlanTemp);
    covRegistrationSet(covRegistrationTemp);
    covValidSet(covValidTemp);
    birthDateSet(birthDateTemp);
    birthCityIdSet(birthCityIdTemp);
    birthCityNameSet(birthCityNameTemp);
    cpfSet(cpfTemp);
    rgSet(rgTemp);
    rgDateSet(rgDateTemp);
    rgAgencySet(rgAgencyTemp);
    rgStateIdSet(rgStateIdTemp);
    rgStateNameSet(rgStateNameTemp);
    mothersNameSet(mothersNameTemp);
    fathersNameSet(fathersNameTemp);
    genderSet(genderTemp);
    maritalStatusSet(maritalStatusTemp);
    blodyTypeSet(blodyTypeTemp);
    cnsSet(cnsTemp);
    indicatedBySet(indicatedByTemp);
    responsibleSet(responsibleTemp);
    responsiblePhoneSet(responsiblePhoneTemp);
    registerDateSet(registerDateTemp);
    relativeIdSet(relativeIdTemp);
    relativeNameSet(relativeNameTemp);
    relativeTypeSet(relativeTypeTemp);

    setEditMode(false);
  };

  const delRec = () => {
    setDeleteDialog(true);
  };

  const delConfirm = () => {
    deleteRec(objectId + _id).then((result) => {
      console.log(result);
    });
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
    console.log(typeof(capturedPhoto));
    captPhotoSet(capturedPhoto);
  };

  return (
    <div>
      <div className="tool-bar">
        <div>
          <Typography variant="h5" className="tool-title" noWrap={true}>
            Registro de Paciente
          </Typography>
        </div>
        <div className={classes.toolButtons + " button-link"}>
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
          <Button
            color="primary"
            variant="contained"
            size="small"
            startIcon={<KeyboardReturnIcon />}
            href="/patients"
            id="backButton"
            disabled={editMode}
          >
            VOLTAR
          </Button>
        </div>
      </div>
      <div className="data-form">
        <Box className="photo-square">
          <img src={photo} />
        </Box>
        <Button
          color="primary"
          className="edit-photo"
          variant="contained"
          size="small"
          disabled={!editMode}
          startIcon={<CameraAltIcon />}
          onClick={(e) => {
            photoSetDialog(true);
            captPhotoSet(photo);
          }}
        >
          Editar foto
        </Button>

        <Dialog
          open={photoDialog}
        >
          <DialogTitle id="alert-dialog-title">{"Foto"}</DialogTitle>
          <DialogContent>
            <Box sx={{ margin: "0vw 6vw" }}>
              {captPhoto == "" ? (
                <Webcam
                  className="webcam"
                  audio={false}
                  screenshotFormat="image/jpeg"
                  forceScreenshotSourceSize="true"
                  videoConstraints={videoConstraints}
                  ref={webcamRef}
                />
              ) : (
                <img src={captPhoto} />
              )}
            </Box>
          </DialogContent>
          <DialogActions>
            {captPhoto != "" ? (
              <Button
                color="primary"
                variant="contained"
                size="small"
                startIcon={<CameraIcon />}
                onClick={(e) => {
                  e.preventDefault();
                  captPhotoSet("");
                }}
              >
                Tirar outra foto
              </Button>
            ) : (
              <Button
                color="primary"
                variant="contained"
                size="small"
                startIcon={<CameraIcon />}
                onClick={capture}
              >
                Capturar
              </Button>
            )}

            <Button
              onClick={() => {
                photoSetDialog(false);
              }}
              color="primary"
              variant="contained"
              autoFocus
            >
              Fechar
            </Button>
            <Button
              onClick={() => {
                photoSet(captPhoto);
                photoSetDialog(false);
              }}
              color="secondary"
              variant="contained"
            >
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              value={name}
              onChange={(event) => {
                nameSet(event.target.value.toUpperCase());
              }}
              id="name"
              label="Nome do Paciente"
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
          <Grid item xs={2}>
            <TextField
              value={gender}
              onChange={(event) => {
                genderSet(event.target.value.toUpperCase());
              }}
              id="gender"
              label="Sexo"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{
                shrink: true,
                disabled: false,
                classes: { root: classes.labelRoot },
              }}
              variant="outlined"
              size="small"
              inputProps={{ type: "text" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={birthDate}
              onChange={(event) => {
                birthDateSet(event.target.value);
              }}
              id="birthDate"
              label="Data de Nascimento"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{
                shrink: true,
                disabled: false,
                classes: { root: classes.labelRoot },
              }}
              variant="outlined"
              size="small"
              inputProps={{ type: "date" }}
            />
          </Grid>
          <Grid item xs={3}>
            <Autocomplete
              id="covenant"
              options={covenantList}
              getOptionLabel={(option) => option.name}
              // style={{ width: 230 }}
              size="small"
              disabled={!editMode}
              onChange={(event, newValue) => {
                covenantIdSet(newValue._id);
              }}
              inputValue={covenantName}
              onInputChange={(event, newInputValue) => {
                if (event && event.type !== "blur")
                  covenantNameSet(newInputValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Convênio"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  inputProps={{ ...params.inputProps }}
                />
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={covPlan}
              onChange={(event) => {
                covPlanSet(event.target.value.toUpperCase());
              }}
              id="covPlan"
              label="Plano"
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
          <Grid item xs={2}>
            <TextField
              value={covRegistration}
              onChange={(event) => {
                covRegistrationSet(event.target.value);
              }}
              id="covRegistration"
              label="Número Matrícula"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{
                shrink: true,
                disabled: false,
                classes: { root: classes.labelRoot },
              }}
              variant="outlined"
              size="small"
              inputProps={{ type: "number" }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              value={covValid}
              onChange={(event) => {
                covValidSet(event.target.value);
              }}
              id="covValid"
              label="Validade do Plano"
              fullWidth={true}
              disabled={!editMode}
              InputLabelProps={{
                shrink: true,
                disabled: false,
                classes: { root: classes.labelRoot },
              }}
              variant="outlined"
              size="small"
              inputProps={{ type: "date" }}
            />
          </Grid>
        </Grid>
      </div>
      <Form className="data-form-level1">
        <div>
          <AppBar position="static" color="default">
            <Tabs
              value={tabValue}
              onChange={(event, newValue) => {
                setTabValue(newValue);
              }}
              indicatorColor="primary"
              textColor="primary"
              // variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Contatos" {...posTab(0)} />
              <Tab label="Documentos" {...posTab(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={tabValue} index={0} dir={theme.direction}>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <TextField
                  value={phone}
                  onChange={(event) => {
                    phoneSet(event.target.value);
                  }}
                  id="phone"
                  label="Telefones"
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
                  value={email}
                  onChange={(event) => {
                    emailSet(event.target.value);
                  }}
                  id="email"
                  label="Email"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  value={indicatedBy}
                  onChange={(event) => {
                    indicatedBySet(event.target.value.toUpperCase());
                  }}
                  id="indicatedBy"
                  label="Indicado Por"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  value={zip}
                  onChange={(event) => {
                    zipSet(event.target.value);
                  }}
                  id="zip"
                  label="CEP"
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
                  value={address}
                  onChange={(event) => {
                    addressSet(event.target.value.toUpperCase());
                  }}
                  id="address"
                  label="Endereço"
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
              <Grid item xs={2}>
                <TextField
                  value={addressNumber}
                  onChange={(event) => {
                    addressNumberSet(event.target.value.toUpperCase());
                  }}
                  id="addressNumber"
                  label="Número"
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
                  value={addressComplement}
                  onChange={(event) => {
                    addressComplementSet(event.target.value.toUpperCase());
                  }}
                  id="addressComplement"
                  label="Complemento"
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
              <Grid item xs={3}>
                <TextField
                  value={neighborhood}
                  onChange={(event) => {
                    neighborhoodSet(event.target.value.toUpperCase());
                  }}
                  id="neighborhood"
                  label="Bairro"
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

              <Grid item xs={3}>
                <Autocomplete
                  id="city"
                  options={cityList}
                  getOptionLabel={(option) => option.name}
                  // style={{ width: 230 }}
                  size="small"
                  disabled={!editMode}
                  onChange={(event, newValue) => {
                    cityIdSet(newValue._id);
                  }}
                  inputValue={cityName}
                  onInputChange={(event, newInputValue) => {
                    if (event && event.type !== "blur")
                      cityNameSet(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Cidade"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                        disabled: false,
                        classes: { root: classes.labelRoot },
                      }}
                      inputProps={{ ...params.inputProps }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={responsibleTemp}
                  onChange={(event) => {
                    responsibleSetTemp(event.target.value.toUpperCase());
                  }}
                  id="responsibleTemp"
                  label="Responsável"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={responsiblePhone}
                  onChange={(event) => {
                    responsiblePhoneSet(event.target.value.toUpperCase());
                  }}
                  id="responsiblePhone"
                  label="Telefone do Responsável"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  id="relative"
                  options={relativeList}
                  getOptionLabel={(option) => option.name}
                  // style={{ width: 230 }}
                  size="small"
                  disabled={!editMode}
                  onChange={(event, newValue) => {
                    relativeIdSet(newValue._id);
                  }}
                  inputValue={relativeName}
                  onInputChange={(event, newInputValue) => {
                    if (event && event.type !== "blur")
                      relativeNameSet(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Parente Cadastrado"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                        disabled: false,
                        classes: { root: classes.labelRoot },
                      }}
                      inputProps={{ ...params.inputProps }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={relativeType}
                  onChange={(event) => {
                    relativeTypeSet(event.target.value.toUpperCase());
                  }}
                  id="relativeType"
                  label="Grau Parentesco"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={registerDate}
                  onChange={(event) => {
                    registerDateSet(event.target.value);
                  }}
                  id="registerDate"
                  label="Data de Cadastro"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "date" }}
                />
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={tabValue} index={1} dir={theme.direction}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Autocomplete
                  id="birthCity"
                  options={cityList}
                  getOptionLabel={(option) => option.name}
                  // style={{ width: 230 }}
                  size="small"
                  disabled={!editMode}
                  onChange={(event, newValue) => {
                    birthCityIdSet(newValue._id);
                  }}
                  inputValue={birthCityName}
                  onInputChange={(event, newInputValue) => {
                    if (event && event.type !== "blur")
                      birthCityNameSet(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Cidade de Nascimento"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                        disabled: false,
                        classes: { root: classes.labelRoot },
                      }}
                      inputProps={{ ...params.inputProps }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={maritalStatus}
                  onChange={(event) => {
                    maritalStatusSet(event.target.value.toUpperCase());
                  }}
                  id="maritalStatus"
                  label="Estado Civil"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>

              <Grid item xs={3}>
                <TextField
                  value={cpf}
                  onChange={(event) => {
                    cpfSet(event.target.value);
                  }}
                  id="cpf"
                  label="CPF"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={rg}
                  onChange={(event) => {
                    rgSet(event.target.value);
                  }}
                  id="rg"
                  label="RG"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={rgDate}
                  onChange={(event) => {
                    rgDateSet(event.target.value);
                  }}
                  id="rgDate"
                  label="Data Emissão RG"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "date" }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={rgAgency}
                  onChange={(event) => {
                    rgAgencySet(event.target.value.toUpperCase());
                  }}
                  id="rgAgency"
                  label="Órgão Emissor"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={3}>
                <Autocomplete
                  id="rgState"
                  options={stateList}
                  getOptionLabel={(option) => option.name}
                  // style={{ width: 230 }}
                  size="small"
                  disabled={!editMode}
                  onChange={(event, newValue) => {
                    rgStateIdSet(newValue._id);
                  }}
                  inputValue={rgStateName}
                  onInputChange={(event, newInputValue) => {
                    if (event && event.type !== "blur")
                      rgStateNameSet(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Estado do RG"
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                        disabled: false,
                        classes: { root: classes.labelRoot },
                      }}
                      inputProps={{ ...params.inputProps }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={mothersName}
                  onChange={(event) => {
                    mothersNameSet(event.target.value.toUpperCase());
                  }}
                  id="mothersName"
                  label="Nome da Mãe"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={fathersName}
                  onChange={(event) => {
                    fathersNameSet(event.target.value.toUpperCase());
                  }}
                  id="fathersName"
                  label="Nome do Pai"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={cns}
                  onChange={(event) => {
                    cnsSet(event.target.value);
                  }}
                  id="cns"
                  label="CNS"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  value={blodyType}
                  onChange={(event) => {
                    blodyTypeSet(event.target.value.toUpperCase());
                  }}
                  id="blodyType"
                  label="Tipo Sanguineo"
                  fullWidth={true}
                  disabled={!editMode}
                  InputLabelProps={{
                    shrink: true,
                    disabled: false,
                    classes: { root: classes.labelRoot },
                  }}
                  variant="outlined"
                  size="small"
                  inputProps={{ type: "text" }}
                />
              </Grid>
            </Grid>
          </TabPanel>
        </div>
      </Form>

      <Dialog
        open={deleteDialog}
        // onClose={delCancel}
      >
        <DialogTitle id="alert-dialog-title">
          {"Apagar o registro selecionado?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Após confirmada essa operação não poderá ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={delCancel}
            color="primary"
            variant="contained"
            autoFocus
          >
            Cancelar
          </Button>
          <Button onClick={delConfirm} color="secondary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteInfoDialog}
        // onClose={delInformClose}
      >
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

export default Patient;
