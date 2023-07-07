import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";



class Navbar extends Component {
  state = {
    clicked: false,
  };

  handleClick = () => {
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <nav>
        <a href="#home" className="logo-link">
          <img src="images/uni2.png" alt="logo" />
        </a>




        <div>
          <ul
            id="navbar"
            className={this.state.clicked ? "active" : ""}
            onClick={this.handleClick}
          >
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/About">About Us</Link>
            </li>
            <li className="dropdown">
              <Link to="/School" className="dropbtn">
                Our School <i className="fa fa-caret-down"></i>
              </Link>
              <div className="dropdown-content">
                <Link to="/Events">News and Event</Link>
                <a href="#gallery">Gallery</a>
                <a href="#notice">Notices</a>
                <a href="#career">Careers</a>
              </div>
            </li>
            <li>
              <Link to="/Contact">Contact us</Link>
            </li>
            <li><Link to="/Administrator">Login</Link></li>
          </ul>
        </div>

        <div id="mobile" onClick={this.handleClick}>
          <i className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>
    );
  }
}

export default Navbar;
