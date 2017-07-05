import React, { Component } from 'react'
import styled from 'styled-components'
import { FormGroup, FormFeedback } from 'reactstrap'
import PropTypes from 'prop-types'

const Borderless = styled.input`
  padding: .67857143em 1em;
  background: #fff;
  border: none;
  border-bottom: 2px solid #F1F0F0;
  font-size: 1.6rem;
  text-align: center;
  line-height: 0;
`

export const BorderlessInput = (props) => {
    const {name, label, inputtype, error, inputRef, ...others} = props
  const state = !error? null : 'danger'
    return (
        <FormGroup color={state} className='mb-5 text-center'>
            <Borderless 
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

BorderlessInput.PropTypes = {
  name: PropTypes.string,
  inputtype: PropTypes.string,
  onChange: PropTypes.function,
  error: PropTypes.boolean,
}