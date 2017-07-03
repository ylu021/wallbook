import React, { Component } from 'react'
import { NavbarBrand } from 'reactstrap'

import styled from 'styled-components'

const Banner = (props)=> {
  const {children, ...others} = props
  return (
    <div>
      <NavbarBrand {...others}>
        {children}
      </NavbarBrand>
    </div>
  )
}

export default Banner;
