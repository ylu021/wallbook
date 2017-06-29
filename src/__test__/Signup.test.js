import React from 'react'
import { shallow } from 'enzyme'
import Signup from '../signup'

describe('Signup form is valid', () => {
  test('submit button activated', () => {
    const wrapper = shallow(<Signup />)
    wrapper.setState({formValid: true}) // mock valid form
    expect(wrapper.find('.btn-submit').prop('disabled')).toEqual(false)
  })
})
