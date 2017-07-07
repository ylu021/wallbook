import React, { Component } from 'react'
import Loading from '../component/loading'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as Actions from '../actions/useraction'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { Template } from '../verification'
import { Redirect } from 'react-router-dom'

export const Success = (props) => {
    const p = [`Thank you for joining wallbook, to learn more about the site's features, please visit FAQ page.`, 'Enjoy your time expressing yourself']

    return (
        <Template 
            title={'Your account is verified'} 
            p={p} 
        >
        </Template>
    )
}

class Expired extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false
        }
    }
    componentDidMount() {
        this.loadInterval = setInterval(() => {
            this.redirect()
        }, this.props.timeout)
    }

    componentWillUnmount() {
        this.loadInterval && clearInterval(this.loadInterval)
        this.loadInterval = false
    }

    redirect = () => {
        console.log('im redirecting')
        this.loadInterval && this.setState({
            redirect: true
        })
    }

    render() {
        const p = [`Your verification code is only active for 5 minutes.`, 'You will now be redirected to verification page, please try again.']
        if(this.state.redirect) {
            return (
                <Redirect to={'/verify'}/>
            )
        }else {
            return (
                <Template 
                    title={'Your verification code has expired'} 
                    p={p} 
                />
            )
        }
    }
}

Expired.PropTypes = {
    timeout: PropTypes.number
}

class Verified extends Component {
    async componentWillMount() {
        // load the actions
        const { token } = this.props
        console.log(token)
        if(token) {
            // there is a token passed
            console.log(token)
            const res = await this.props.actions.verifyEmail(token)
            console.log(res)
        }
    }
    render() {
        const { isVerified, isVerifying } = this.props
        if(isVerifying) {
            return <Loading />
        }
        if(isVerified) {
            return (<Success />)  
        }else {
            return (<Expired timeout={5000} />)
        }
    }
} 

Verified.PropTypes = {
    token: PropTypes.stirng,
    isVerifying: PropTypes.boolean,
    isVerified: PropTypes.boolean
}

const mapStateToProps = (state, props) => {
    // state from store to props
    console.log('wht', props)
    const { isVerified, isVerifying } = state.users
  return {
    isVerified,
    isVerifying,
    token: props.match.params.token
  }
}

const mapDispatchToProps = (dispatch) => (
  // action from dispatch to store
  {
    actions: bindActionCreators(Actions, dispatch)
  }
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Verified))