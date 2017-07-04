import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

let CusButton = (props) => {
  const {children, ...others} = props
  return (
    <StyledButton {...others}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  &:hover {
    opacity: 0.8;
  }
  cursor: pointer;
  display: inline-block;
  border: none;
  background-color: ${props => props.color? props.color : '#9B9B9B' };
  color: white;
  padding: .78571429em 1.5em .78571429em;
  font-weight: 500;
  line-height: 1;
  font-size: 1.6rem;
  font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif;
  text-align: center;
  border-radius: 5px;
  -webkit-transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease;
  transition: opacity .1s ease,background-color .1s ease,color .1s ease,box-shadow .1s ease,background .1s ease;
`

CusButton.PropTypes = {
  color: PropTypes.string,
  onClick: PropTypes.function,
}

export default CusButton
