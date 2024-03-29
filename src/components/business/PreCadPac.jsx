import { Dialog, DialogContent, DialogTitle, Grid, TextField, MenuItem, Box, DialogActions, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import { postRec } from "../../services/apiconnect";

let editMode = true;
const objectRef = "patient/";

const TempPac = props => {
    const [_id, _idSet] = useState("");
    const [name, nameSet] = useState("");
    const [lastname, lastnameSet] = useState("")
    const [phone, phoneSet] = useState("")
    const [email, emailSet] = useState("")
    const [covenantId, covenantIdSet] = useState("");
    const [covenantplanId, covenantplanIdSet] = useState("");
    // const [covenantList] = useState([]);

    const saveRec = () => {
        if (!name) {
            //   setEmptyFieldDialog('Nome')
            //   setEmptyRecDialog(true);
            return null;
        }

        let recObj = {
            "preCad": true,
            name,
            lastname,
            phone,
            email,
            covenant_id: covenantId || null,
            covenantplan_id: covenantplanId || null,
        };
        recObj = JSON.stringify(recObj);
        postRec(objectRef, recObj)
            .then((result) => {
                props.patientIdSet(result.record._id);
                props.covenantIdSet(covenantId);
                props.covenantplanIdSet(covenantplanId);
                props.phoneSet(phone);
                props.emailSet(email);
                props.statusSet('1');
                props.tempPacDialogSet(false);
            });
        // setRecUpdated(false)
    };

    return (
        <Dialog open={props.tempPacDialog}>
            <DialogTitle>
                Pré-cadastro
            </DialogTitle>
            <DialogContent>
                <Box m={1}>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <TextField
                                value={name}
                                onChange={(event) => { nameSet(event.target.value) }}
                                id="name"
                                label="Nome *"
                                fullWidth={true}
                                disabled={!editMode}
                                InputLabelProps={{ shrink: true, disabled: false, }}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                value={lastname}
                                onChange={(event) => { lastnameSet(event.target.value) }}
                                id="lastname"
                                label="Sobrenome *"
                                fullWidth={true}
                                disabled={!editMode}
                                InputLabelProps={{ shrink: true, disabled: false, }}
                                variant="outlined"
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
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
                        <Grid item xs={6}>
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
                                {props.covenantList.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id='covenantplan'
                                label='Plano'
                                value={covenantplanId}
                                onChange={(event) => { covenantplanIdSet(event.target.value) }}
                                size='small'
                                fullWidth={true}
                                disabled={!covenantId}
                                type='text'
                                InputLabelProps={{ shrink: true, disabled: false }}
                                // sx={{ width: 150 }}
                                select
                            >
                                {props.covenantplanList
                                    .filter(item => { return item.covenant_id === covenantId })
                                    .map((option) => (
                                        <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                                    ))}
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box m={1}>
                    <Button color="primary" variant="contained" size="small" startIcon={<CancelIcon />}
                        // onClick={(_) => refreshRec()} disabled={!editMode}
                        onClick={(_) => props.tempPacDialogSet(false)}
                    >CANCELAR
                    </Button>
                </Box>
                <Box m={1}>
                    <Button color="primary" variant="contained" size="small" startIcon={<SaveAltIcon />}
                        onClick={(_) => { saveRec() }} disabled={!editMode}>SALVAR
                    </Button>
                </Box>
            </DialogActions>
        </Dialog>
    )
};

export default TempPac;