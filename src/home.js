
import React, {Component} from 'react'
import './App.css'
import Header from './header'
import Feed from './feed'
import { fakeAuth } from './route'
import { Trending } from './trending'

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
  render() {
    console.log(this.props.location.state)
    if(sessionStorage.getItem('auth')!==null) {
      // user
      console.log('logined')
      return (
        <div>
          <StyledContent>
            <Trending topics={this.state.topics} />
            <Feed/>
          </StyledContent>
        </div>
      )
    }

    return (
      <div>
        <StyledContent>
          <Trending topics={this.state.topics} />
          <Feed/>
        </StyledContent>
      </div>
    )
  }
}



export default Home
