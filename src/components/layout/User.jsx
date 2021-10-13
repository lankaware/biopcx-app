import React, { useState } from 'react'
import { Grid, TextField, Typography, Button
} from '@mui/material'
import CryptoJS from 'crypto-js'

import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import CancelScheduleSendIcon from '@mui/icons-material/CancelScheduleSend';

import { getList, putRec, postRec } from '../../services/apiconnect'
import { useStyles } from '../../services/stylemui'


const objectRef = 'user/'
const objectId = 'userid/'

const User = props => {

    const [_id] = useState('')
    const [name, nameSet] = useState('')
    const [login, loginSet] = useState('')
    const [passw, passwSet] = useState('')
    const classes = useStyles()

    const userConfirm = () => {
        if (!name) {
            //            setEmptyRecDialog(true)
            return null
        }
        getList('userlogin/' + login)
            .then(async item => {
                if (item.record[0]) {
                    // setEmptyRecDialog(true)
                    return null
                }
                const passwcr = CryptoJS.AES.encrypt(passw, process.env.REACT_APP_SECRET).toString();
                let recObj = {
                    name,
                    login,
                    passw: passwcr,
                }
                if (_id) {
                    recObj = JSON.stringify(recObj)
                    putRec(objectId + _id, recObj)
                } else {
                    recObj = JSON.stringify(recObj)
                    postRec(objectRef, recObj)
                }
            })

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
                                onChange={(event) => { passwSet(event.target.value) }}
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