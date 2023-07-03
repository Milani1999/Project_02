import React, { Component } from "react";
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
              <a href="#HomeComponent">Home</a>
            </li>
            <li>
              <a href="#AboutComponent">About Us</a>
            </li>
            <li className="dropdown">
              <a href="#SchoolComponent" className="dropbtn">
                Our School <i className="fa fa-caret-down"></i>
              </a>
              <div className="dropdown-content">
                <a href="#news">News and Event</a>
                <a href="#gallery">Gallery</a>
                <a href="#notice">Notices</a>
                <a href="#career">Careers</a>
              </div>
            </li>
            <li>
              <a href="contact">Contact us</a>
            </li>
            <li><a href="login">Login</a></li> 
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
