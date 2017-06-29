import React, { Component } from 'react'
import { Form, FormGroup, Label, Input } from "reactstrap"

export const CusForm = (props) => (
  <Form>
    {props.children}
  </Form>
)

export const FormRow = (props) => {
  const {label, inputtype} = props
  return (
    <FormGroup>
      <Label htmlFor={label}>{label}</Label>
      <Input type={inputtype} name={label} />
    </FormGroup>
  )
}
