
import React, {Component} from 'react'
import './App.css'
import Header from './header'
import Feed from './feed'
import { fakeAuth } from './route'
import { Trending } from './trending'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as Actions from './actions/postaction'

import styled from 'styled-components'

import _ from 'lodash'

export const StyledContent = styled.div`
  background-color: #F9F9F9;
  text-align: center;
  padding: 2rem 0;
  min-height: 100vh;
`

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: ['topic1', 'topic2', 'topic3', 'topic4'],
      posts: []
    }
  }

  componentDidMount() {
    console.log('home mounted')
    if(sessionStorage.getItem('auth')) {
      // get liked as well
      this.props.actions.fetchPostsAuth()
      console.log(this.props.actions)
    } else {
      this.props.actions.fetchPosts()
    }
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEqual(this.props, nextProps)) {
      console.log('rc not equal', this.props.posts, nextProps.posts)
      if(sessionStorage.getItem('auth')) {
        this.props.actions.fetchPostsAuth()
      }
    }
  }

  updatePosts = () => {
    console.log('inside updating posts')
    this.props.actions.fetchPostsAuth()
  }

  render() {
    const { posts } = this.props
    let postitems = posts
    return (
      <div>
        <StyledContent>
          <Trending topics={this.state.topics} />
          <Feed posts={postitems} onChange={this.updatePosts} />
        </StyledContent>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
    // state from store to props
  console.log('mapping', state.posts)
  return {
    posts: state.posts.posts,
    done: state.posts.done
  }
}

const mapDispatchToProps = (dispatch) => (
  // action from dispatch to store
  {
    actions: bindActionCreators(Actions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
