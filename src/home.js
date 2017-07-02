
import React, {Component} from 'react'
import './App.css'
import Header from './header'
import Feed from './feed'
import { fakeAuth } from './route'
import { Trending } from './landing'


class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: ['topic1', 'topic2', 'topic3', 'topic4']
    }
  }
  render() {
    console.log('hello', localStorage.getItem('auth'))
    // this needs to be cached
    if(localStorage.getItem('auth')!==null) {
      // user
      return (
        <div className="home">
          <Header user="" logined={true}/>
          <p>Welcome user XXX</p>
          <Feed/>
        </div>
      )
    }

    return (
      <div className="home">
        <Header user="" logined={false}/>
        <Trending topics={this.state.topics}>
          <ul>
            {this.state.topics.map((topic, idx) => (
              (<li className="trending-topic" key={idx}>{topic}</li>)
            ))}
          </ul>
        </Trending>
        <Feed/>
      </div>
    )
  }
}



export default Home
