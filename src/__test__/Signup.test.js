import React from 'react'
import { shallow } from 'enzyme'
import {TestSignup, connectedSignup } from '../signup'
import types from '../constant'
import * as actions from '../actions/useraction'
import { Provider } from 'react-redux'
import Store from '../store'
import { jwt, sendEmailConfirmation } from '../../auth'
import * as api from '../api'
import configureMockStore from 'redux-mock-store'
import promiseMiddleware from 'redux-promise-middleware'
require('dotenv').load()

const mockStore = configureMockStore([promiseMiddleware({
      promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
    })])

// Mocking the global.fetch included in React Native
global.fetch = jest.fn().mockImplementation(() => {
      var p = new Promise((resolve, reject) => {
        resolve({
          ok: true,  
          json: function() { 
            return {added: false}
          }
        });
      });

      return p;
  });

// Helper to mock a failure response (only once)
fetch.mockResponseFailure = (error) => {
  fetch.mockImplementationOnce(
    () => Promise.reject(error)
  );
};


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
  it('should create an action to add a user', async() => {
    const user = {
      email: '1@1.com',
      password: '12345678',
    }

    const store = mockStore({ added: false })
    const apiresponse = await api.addUser(user)
    const actionresponse = await store.dispatch(actions.addUser(user))

    expect(store.getActions()).toEqual([{"type": "ADD_USER_LOADING"}, {"payload": apiresponse, "type": "ADD_USER_SUCCESS"}])    
  })
})

// testing email 
describe('Signup email verification testing', () => {
  it('should send a email', async() => {
    const data = {
      email: '1@1.com',
      password: '12345678',
    }
    const email = 'yichen.luu@gmail.com'
    try {const success = await sendEmailConfirmation(email, jwt(data))
    } catch (e) {
      expect(e).toMatch('error');
    }
  })
})