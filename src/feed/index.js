import React, { Component } from 'react'
import FeedStatus from './feed_status'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ProfileImg, Img } from '../component/usercomponent'
import Tag from '../component/tag'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from '../actions/postaction'

const Card = styled.div`
  background: white;
  width: 48%;
  margin: 0 auto;
  margin-bottom: 1.5rem;
  border-radius: 5px;
  border: 1px solid #F1EFEF;
`

class Feed extends Component {
  render() {
    const { posts } = this.props
    return (
      <div>
        {
          Object.keys(posts).map((key, idx) => {
            return <FeedItem post={posts[key]} key={idx} />
          })
        }
      </div>
    )
  }
}

Feed.PropTypes = {
  posts: PropTypes.array.required
}

const FeedItem = (props) => {
  const { content, avatar, tag, username } = props.post
  return (
    <Card>
      <FeedHeader date={'5 mins ago'} profile_img={avatar} username={username} />
      <FeedPost post={content}/>
      {tag? <FeedTag post={tag}/> : null}
      <FeedStatus {...props.post} />
    </Card>
  )
}

// presentational

const Wrapper = styled.div`
  width: 100%;
  display: inline-flex;
  padding: 1rem 2rem;
  align-items: center;
  // border-bottom: 1px solid #F1F0F0;
  color: #333;
`

export const StatusWrapper = styled(Wrapper)`
  // border-top: 1px solid #F1F0F0;
  justify-content: space-between;
  border-bottom: 0;
`

const FeedDate = styled.span`
  margin-left: 1.5rem;
  color: #9B9B9B;
  font-size: 1.2rem;
`

const FeedUsername = FeedDate.extend`
  margin-left: 1rem;
  font-weight: 600;
  color: #333;
`

const FeedHeader = (props) => {
  const { profile_img, date, username } = props
  return (
    <Wrapper>
      <ProfileImg>
        <Img src={profile_img} />
      </ProfileImg>
      <FeedUsername>{username}</FeedUsername>
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
    {props.post? <p>{props.post}</p>: null}
  </PostWrapper>
)

const TagWrapper = styled(Wrapper)`
  display: block;
  border: none;
  text-align: left;
  padding: 0rem 2rem;
  padding-bottom: 1rem;
`

const FeedTag = (props) => (
  <TagWrapper>
    <Tag>{props.post}</Tag>
  </TagWrapper>
)

const mapStateToProps = (state, props) => {
    // state from store to props
  return {
    // liked: true,
    newlikes: state.posts.likes
  }
}

const mapDispatchToProps = (dispatch) => (
  // action from dispatch to store
  {
    actions: bindActionCreators(Actions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Feed)
