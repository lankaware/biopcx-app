import React, { useState, useEffect, useContext } from 'react'
import { Grid, TextField, Typography, Button, MenuItem } from '@mui/material'
import CryptoJS from 'crypto-js'
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import { useStyles } from '../../services/stylemui'
import { postRec, getList } from '../../services/apiconnect'
import { AuthContext } from '../../context/AuthContext'

const Authentication = props => {

    const { authenticated, userSign } = useContext(AuthContext);

    const [login, loginSet] = useState('')
    const [passw, passwSet] = useState('')
    const [unit, unitSet] = useState('')
    const [unitList, unitListSet] = useState([])
    const classes = useStyles()

    useEffect(() => {
        getList("unit/")
            .then((items) => {
                unitListSet(items.record)
                unitSet(items.record[0]._id)
            })
    }, [])

    if (authenticated) return null

    const loginConfirm = async () => {
        if (!login || !passw || !unit) {
            alert('Por favor preencha todos os campos.')
            return null
        }
        const passwcr = CryptoJS.AES.encrypt(passw, process.env.REACT_APP_SECRET).toString();
        let recObj = {
            passw: passwcr,
            userunit: unit,
        }
        recObj = JSON.stringify(recObj)
        postRec('userlogin/' + login, recObj)
            .then(result => {
                if (!result.token) {
                    alert('Usuário ou login inválidos!')
                    return null
                }
                console.log('result', result)
                userSign(result.token, result.name, result.role, result.professionalid, result.professionalname, unit)
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
                        <Grid item xs={4}>
                            <TextField
                                value={unit}
                                onChange={(event) => { unitSet(event.target.value) }}
                                id='unit'
                                label='Unidade'
                                fullWidth={true}
                                disabled={false}
                                InputLabelProps={{ shrink: true, disabled: false, classes: { root: classes.labelRoot } }}
                                variant='outlined'
                                type='text'
                                size='small'
                                select>
                                {unitList.map((option) => (
                                    <MenuItem key={option._id} value={option._id}>{option.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={6}>
                            <Button color='primary' variant='contained' size='small' endIcon={<SubscriptionsIcon />}
                                onClick={_ => loginConfirm()} disabled={(false)}>Entrar</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    )
}
export default Authentication