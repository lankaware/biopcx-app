import React, { useState, useContext } from 'react'
import {
    Grid, TextField, Typography, Button
} from '@mui/material'
import CryptoJS from 'crypto-js'

import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

import { useStyles } from '../../services/stylemui'
import { postRec } from '../../services/apiconnect'
import { AuthContext } from '../../context/AuthContext'

const Authentication = props => {

    const { authenticated, userSign } = useContext(AuthContext);

    const [login, loginSet] = useState('')
    const [passw, passwSet] = useState('')
    const classes = useStyles()

    if (authenticated) return null

    const loginConfirm = async () => {
        const passwcr = CryptoJS.AES.encrypt(passw, process.env.REACT_APP_SECRET).toString();
        let recObj = {
            passw: passwcr
        }
        recObj = JSON.stringify(recObj)
        console.log('recObj', recObj)

        postRec('userlogin/' + login, recObj)
            .then(result => {
                if (!result.token) {
                    alert('Usuário ou login inválidos!')
                    return null
                }
                userSign(result.token, result.name, result.role)
            })
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
                                onChange={(event) => { loginSet(event.target.value) }}
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
                                onChange={(event) => { passwSet(event.target.value) }}
                                id='passw'
                                label='Senha'
                                fullWidth={false}
                                disabled={false}
                                InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                variant='outlined'
                                type='password'
                                size='small'
                            />
                        </Grid>
                        <Grid item xs={6}>
                            {/* <div className={classes.bottomButtons}> */}
                            <Button color='primary' variant='contained' size='small' endIcon={<SubscriptionsIcon />}
                                onClick={_ => loginConfirm()} disabled={(false)}>Entrar</Button>
                            {/* <Button color='secondary' variant='contained' size='small' endIcon={<CancelScheduleSendIcon />}
                                onClick={_ => loginClose()} disabled={false}>Cancelar</Button> */}
                            {/* </div> */}
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}
export default Authentication