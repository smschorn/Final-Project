import React from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { NavLink as RRNavLink } from 'react-router-dom';

class Navigation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {isOpen: false}
    this.toggle = this.toggle.bind(this)
  }

  toggle() {
    this.setState({isOpen: !this.state.isOpen})
  }

  render() {
    return (
      <Navbar color='primary' dark expand='md'>
        <NavbarBrand href='/'>Repay Away</NavbarBrand>
        <NavbarToggler onClick={this.toggle}/>
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className='ml-auto' navbar>
            <NavItem>
              <RRNavLink to='/ledgers' className='nav-link'>Ledgers</RRNavLink>
            </NavItem>
            <NavItem>
              <RRNavLink to='/accounts' className='nav-link'>Accounts</RRNavLink>
            </NavItem>
            <NavItem>
              <NavLink to='/users/sign_out' className='nav-link'>Log Out</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
