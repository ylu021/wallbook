import React, { Component } from 'react'
import { NavbarBrand } from 'reactstrap'

const Banner = (props)=> {
  const {children, ...others} = props
  return (
    <NavbarBrand {...others}>{children}</NavbarBrand>
  )
}

export default Banner;
