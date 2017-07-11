import React, { Component } from 'react'
import Feed from '../feed'
import Banner from './banner'
import Search from './search'
import Profile from '../profile'
import PropTypes from 'prop-types'
import CusButton from '../component/button'
import FeedForm from '../feed/feed_form'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'
import styled from 'styled-components'
import { fakeAuth } from '../route'
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      logined: false,
      showPostForm: false
    }
  }

  componentDidMount() {
    this.setState({
      logined: !!sessionStorage.getItem('auth')
    })
  }

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  post = () => {
    this.setState({
      showPostForm: true
    })
  }

  render() {
    const { isOpen, showPostForm } = this.state
    const { history } = this.props
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
                      {/* <NavItem className='pl-2 my-auto'> */}
                         {/* <CusButton color='#fe7aa5' size={'small'} onClick={this.post}>Post on wall</CusButton> */}
                      <NavItem>
                        <Profile logined={!!sessionStorage.getItem('auth')} {...this.props} />
                      </NavItem>
                    </Nav>
                  </Collapse>
                </Navbar>
              </div>
              {
                showPostForm? <FeedForm /> : null
              }
      </header>
    )
  }
}

const CusLink = styled(Link)`
  color: #333;
  font-size: 14px;
  font-size: 1.4rem;
  margin-right: 1rem;
`

const BoldCusLink = CusLink.extend`
  font-weight: 600;
  color: #FF0322;
  padding: 3px 1.5rem;
`

Header.PropTypes = {
  user: PropTypes.string,
  logined: PropTypes.boolean,
}

export default Header
