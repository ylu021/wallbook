// container
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StatusWrapper } from './'

class FeedStatus extends Component {
  render() {
    return (
      <StatusWrapper>
        <Likes count={23} />
        <div className="d-flex">
          <CommentsStatus commentscount={23} />
          <Share />
        </div>
      </StatusWrapper>
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

const Text = styled.span`
  font-size: 1.4rem;
  color: ${props => props.color? '#9B9B9B' : '#0275d8'};
`

const TextLink = Text.withComponent('a')

const Likes = (props) => {
  return (
    <LikesWrapper>
      <LikesIcon><i className="fa fa-like">Same</i></LikesIcon>
      <LikesText>{props.count}</LikesText>
    </LikesWrapper>
  )
}

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
