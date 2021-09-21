import React from 'react'
import { Navbar, Nav, NavbarBrand, NavbarText } from 'reactstrap'
import { Button } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/MenuOpenOutlined'

const PageHeader = props => {
    return (
        <div>
            <Navbar color='primary' dark expand='md' fixed='top'>
                    <Button
                        color='default'
                        // variant='outlined'
                        size='large'
                        onClick={props.toggleMenu}
                        startIcon={<MenuIcon />}>
                    </Button>
                <NavbarBrand href='/'>
                    BIOPCX &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </NavbarBrand>
                {/* <NavbarToggler onClick={props.toggleMenu} /> */}
                <Nav className='mr-auto ' navbar >
                </Nav>
                <NavbarText >{props.userName}</NavbarText>
            </Navbar>
        </div>
    )
}

export default PageHeader