// container
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class FeedStatus extends Component {
  render() {
    return (
      <div className="feed-status">
        <Likes>
          <i className="fa fa-like"></i>
          <span>23</span>
        </Likes>
        <CommentsStatus commentscount={23} />
        <Share />
      </div>
    )
  }
}

const Likes = (props) => {
  return (
    <div className="likes">
      { props.children }
    </div>
  )
}

const CommentsStatus = (props) => {
  return (
    <div className="comments-status">
      <span>Comments({ props.commentscount })</span>
    </div>
  )
}

CommentsStatus.propTypes = {
  commentscount: PropTypes.number.isRequired,
}



const Share = (props) => {
  return (
    <div className="share">
      <a href="share">Share</a>
    </div>
  )
}


export default FeedStatus
