import React, { Component } from 'react'
import { Form, FormGroup, FormFeedback, Label, } from "reactstrap"
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'

export const CusForm = (props) => (
  <Form>
    {props.children}
  </Form>
)

export const FormRow = (props) => {
  const {name, label, inputtype, error, inputRef, ...others} = props
  const state = !error? null : 'danger'
  const tooltip = ' (minimum length 8)'
  return (
    <FormGroup color={state}>
      <Label htmlFor={name} >{name==='password'? label+tooltip : label}</Label>
      <Input 
        {...others} 
        type={inputtype} 
        name={name}
        state={state}
        ref={inputRef}
      />
      {error? <FormFeedback>Invalid {name}</FormFeedback> : null}

    </FormGroup>
  )
}

const Input = styled.input`
  margin-top: 20%;
  padding: .67857143em 1em;
  background: #fff;
  border: none;
  border-bottom: 2px solid #F1F0F0;
  font-size: 1.6rem;
  text-align: center;
  line-height: 0;
`

FormRow.PropTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  inputtype: PropTypes.string,
  onChange: PropTypes.function,
  error: PropTypes.boolean,
}

export const validateField = (state, name, value, cb) => {
  switch(name) {
    case 'email':
      state.formErrors['email'] = !(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i).test(value)
      break
    case 'password':
      state.formErrors['password'] = !(value.length >= 8)
      break
    case 'passwordc':
      state.formErrors['passwordc'] = !(state.password === value)
    default:
      break
  }
  return cb(state.formErrors)
}

export const validateForm = (formtype, state, cb) => {
  let formErrors = {
    email: false,
    password: false,
  }
  if(formtype==='signup'){
    formErrors['passwordc'] = false
  }
  const passwordcCheck = 'passwordc' in formErrors? state.passwordc : true
  //console.log(formErrors, typeof(formErrors['passwordc'])==='undefined')
  if(state.email && state.password && passwordcCheck) {
    return cb(_.isEqual(formErrors, state.formErrors))
  }
}
