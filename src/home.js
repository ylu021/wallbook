
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
      topics: ['topic1', 'topic2', 'topic3', 'topic4']
    }
  }

  ComponentDidMount() {
    this.props.actions.fetchPosts()
  }

  render() {
    console.log('inside home', this.props.posts)
    if(Object.keys(this.props.posts).length===0) {
      this.props.actions.fetchPosts()
    }

    return (
      <div>
        <StyledContent>
          <Trending topics={this.state.topics} />
          <Feed posts={this.props.posts}/>
        </StyledContent>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
    // state from store to props
  console.log(state.posts)
  return {
    posts: state.posts.posts
  }
}

const mapDispatchToProps = (dispatch) => (
  // action from dispatch to store
  {
    actions: bindActionCreators(Actions, dispatch)
  }
)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
