import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FolderIcon from '@mui/icons-material/Folder';
import MedicationIcon from '@mui/icons-material/Medication';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
// import Login from './Login'
// import tokenValidate from "../../services/tokenValidate"
import agendaImage from "../../pictures/eric-rothermel-FoKO4DpXamQ-unsplash.jpg"
import patientImage from "../../pictures/national-cancer-institute-J_993suZjc0-unsplash.jpg"
import professionalImage from "../../pictures/national-cancer-institute-701-FJcjLAQ-unsplash.jpg"
import convenantImage from "../../pictures/omid-kashmari-s34f0Wxbens-unsplash.jpg"

import styled, { css } from 'styled-components'

// const Logo = styled.h1`
//     font-family: "Times New Roman", Times, serif;
//     font-size: 80px;
// `
const Home = props => {
    return (

        <div className='home-container'>
            <div className='home-logo'>
                <img src={process.env.PUBLIC_URL + 'image1.png'} alt='Biopace' weight='519' height='230' />
            </div>

            {/* <div className='home-link'>
                <a href='https://www.biopace.com.br' target='_blank'>
                    <Typography variant='h4' sx={{ color: 'black', 'fontWeight': 'bold' }}>biopace.com.br</Typography>
                </a>
            </div> */}

            <Box className='home-buttons' style={{
                // backgroundImage: `url(${agendaImage})`,
                // backgroundSize: '400px',
            }} m={5}>
                {/* <p /> */}
                <Button color="success" href="/agendaList" >
                    <Typography variant='h5' sx={{ color: 'black', 'fontWeight': 'bold' }}>AGENDA</Typography>
                </Button>
            </Box>
            <Box className='home-buttons' style={{
                // backgroundImage: `url(${patientImage})`,
                // backgroundSize: '400px',
            }} m={5}>
                {/* <p /> */}
                <Button
                    color="success"
                    href="/patientList"
                >
                    <Typography variant='h5' sx={{ color: 'black', 'fontWeight': 'bold' }}>PACIENTES</Typography>
                </Button>
            </Box>
            <Box className='home-buttons' style={{
                // backgroundImage: `url(${professionalImage})`,
                // backgroundSize: '400px',
            }} m={5}>
                {/* <p /> */}
                <Button
                    color="success"
                    href="/professionalList"
                >
                    <Typography variant='h5' sx={{ color: 'black', 'fontWeight': 'bold' }}>PROFISSIONAIS</Typography>
                </Button>
            </Box>
            <Box className='home-buttons' style={{
                // backgroundImage: `url(${convenantImage})`,
                // backgroundSize: '400px',
            }} m={5}>
                {/* <p /> */}
                <Button
                    color="success"
                    href="/covenantList"
                    sx={{ color: 'black', 'fontWeight': 'bold' }}>
                    <Typography variant='h5' sx={{ color: 'black', 'fontWeight': 'bold' }}>CONVÊNIOS</Typography>
                </Button>
            </Box>
        </div>
    )
}

export default Home