
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
    // console.log('hello', localStorage.getItem('auth'))
    // this needs to be cached
    if(localStorage.getItem('auth')!==null) {
      // user
      return (
        <div>
          {/*<Header user="" logined={true}/>*/}
          <StyledContent>
            <Trending topics={this.state.topics} />
            <p>Welcome user XXX</p>
            <Feed/>
          </StyledContent>
        </div>
      )
    }

    return (
      <div>
        {/*<Header user="" logined={false}/>*/}
        <StyledContent>
          <Trending topics={this.state.topics} />
          <Feed/>
        </StyledContent>
      </div>
    )
  }
}



export default Home
