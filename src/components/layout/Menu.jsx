import React, { useContext, useState } from 'react';
import {
    Navbar, Nav, NavbarBrand, NavbarText, UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem
} from 'reactstrap'
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { Context } from '../../context/AuthContext'

const AppMenu = props => {
    const { userSign } = useContext(Context)
    const [confirmDialog, setConfirmDialog] = useState(false)

    const logout = () => {
        setConfirmDialog(true)
    }

    const logoutConfirm = () => {
        userSign(false)
        setConfirmDialog(false)
    }

    const stayIn = () => {
        setConfirmDialog(false)
    }

    const menu = (authent) => {
        if (authent) {
            return (
                <Nav className="mr-auto " navbar>
                    <UncontrolledDropdown nav inNavbar >
                        <DropdownToggle nav caret className='nav-item text-white' >
                            Atendimento
                        </DropdownToggle>
                        <DropdownMenu className='menu-item'>
                            <DropdownItem className='menu-item' href="/agendas">Agendas</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret className='nav-item text-white'>
                            Cadastros
                        </DropdownToggle>
                        <DropdownMenu className='menu-item'>
                            <DropdownItem className='menu-item' href="/patients">Pacientes</DropdownItem>
                            <DropdownItem className='menu-item' href="/professionals">Profissionais</DropdownItem>
                            <DropdownItem className='menu-item' href="/covenants">Convênios</DropdownItem>
                            <DropdownItem className='menu-item' href="/procedures">Procedimentos</DropdownItem>
                            <DropdownItem className='menu-item' href="/medicineList">Medicamentos</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret className='nav-item text-white'>
                            Impressos
                        </DropdownToggle>
                        <DropdownMenu className='menu-item'>
                            <DropdownItem className='menu-item' href="/texttemplateList">Textos Padrões</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret className='nav-item text-white'>
                            Relatórios
                        </DropdownToggle>
                        <DropdownMenu className='menu-item'>
                            <DropdownItem className='menu-item' href="/agenda">Agenda</DropdownItem>
                            <DropdownItem className='menu-item' href="/">Atendimentos</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret className='nav-item text-white'>
                        Configurações
                        </DropdownToggle>
                        <DropdownMenu className='menu-item'>
                            <DropdownItem className='menu-item' href="/">Gerais</DropdownItem>
                            <DropdownItem className='menu-item' href="/login">Logins</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            )
        } else {
            return (
                <Nav className='mr-auto ' navbar >
                </Nav>
            )
        }
    }

    return (
        <div >
            <Navbar color="primary" dark expand="xs" fixed='top'>
                <NavbarBrand className="d-sm-none d-md-block" href="/">
                    BIOPCX &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </NavbarBrand>
                {/* <NavbarToggler onClick={toggle} /> */}
                {/* <Collapse isOpen={isOpen} navbar> */}
                {menu(props.authenticated)}
                <NavbarText className="d-sm-none d-md-block">{props.userName}</NavbarText>
                {/* </Collapse> */}
                <Button
                    color='inherit'
                    variant='standard'
                    size='small'
                    onClick={logout}//{setConfirmDialog(true)}
                    startIcon={<ExitToAppIcon />}
                >
                </Button>
            </Navbar>
            <Dialog
                open={confirmDialog}
            >
                <DialogTitle id="alert-dialog-title">{"Deseja sair do sistema?"}</DialogTitle>
                <DialogActions>
                    <Button onClick={logoutConfirm} color="primary" variant='contained' autoFocus>
                        Confirmar
                    </Button>
                    <Button onClick={stayIn} color="secondary" variant='contained'>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default AppMenu