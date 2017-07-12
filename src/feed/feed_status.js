// container
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StatusWrapper } from './'
import Likes from './feed_likes'

class FeedStatus extends Component {
  render() {
    return (
      <StatusWrapper>
        <Likes />
        <div className="d-flex">
          <CommentsStatus commentscount={23} />
          <Share />
        </div>
      </StatusWrapper>
    )
  }
}

const Text = styled.span`
  font-size: 1.4rem;
  color: ${props => props.color? '#9B9B9B' : '#0275d8'};
`

const TextLink = Text.withComponent('a')

const CommentsStatus = (props) => {
  return (
    <div className="mr-3">
      <Text color>Comments({ props.commentscount })</Text>
    </div>
  )
}

CommentsStatus.propTypes = {
  commentscount: PropTypes.number.isRequired,
}

const Share = (props) => {
  return (
    <div className="share">
      <TextLink href="share">Share</TextLink>
    </div>
  )
}


export default FeedStatus
