import React from 'react'
import { Box } from '@mui/material'
import DateRangeIcon from '@mui/icons-material/DateRange';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import FolderIcon from '@mui/icons-material/Folder';
import MedicationIcon from '@mui/icons-material/Medication';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
// import Login from './Login'
// import tokenValidate from "../../services/tokenValidate"
import agendaImage from "../../pictures/eric-rothermel-FoKO4DpXamQ-unsplash.jpg"
import patientImage from "../../pictures/eric-rothermel-FoKO4DpXamQ-unsplash.jpg"
import professionalImage from "../../pictures/national-cancer-institute-701-FJcjLAQ-unsplash.jpg"
import convenantImage from "../../pictures/omid-kashmari-s34f0Wxbens-unsplash.jpg"
import medicineImage from "../../pictures/madison-agardi-QNrjcp90tVc-unsplash.jpg"
import configImage from "../../pictures/cesar-carlevarino-aragon-NL_DF0Klepc-unsplash.jpg"

import styled, { css } from 'styled-components'

const Logo = styled.h1`
    font-family: "Times New Roman", Times, serif;
    font-size: 80px;
`


const Home = props => {
    return (
        <div className='home-container'>
            {/* <img src={process.env.PUBLIC_URL + 'logo-cor.webp'} alt='Lankaware' weight='410' height='100' /> */}
            <Box className='home-logo'>
                <Logo>BIOPACE</Logo>
            </Box>
            <Box className='home-buttons' style={{
                backgroundImage: `url(${agendaImage})`,
                backgroundSize: '400px',
            }} m={5}>
                <p><DateRangeIcon />
                    Agendas</p>
            </Box>
            <Box className='home-buttons' style={{
                backgroundImage: `url(${agendaImage})`,
                backgroundSize: '400px',
            }} m={5}>
                <p> <PeopleIcon />
                    Pacientes</p>
            </Box>
            <Box className='home-buttons' style={{
                backgroundImage: `url(${professionalImage})`,
                backgroundSize: '400px',
            }} m={5}>
                <p> <AssignmentIndIcon />
                    Profissionais</p>
            </Box>
            <Box className='home-buttons' style={{
                backgroundImage: `url(${convenantImage})`,
                backgroundSize: '400px',
            }} m={5}>
                <p><FolderIcon />
                    Convênios</p>
            </Box>
            <Box className='home-buttons' style={{
                backgroundImage: `url(${medicineImage})`,
                backgroundSize: '400px',
            }} m={5}>
                <p><MedicationIcon />
                    Medicamentos</p>
            </Box>
        </div>
    )
}

export default Home