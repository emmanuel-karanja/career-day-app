import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <div>
        <h1>
          404 <small>Not Found :(</small>
        </h1>
		<Link to="/">Back Home</Link>
      </div>
    )
  }
}

export default NotFound;