import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import Logo from "../../assets/ImageResources/uni2.png";
import {
  Link as ScrollLink,
  animateScroll as scroll,
  Element,
} from "react-scroll";

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
          <img src={Logo} alt="logo" />
        </Link>

        <div>
          <ul
            id="navbar"
            className={this.state.clicked ? "active" : ""}
            onClick={this.handleClick}
          >
            <li>
              <ScrollLink to="home" smooth={true} duration={200}>
                Home
              </ScrollLink>
            </li>
            <li>
              <ScrollLink to="about" smooth={true} duration={200}>
                About Us
              </ScrollLink>
            </li>

            <li className="dropdown">
              <ScrollLink
                to="our_school"
                smooth={true}
                duration={200}
                className="dropbtn"
              >
                Our School <i className="fa fa-caret-down"></i>
              </ScrollLink>
              <div className="dropdown-content">
                <ScrollLink to="news" smooth={true} duration={200}>
                  News and Event{" "}
                </ScrollLink>{" "}
                <ScrollLink to="gallery" smooth={true} duration={200}>
                  Gallery{" "}
                </ScrollLink>{" "}
              </div>
            </li>

            <li>
              <ScrollLink to="contact" smooth={true} duration={200}>
                Contact Us
              </ScrollLink>
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
