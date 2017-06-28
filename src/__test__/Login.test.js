import React from 'react'
import { shallow } from 'enzyme'
import Login from '../login'
import { fakeAuth } from '../route'

test('Login state\'s redirect renders to true', () => {
  const wrapper = shallow(<Login />)
  wrapper.find('.btn-login').simulate('click')
  expect(wrapper.state().redirect).toEqual(true)



})
