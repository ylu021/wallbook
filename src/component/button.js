import React, { Component } from 'react'
import { Button } from 'reactstrap'

const CusButton = (props) => {
  const {children, ...others} = props
  return (
    <Button {...others}>
      {children}
    </Button>
  )
}

export default CusButton
