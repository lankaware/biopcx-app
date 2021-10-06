import React, { useState } from 'react'
import {
    Grid, TextField, Typography, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Checkbox, Autocomplete, FormControlLabel,
    AppBar, Tabs, Tab
} from '@mui/material'
import { useStyles } from '../../services/stylemui'

const Login = props => {

    const [login, loginSet] = useState('')
    const [passw, passwSet] = useState('')
    const classes = useStyles()

    if (props.logged) {
        return null
    }

    return (
        <>
            <div className='container-div'>

                <div >
                    <Grid container spacing={2} >
                        <Grid item xs={12}>
                            <div >
                                <Typography variant='h5'>Identificação do Usuário:</Typography>
                            </div>
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
                    </Grid>
                </div>
            </div>
        </>
    )
}
export default Login