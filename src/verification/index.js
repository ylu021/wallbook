
import React, {Component} from 'react'
import { Title } from '../component/title'
import { BorderlessInput } from '../component/input'
import { FormWrapper } from '../profile/pickusername'
import CusButton from '../component/button'
import { validateField } from '../component/form'
import Loading from '../component/loading'
import Header from '../header'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as Actions from '../actions/useraction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'


const Section = styled.section`
  padding-top: 15%;
`

export const Template = (props) => {
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
    const p = [`We have sent an email confirmation to ${props.email}, please verify the link within 24 hours.`, 'If you did not receive the email, click below to try again']
    return (
        <Template 
            title={'Last Step!'} 
            p={p} 
        >
            <CusButton onClick={ props.onClick(props.email) }>Send again</CusButton>
        </Template>
    )
}

class Sending extends Component {
    constructor(props) {
        super(props)
        this.state = {
            p: ['To send verification please enter your user email or username', 'We will send an email to verify your account, please verify the link within 24 hours.'],
            email: '',
            emailerror: false
        }
    }

    handleInput = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        validateField({
            formErrors: {
                email: this.state.emailerror
            }
        }, name, value, (res) => {
            this.setState({
                emailerror: res.email,
                email: value
            })
        })
    }

    render() {
        const { emailerror, p, email } = this.state
        return (
            <Template title={'Account Verification'} p={ p }>
                <BorderlessInput 
                    name='email'
                    inputtype='text'
                    onChange={ this.handleInput }
                    error={ emailerror }
                />
                <CusButton 
                    onClick={ this.props.onClick(email) } 
                    disabled={ emailerror } 
                >Send</CusButton>
            </Template>
        )
    }
}

class Verification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
    }

    componentDidMount() {
        if(!this.props.email && !this.state.email) {
            console.log('i should be here in resend')
            // this is resend, grab from 
        }
    }

    sendVerification = (email) => (e) => {
        e.preventDefault()
        if(this.props.hasOwnProperty('email')) {
            console.log('this props', this.props.email)
            // email is passed in most likely this account is registered
            this.props.actions.sendEmail(this.props.email)
        } else {
            // email is valid
            console.log('this state', this.state.email)
            this.setState({
                email
            })
            this.props.actions.sendEmail(email)
        }
    }

    render() {
        const { email, isSending, emailSent } = this.props
        // console.log('oprops', email, isSending, emailSent)
        // const sent = true
        if(isSending) {
            return (
                <Loading />
            )
        }
        if(email || emailSent) {
            // it has email, resend it 
            // user has email, avatar and username 
            console.log('this', email, this.state.email)
            if(email) {
                return (
                <Sent 
                    email= { email }
                    onClick={ this.sendVerification } 
                />)
            }else {
                if(!this.state.email) {
                    // resending thus extracting email from current page

                }
                return (
                <Sent 
                    email= { this.state.email }
                    onClick={ this.sendVerification } 
                />
                )  
            }
        } else {
            return (
                <Sending 
                    onClick={ this.sendVerification } 
                />
            )
        }
    }
}

Verification.PropTypes = {
    email: PropTypes.string,
    emailSent: PropTypes.boolean,
    isSending: PropTypes.boolean
}

const mapStateToProps = (state, props) => {
    // state from store to props
    const { emailSent, isSending } = state.users
  return {
    emailSent,
    isSending
  }
}

const mapDispatchToProps = (dispatch) => (
  // action from dispatch to store
  {
    actions: bindActionCreators(Actions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Verification)