// presentational
import React, {Component} from 'react'


export const Trending = (props) => {
  const { children } = props
  return (
    <div>
      <h1>Trending Topics</h1>
        {children}
    </div>
  )
}
