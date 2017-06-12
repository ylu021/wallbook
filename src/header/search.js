import React, { Component } from 'react';
import Feed from '../feed';
import Button from '../component/button'

class Search extends Component {
  render() {
    return (
      <div className="search">
        <input
          id="query"
          className="search-input"
          type="text"
          placeholder="explore topics"
         />
      </div>
    );
  }
}

export default Search;
