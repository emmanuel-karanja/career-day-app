import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <div className="footer">
            <hr style={ { margin: "30px 0 10px 0" } } />
            <p>&copy;&nbsp;<Link to='/'><small>Author : Emmanuel Karanja</small></Link> <small>Nov 2020</small></p>
          </div>
        </div>
      </div>
    )
  }
}

export default Footer;