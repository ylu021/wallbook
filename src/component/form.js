import React, { Component } from 'react'
import { Form, FormGroup, FormFeedback, Label, Input } from "reactstrap"
import PropTypes from 'prop-types'

export const CusForm = (props) => (
  <Form>
    {props.children}
  </Form>
)

export const FormRow = (props) => {
  const {name, label, inputtype, onChange, error} = props
  const state = !error? null : 'danger'
  const tooltip = ' (minimum length 8)'
  return (
    <FormGroup color={state}>
      <Label htmlFor={name} >{name==='password'? label+tooltip : label}</Label>
      <Input type={inputtype} name={name} onChange={onChange} state={state} />
      {error? <FormFeedback>Invalid {name}</FormFeedback> : null}

    </FormGroup>
  )
}

FormRow.PropTypes = {
  label: PropTypes.string,
  inputtype: PropTypes.string,
}
