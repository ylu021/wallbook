import React, { Component } from 'react'
import { Form, FormGroup, FormFeedback, Label } from 'reactstrap'
import PropTypes from 'prop-types'
import _ from 'lodash'
import styled from 'styled-components'

export const CusForm = (props) => (
  <StyledForm>
    {props.children}
  </StyledForm>
)

const StyledForm = styled(Form)`
  width: 50%;
  margin: 0 auto;
`

export const FormRow = (props) => {
  const {name, label, inputtype, error, inputRef, ...others} = props
  const state = !error? null : 'danger'
  const tooltip = ' (minimum length 8)'
  return (
    <FormGroup color={state} className='mb-5'>
      <LabelFull htmlFor={name} >{name==='password'? label+tooltip : label}</LabelFull>
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
  width: 100%;
  padding: 0.5rem;
  font-weight: 500;
  font-size: 1.6rem;
  border-radius: 5px;
  border: 1px solid #c0c0c0;
`

const LabelFull = styled(Label)`
  width: 100%;
  font-size: 1.6rem;
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
