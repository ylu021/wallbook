import React from 'react'
import { shallow } from 'enzyme'
import {TestSignup, connectedSignup } from '../signup'
import types from '../constant'
import * as actions from '../actions/useraction'
import { Provider } from 'react-redux'
import Store from '../store'

describe('Signup form is valid', () => {
  test('submit button activated', () => {
    const storeInstance = Store()
    const wrapper = shallow(<TestSignup />)
    wrapper.setState({formValid: true}) // mock valid form
    expect(wrapper.find('.btn-submit').prop('disabled')).toEqual(false)
  })
})


// testing action creators are run successfully
describe('Signup action success', () => {
  it('should create an action to add a user', () => {
    const user = {
      email: '1@1.com',
      password: '12345678',
    }

    const expectedAction = {
      type: types.ADD_USER,
      user
    }
    expect(actions.addUser(user)).toEqual(expectedAction)
  })
})
