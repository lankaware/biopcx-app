import React, { useContext, useState } from 'react';
import {
    Navbar, Nav, NavbarBrand, NavbarText, UncontrolledDropdown, DropdownToggle,
    DropdownMenu, DropdownItem
} from 'reactstrap'
import { Button, Dialog, DialogTitle, DialogActions } from '@mui/material'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import { AuthContext } from '../../context/AuthContext'

const AppMenu = props => {
    const { userSign, rolecontext } = useContext(AuthContext)
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
                        <DropdownToggle nav caret className='nav-item text-white font-weight-bold' >
                            ATENDIMENTO
                        </DropdownToggle>
                        <DropdownMenu className='menu-item'>
                            <DropdownItem className='menu-item font-weight-bold' href="/agendaList">Agendas</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret className='nav-item text-white font-weight-bold'>
                            CADASTROS
                        </DropdownToggle>
                        <DropdownMenu className='menu-item'>
                            <DropdownItem className='menu-item font-weight-bold' href="/patientList">Pacientes</DropdownItem>
                            <DropdownItem className='menu-item font-weight-bold' href="/professionalList">Profissionais</DropdownItem>
                            <DropdownItem className='menu-item font-weight-bold' href="/covenantList">Convênios</DropdownItem>
                            <DropdownItem className='menu-item font-weight-bold' href="/procedureList">Procedimentos</DropdownItem>
                            <DropdownItem className='menu-item font-weight-bold' href="/medicineList">Medicamentos</DropdownItem>
                            <DropdownItem className='menu-item font-weight-bold' href="/examList">Itens de Solicitação</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret className='nav-item text-white font-weight-bold'>
                            IMPRESSOS
                        </DropdownToggle>
                        <DropdownMenu className='menu-item'>
                            <DropdownItem className='menu-item font-weight-bold' href="/texttemplateList">Textos Padrões</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret className='nav-item text-white font-weight-bold'>
                            FATURAMENTO
                        </DropdownToggle>
                        <DropdownMenu className='menu-item'>
                            <DropdownItem className='menu-item font-weight-bold' href="/billingList">Lançamentos</DropdownItem>
                            <DropdownItem className='menu-item font-weight-bold' href="/billingReport" disabled={rolecontext !== 'ADMIN'}>Relatório</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret className='nav-item text-white font-weight-bold'>
                        CONFIGURAÇÕES
                        </DropdownToggle>
                        <DropdownMenu className='menu-item'>
                            <DropdownItem className='menu-item font-weight-bold' href="/">Gerais</DropdownItem>
                            <DropdownItem className='menu-item font-weight-bold' href="/loginlist">Logins</DropdownItem>
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