
import React, {Component} from 'react'
import { Title } from '../component/title'
import { BorderlessInput } from '../component/input'
import { FormWrapper } from '../profile/pickusername'
import CusButton from '../component/button'
import Header from '../header'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as Actions from '../actions/useraction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


const Section = styled.section`
  padding-top: 15%;
`

const Template = (props) => {
    return (
        <Section>
            <div className='row'>
                <FormWrapper className='col-8 mx-auto'>
                    <Title>{props.title}</Title>
                    <div className='text-center'>
                        <p>{props.p[0]}<br />{props.p[1]}</p>
                    </div>
                    {props.children}
                </FormWrapper>
            </div>
        </Section>
    )
}

export const Sent = (props) => {
    const p = [`We have sent an email confirmation to ${props.email}, please verify the link within 24 hours.`, 'To send verification again please click on the button below']

    return (
        <Template 
            title={'Last Step!'} 
            p={p} 
        >
            <CusButton onClick={ props.onClick }>Send again</CusButton>
        </Template>
    )
}

export const Sending = (props) => {
    const p = ['To send verification please enter your user email or username', 'We will send an email to verify your account, please verify the link within 24 hours.']
    return (
        <div>
            <Header user='' logined={false}/>
            <Template title={'Account Verification'} p={p}>
                <BorderlessInput 
                    name='email'
                    inputtype='text'
                    onChange={props.onChange}
                    error={props.error}
                />
                <CusButton 
                    onClick={ props.onClick } 
                >Send</CusButton>
            </Template>
        </div>
    )
}

class Verification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            emailerror: false
        }
    }

    sendVerification = (e) => {
        e.preventDefault()
        console.log('im here')
        if(this.props.email) {
            // email is passed in

        } else {
            if(!this.state.email) {
                this.setState({
                    emailerror: true
                })
            } else {
                // email is typed in 
            }
        }
    }

    render() {
        const { email } = this.props
        // const sent = true
        if(email) {
            // it has email, resend it 
            // user has email, avatar and username 
            return (
                <Sent 
                    email= { email }
                    onClick={ this.sendVerification } 
                />
            )
        } else {
            return (
                <Sending 
                    error={this.state.emailerror}
                    onClick={ this.sendVerification } 
                />
            )
        }
    }
}

Verification.PropTypes = {
    email: PropTypes.string
}

export default Verification