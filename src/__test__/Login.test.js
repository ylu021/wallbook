import React from 'react'
import { shallow, mount } from 'enzyme'
import Login from '../login'
import { fakeAuth } from '../route'

describe('Login state changes', () => {
  test('state.redirect renders to true', () => {
    const wrapper = mount(<Login />)
    wrapper.find('.btn-login').simulate('click')
    expect(wrapper.instance().state('redirect')).toEqual(true)
  })
})
