import React, { Component } from 'react'
import FeedStatus from './feed_status'

class Feed extends Component {
  render() {
    return (
      <div className="feed">
        <FeedHeader profile_img={'#'} />
        <FeedPost>
          <p>{'hello wallbook'}</p>
        </FeedPost>
        <FeedStatus />
      </div>
    );
  }
}

// presentational

const FeedHeader = (props) => (
  <div clssName="feed-header">
    <img src={props.profile_img} />
    <span>{'3 days ago'}</span>
  </div>
)

const FeedPost = (props) => (
  <div className="feed-post">
    {props.children}
  </div>
)

export default Feed;
