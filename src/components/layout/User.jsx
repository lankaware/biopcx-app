import React, { useState } from 'react'
import {
    Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Checkbox, Autocomplete, FormControlLabel,
    AppBar, Tabs, Tab
} from '@mui/material'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';

import { useStyles } from '../../services/stylemui'

const User = props => {

    const [name, nameSet] = useState('')
    const [login, loginSet] = useState('')
    const [passw, passwSet] = useState('')
    const classes = useStyles()

    const userConfirm = () => {
        return null
    }

    const userClose = () => {
        return null
    }

    return (
        <>
            <div >

                <div >
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <div >
                                <Typography variant='h5'>Cadastro de Usuário:</Typography>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={name}
                                onChange={(event) => { nameSet(event.target.value.toUpperCase()) }}
                                id='name'
                                label='Nome do Usuário'
                                fullWidth={false}
                                disabled={false}
                                InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                variant='outlined'
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={login}
                                onChange={(event) => { loginSet(event.target.value.toUpperCase()) }}
                                id='login'
                                label='Login'
                                fullWidth={false}
                                disabled={false}
                                InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                variant='outlined'
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                value={passw}
                                onChange={(event) => { props.onChange(true) }}// { passwSet(event.target.value) }}
                                id='passw'
                                label='Senha'
                                fullWidth={false}
                                disabled={false}
                                InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                variant='outlined'
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* <div className={classes.bottomButtons}> */}
                                <Button color='primary' variant='contained' size='small' endIcon={<SubscriptionsIcon />}
                                    onClick={_ => userConfirm()} disabled={(false)}>Confirmar</Button>
                                <Button color='secondary' variant='contained' size='small' endIcon={<CancelScheduleSendIcon />}
                                    onClick={_ => userClose()} disabled={false}>Cancelar</Button>
                            {/* </div> */}
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                    </Grid>
                </div>
            </div>
        </>
    )
}
export default User