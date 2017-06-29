import React from 'react'
import { shallow } from 'enzyme'
import Login from '../login'
import { fakeAuth } from '../route'

describe('Login state changes', () => {
  test('state.redirect renders to true', () => {
    const wrapper = shallow(<Login />)
    global.localStorage = new LocalStorageMock
    wrapper.find('.btn-login').simulate('click')
    expect(wrapper.state().redirect).toEqual(true)
  })
})
