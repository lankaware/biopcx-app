import React from "react"
import { Link } from "react-router-dom"
import { ProSidebar, Menu, MenuItem, SubMenu, SidebarHeader, SidebarContent, SidebarFooter } from 'react-pro-sidebar'

import HomeIcon from '@mui/icons-material/Home'
import ListAltIcon from '@mui/icons-material/ListAlt'
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar'
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf'
import SettingsIcon from '@mui/icons-material/Settings'
import SpellcheckIcon from '@mui/icons-material/Spellcheck'

import 'react-pro-sidebar/dist/css/styles.css'

const AppMenu = (props) => {

    // const [menuCollapse, setMenuCollapse] = useState(false)
    return (
        <div>
            <ProSidebar className='menu'
                collapsed={props.collapseMenu}
                width={200}
            // image={'../../../public/BackgroundImageMenu.jpg'}
            >
                <SidebarHeader>
                </SidebarHeader>
                <Menu iconShape='circle'>
                    <MenuItem icon={<HomeIcon />}>
                        Início
                        <Link to='/' />
                    </MenuItem>
                    <SubMenu title='Atendimento' icon={<PermContactCalendarIcon />}>
                        <MenuItem > Agenda
                            <Link to='/agendas' />
                        </MenuItem>
                    </SubMenu>
                    <SubMenu title='Cadastros' icon={<ListAltIcon />}>
                        <MenuItem> Pacientes
                            <Link to='/patients' />
                        </MenuItem>
                        <MenuItem> Profissionais
                            <Link to='/professionals' />
                        </MenuItem>
                        <MenuItem> Convênios
                            <Link to='/covenants' />
                        </MenuItem>
                        <MenuItem> Procedimentos
                            <Link to='/procedures' />
                        </MenuItem>
                    </SubMenu>
                    <SubMenu title='Impressos' icon={<SpellcheckIcon />}>
                        <MenuItem> Editor
                            <Link to='/editor' />
                        </MenuItem>
                    </SubMenu>
                    <SubMenu title='Relatórios' icon={<PictureAsPdfIcon />}>
                        <MenuItem> Agenda
                            <Link to='/agenda' />
                        </MenuItem>
                        <MenuItem> Atendimentos
                            <Link to='/' />
                        </MenuItem>
                    </SubMenu>
                    <SubMenu title='Configurações' icon={<SettingsIcon />}>
                        <MenuItem> Gerais
                            <Link to='/' />
                        </MenuItem>
                        <MenuItem> Segurança
                            <Link to='/' />
                        </MenuItem>
                    </SubMenu>

                </Menu>

                <SidebarContent>
                    {/**  You can add the content of the sidebar ex: menu, profile details, ... */}
                </SidebarContent>
                <SidebarFooter>
                    Lankaware
                </SidebarFooter>

            </ProSidebar >
        </div>
    )
}

export default AppMenu

