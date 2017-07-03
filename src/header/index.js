import React, { Component } from 'react'
import Feed from '../feed'
import Banner from './banner'
import Search from './search'
import Profile from '../profile'
import PropTypes from 'prop-types'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import styled from 'styled-components'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }
  componentDidMount() {
    console.log(this.props)
  }
  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  render() {
    return (
      <header>
        <div className="container-fluid">
          <Navbar light toggleable className="justify-content-center">
            <NavbarToggler right onClick={this.toggle} />
            <Banner href="/">
              <img src="logo.svg" alt="Wallbook" />
            </Banner>
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                {/* <NavItem>
                   <Search />
                </NavItem> */}
                <NavItem className="pl-2">
                  <Profile {...this.props} />
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      </header>
    )
  }
}

Header.PropTypes = {
  user: PropTypes.string,
  logined: PropTypes.boolean,
}

export default Header
