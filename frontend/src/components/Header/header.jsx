import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const userInfo = localStorage.getItem("userInfo");
const user = JSON.parse(userInfo);

let LoggedIn = false;

if (userInfo) {
  LoggedIn = true;
}

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
        <Link to="/" className="logo-link">
          <img src="images/uni2.png" alt="logo" />
        </Link>

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
                {/* <a href="#notice">Notices</a> */}
                {/* <a href="#career">Careers</a> */}
              </div>
            </li>
            <li>
              <Link to="/Contact">Contact us</Link>
            </li>
            {LoggedIn ? (
              <Link to="/login">
                <img
                  src={user.picture}
                  className="Header-pro-pic"
                  alt="profile_image"
                />
              </Link>
            ) : (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>

        <div id="mobile" onClick={this.handleClick}>
          <i
            className={this.state.clicked ? "fas fa-times" : "fas fa-bars"}
          ></i>
        </div>
      </nav>
    );
  }
}

export default Navbar;
