import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import "./footer.css";
import Logo from "../../assets/ImageResources/universal.jpg";
import { Link } from "react-router-dom";

library.add(faEnvelope, faPhone, faFacebookF, faTwitter, faYoutube);

function Footer() {
  return (
    <footer className="footer">
      <div className="main-footer">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-3">
              <div className="widget w-footer widget_black_studio_tinymce">
                <h6 className="widget-title">
                  <span className="light">About Us </span>
                  <br />
                  <br />
                  <a href="#home" className="logo-link-small">
                    <img src={Logo} alt="logo" />
                  </a>
                </h6>
                <div className="textwidget">
                  Thank you for visiting our School’s web site. We are happy and
                  proud that you decided to check us out, and we fervently hope
                  you will be pleased with what you see and read here. We would
                  be happy to clarify any further points you may have, and if
                  you would like to give us a call on 0777810740 and come over
                  to see the school for yourself, we will welcome you warmly to
                  the Universal Family!! Enjoy your browsing of our pages!!
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-3">
              <div className="widget w-footer widget_nav_menu">
                <h6 className="widget-title">
                  <span className="light">Quick Link</span>
                </h6>
                <div className="menu-footer-menu-container">
                  <ul id="menu-footer-menu" className="menu">
                    <li id="menu-item-menu" className="menu-item">
                      <Link to="/About">About us</Link>
                    </li>
                    <li id="menu-item-menu" className="menu-item">
                      <Link to="/School">Our School</Link>
                    </li>
                    <li id="menu-item-menu" className="menu-item">
                      <Link to="/Contact">Contact Us</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-3">
              <div className="widget w-footer widget-opening-hours">
                <h6 className="widget-title">
                  <span className="light">Working Hours </span>
                </h6>
                <div className="working-hours">
                  <table>
                    <thead>
                      <tr>
                        <th>Day</th>
                        <th>Hours</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Monday</td>
                        <td>07:00-17:00</td>
                      </tr>
                      <tr>
                        <td>Tuesday</td>
                        <td>07:00-17:00</td>
                      </tr>
                      <tr>
                        <td>Wednesday</td>
                        <td>07:00-17:00</td>
                      </tr>
                      <tr>
                        <td>Thursday</td>
                        <td>07:00-17:00</td>
                      </tr>
                      <tr>
                        <td>Friday</td>
                        <td>07:00-17:00</td>
                      </tr>
                      <tr>
                        <td>Saturday</td>
                        <td>07:00-17:00</td>
                      </tr>
                      <tr>
                        <td>Sunday</td>
                        <td>CLOSED</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-xs-12 col-md-3">
              <div className="widget w-footer widget_black_studio_tinymce">
                <h6 className="widget-title">
                  <span className="light">Contact details</span>
                </h6>
                <div className="textwidget">
                  <p>
                    Universal International School,
                    <br />
                    339/, 51 Akkara 18 Rd,
                    <br />
                    Balangoda, Sri Lanka.
                  </p>
                  <br />
                  <p>
                    Mobile: <FontAwesomeIcon icon={faPhone} /> 0777810740
                  </p>
                  <p>
                    Web:{" "}
                    <a href="http://www.uissrilanka.com/">
                      www.uissrilanka.com
                    </a>
                    <br />
                    Email:{" "}
                    <a href="mailto:info@uissrilanka.com">
                      <FontAwesomeIcon icon={faEnvelope} /> info@uissrilanka.com
                    </a>
                  </p>
                  <p>
                    Follow us:{" "}
                    <a href="https://www.facebook.com/Universal-International-School-116576195107317/">
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="Fa-Icon-So"
                      />
                    </a>
                    <a href="https://www.youtube.com/@universalschool1691">
                      <FontAwesomeIcon
                        icon={faYoutube}
                        className="Fa-Icon-So"
                      />
                    </a>
                    <a href="https://twitter.com/i/flow/login?redirect_after_login=%2F">
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="Fa-Icon-So"
                      />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom-footer">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-4">
              <div className="bottom-left">
                <p>Copyright Universal International School</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
