import React, { Component } from 'react'
import { Button } from 'reactstrap'
import PropTypes from 'prop-types'

const CusButton = (props) => {
  const {children, ...others} = props
  return (
    <Button {...others}>
      {children}
    </Button>
  )
}

CusButton.PropTypes = {
  color: PropTypes.string,
  onClick: PropTypes.function,
}

export default CusButton
