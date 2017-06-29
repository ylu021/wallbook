
import React, {Component} from "react";
import "./App.css";
import Header from "./header";
import Feed from "./feed";
import {fakeAuth} from "./route";
import CusButton from './component/button'
import { CusForm, FormRow } from './component/form'

class Signup extends Component {
  render() {
    return (
      <div>
        <Header user="" logined={false}/>
        <section id="signup" className="container">
          <h1 className="text-center">Sign Up</h1>
          <div className="row">
            <div className="col-8 mx-auto cusform">
              <CusForm>
                <FormRow label="email" inputtype="email"/>
                <FormRow label="password" inputtype="password"/>
                <FormRow label="Confirm password" inputtype="password"/>
                <CusButton color="primary">Submit</CusButton>
              </CusForm>
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default Signup
