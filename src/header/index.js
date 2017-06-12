import React, { Component } from 'react';
import Feed from '../feed';
import Banner from './banner';
import Search from './search';
import Profile from '../profile';
import PropTypes from 'prop-types';
import './style.css';

class Header extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    console.log(this.props)
  }
  render() {
    return (
      <div className="header">
        <Banner />
        <Search />
        <Profile {...this.props} />
      </div>
    );
  }
}

Header.PropTypes = {
  user: PropTypes.string
}

export default Header;
