import React, { Component } from 'react';
import Feed from '../feed';
import Button from '../component/button'
import { InputGroup, InputGroupAddon, Input } from 'reactstrap'


class Search extends Component {
  render() {
    return (
      <div className="search">
        <InputGroup>
          <Input id="query" placeholder="exlore topics" />
          <InputGroupAddon>search</InputGroupAddon>
        </InputGroup>
      </div>

    );
  }
}

export default Search;
