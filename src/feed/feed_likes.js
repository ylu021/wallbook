import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StatusWrapper } from './'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/postaction'

import _ from 'lodash'

class Likes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      liked: this.props.liked, // initially liked or not liked
      likes: this.props.likes, // inherit from parent,
      postid: this.props.id
    }
  }

  componentWillReceiveProps(nextProps) {
    if(_.isEqual(this.props, nextProps)) {
      this.setState({
        liked: nextProps.liked, // initially liked or not liked
        likes: nextProps.likes, // inherit from parent,
        postid: nextProps.id
      })
    }
  }

  likePost = (e) => {
    e.preventDefault()
    if(sessionStorage.getItem('auth')) {
      const { id } = this.props
      this.props.actions.likePost({
        postid: id
      })
      let updated = !this.state.liked
      console.log(`updated liked, ${updated}, current likes ${this.state.likes}`)
      this.setState({
        liked: updated,
        likes: updated ? +this.state.likes + 1 : +this.state.likes - 1 
      })
    }
  }

  render() {
    console.log('like render', this.state)
    let { likes, liked } = this.state
    return (
      <LikesWrapper>
        <LikesIcon onClick={this.likePost}><i className="fa fa-like">Same</i></LikesIcon>
        {+likes>0? <LikesText>{ likes }</LikesText> : null}
      </LikesWrapper>
    )
  }
}

const LikesWrapper = styled.div`
  line-height: 0;
`

const LikesText = styled.span`
  color: #FF0322;
  font-size: 16px;
  font-size: 1.6rem;
  font-weight: 500;
`

const LikesIcon = styled.span`
  color: #FF0322;
  margin-right: 0.5rem;
`

const mapStateToProps = (state, props) => {
    // state from store to props
  // console.log(state.posts)
  return {
    postsstate: state.posts
  }
}

const mapDispatchToProps = (dispatch) => (
  // action from dispatch to store
  {
    actions: bindActionCreators(Actions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Likes)
