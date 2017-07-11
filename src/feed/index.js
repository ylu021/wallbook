import React, { Component } from 'react'
import FeedStatus from './feed_status'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ProfileImg, Img } from '../component/usercomponent'

const Card = styled.div`
  background: white;
  width: 48%;
  margin: 0 auto;
  border-radius: 5px;
  border: 1px solid #F1EFEF;
`

class Feed extends Component {
  render() {
    return (
      <Card>
        <FeedHeader date={'5 mins ago'} profile_img={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSk5C3ckfpLgbRaSqo-qBAHRa5jOq2vhz2dkMzeWnmEVfi5h39M'} />
        <FeedPost post={'hello wallbook'}/>
        <FeedStatus />
      </Card>
    );
  }
}

// presentational

const Wrapper = styled.div`
  width: 100%;
  display: inline-flex;
  padding: 1rem 2rem;
  align-items: center;
  border-bottom: 1px solid #F1F0F0;
`

export const StatusWrapper = styled(Wrapper)`
  border-top: 1px solid #F1F0F0;
  justify-content: space-between;
  border-bottom: 0;
`

const FeedDate = styled.span`
  margin-left: 1rem;
  color: #9B9B9B;
  font-size: 1.2rem;
`

const FeedHeader = (props) => {
  const { profile_img, date } = props
  return (
    <Wrapper>
      <ProfileImg>
        <Img src={profile_img} />
      </ProfileImg>
      <FeedDate>{date}</FeedDate>
    </Wrapper>
  )
}

FeedHeader.PropTypes = {
  profile_img: PropTypes.string,
  date: PropTypes.string,
}

const PostWrapper = styled(Wrapper)`
  display: block;
  border: none;
  text-align: left;
  padding: 2rem 2rem;
`

const FeedPost = (props) => (
  <PostWrapper>
    <p>{props.post}</p>
  </PostWrapper>
)

export default Feed;
