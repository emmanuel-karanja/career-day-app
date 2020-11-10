import React, { Component } from 'react';
import ViewJobPage from '../../../Jobs/ViewJobsPage';
import './style.css';

class Home extends Component {
  render() {
    return (
      <div className="Container">
         <h2>Home</h2>
        <hr/>
        <ViewJobPage/>
      </div>
    )
  }
}

export default Home;