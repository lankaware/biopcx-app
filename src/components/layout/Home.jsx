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

const Home = props => {
    return (
        <div className='container-div'>
            {/* <img src={process.env.PUBLIC_URL + 'logo-cor.webp'} alt='Lankaware' weight='410' height='100' /> */}
            <Box>
            <DateRangeIcon/>
                Agendas
            </Box>
            <Box>
            <PeopleIcon/>
                Pacientes
            </Box>
            <Box>
                <AssignmentIndIcon/>
                Profissionais
            </Box>
            <Box>
                <FolderIcon/>
                Convênios
            </Box>
            <Box>
                <MedicationIcon/>
                Medicamentos
            </Box>
            <Box>
                <SettingsSuggestIcon/>
                Configurações
            </Box>
        </div>
    )
}

export default Home