import React from 'react'
import { shallow } from 'enzyme'
import Signup from '../signup'

describe('Signup form is valid', () => {
  test('submit button activated', () => {
    const wrapper = shallow(<Signup />)
    window.localStorage = {}
    wrapper.state().formValid = true // mock valid form
    expect(wrapper.find('button').disabled).toEqual(false)
  })
})
