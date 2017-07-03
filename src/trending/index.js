// presentational
import React, {Component} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Title = styled.h1`
  color: #FF0322;
  font-size: 20px;
  font-size: 2.2rem;
  line-height: 2;
  font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Verdana, sans-serif;
`

const Topics = styled.ul`
  margin-top: 2rem;
`

const TopicItem = styled.li`
  display: inline;
  font-size: 14px;
  font-size: 1.4rem;
  border-radius: 5px;
  border: 2px solid #F1F0F0;
  background-color: white;
  padding: 0.5rem;
  margin: 0.5rem;
`

const Wrapper = styled.div`
  margin-bottom: 4rem;
`

export const Trending = (props) => {
  const { topics } = props
  return (
    <Wrapper>
      <Title>Trending Topics</Title>
      <Topics>
        {topics.map((topic, idx) => (
          (<TopicItem key={idx}>{topic}</TopicItem>)
        ))}
      </Topics>
    </Wrapper>
  )
}

Trending.PropTypes = {
  topics: PropTypes.array,
}
