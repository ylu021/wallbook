import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, Input } from 'reactstrap'
import CusButton from '../component/button'
import { InfoTitle } from '../component/title'
import { FormRow } from '../component/form'
import Span from '../component/span'
import styled from 'styled-components'
import _ from 'lodash'

import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/useraction'

import { Redirect } from 'react-router-dom'


class FeedForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: '',
      opened: false,
      error: '',
      tag: ''
    }
  }

  toggle = () => {
    this.setState({
      opened: !this.state.opened
    })
  }

  handleInput = (e) => {
    e.preventDefault()
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  post = (e) => {
    e.preventDefault()
    if(!this.state.post) {
      this.setState({
        error: 'Feed cannot be empty'
      })
    } else {
      let tag = this.state.tag.trim()
      let post = this.state.post
      this.props.actions

      // post
      this.props.actions.addPost({
        content: post,
        tag: tag
      })
    }
  }

  render() {
    if(this.props.added) {
      window.location.reload()
    }
    return (
      <div className='my-auto'>
        <CusButton color='#fe7aa5' size={'small'} onClick={this.toggle}>Post on wall</CusButton>
        <Modal isOpen={this.state.opened} toggle={this.toggle} backdrop={'static'}>
          <ModalHeader className='d-flex justify-content-between'>
            <InfoTitle>Create a feed</InfoTitle>
            <Close onClick={this.toggle}>X</Close>
          </ModalHeader>
          <div className='dropdown-divider' />
          <ModalBody>
            <Form placeholder={this.state.error} name='post' onChange={this.handleInput}/>
            <Tags placeholder={'Add a keyword to spread your feed'} label='Topic' name='tag' inputtype="text" onChange={this.handleInput} />
            { this.state.tags? (
              <ul>
                {this.state.tags.map((tag, idx) => {
                  return <li key={idx}>{tag}</li>
                })}
              </ul>
            ) : null }
          </ModalBody>
          <ModalFooter>
            <CusButton color={'#fe7aa5'} onClick={this.post}>Post</CusButton>{' '}
            <CusButton onClick={this.toggle}>Cancel</CusButton>
            {this.props.isAdding? <Span>Submitting...</Span>: null}
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const Tags = styled(FormRow)`
  border: none;
  border-bottom: 2px solid #F1F0F0;
  ${'' /* padding: .67857143em 1em; */}
`

const Close = styled.span`
  font-size: 2.2rem;
  font-family: sans-serif;
`

const Form = styled.textarea`
  resize:none;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  width: 100%;
  height: 10rem;
  font-size: 1.6rem;
`

const ModalHeader = styled.div`
  border-bottom: none;
  padding: 1rem 1.5rem;
`

const mapStateToProps = (state, props) => {
  console.log('sessions', state.sessions)
  return {
    added: state.sessions.added,
    isAdding: state.sessions.isAdding,
  }
}

const mapDispatchToProps = (dispatch) => (
  // action from dispatch to store
  {
    actions: bindActionCreators(Actions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(FeedForm)
