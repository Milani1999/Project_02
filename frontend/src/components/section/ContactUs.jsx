import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faGlobe,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./Contactus.css";
import { Element } from "react-scroll";

function ContactUs() {
  return (
    <Element name="contact">
      <div className="ContactUsComponent" id="ContactUsComponent">
        <div className="row">
          <h1 className="h1-heading">Contact Us</h1>
          <div className="col-6">
            <table>
              <tbody>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faLocationDot} className="Fa-Icon" />
                    <br />
                    <b>Universal International School,</b>
                    <br />
                    339/, 51 Akkara 18 Rd,
                    <br />
                    Balangoda, Sri Lanka.
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faPhone} className="Fa-Icon" />
                    <br />
                    0777810740
                    <br />
                    <br />
                    <br />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FontAwesomeIcon icon={faGlobe} className="Fa-Icon" />
                    <br />
                    <a href="http://www.uissrilanka.com">www.uissrilanka.com</a>
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faEnvelope} className="Fa-Icon" />
                    <br />
                    info@uissrilanka.com
                  </td>
                </tr>
                <tr>
                  <td colSpan={2}>
                    <h4 className="h4-social">Stay Connected With Us!</h4>
                    <a
                      href="https://www.facebook.com/Universal-International-School-116576195107317/"
                      target="blank"
                    >
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="Fa-Icon-So"
                      />
                    </a>
                    <a
                      href="https://www.youtube.com/@universalschool1691"
                      target="blank"
                    >
                      <FontAwesomeIcon
                        icon={faYoutube}
                        className="Fa-Icon-So"
                      />
                    </a>
                    <a
                      href="https://twitter.com/i/flow/login?redirect_after_login=%2F"
                      target="blank"
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="Fa-Icon-So"
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.0152661178754!2d80.69990917411589!3d6.645025321741009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae3f341695ff0b1%3A0xc2d0af303751f15b!2sUniversal%20International%20School%20-%20Balangoda!5e0!3m2!1sen!2slk!4v1688301247429!5m2!1sen!2slk"
              title="Google-Maps"
              className="Maps"
            />
          </div>
        </div>
      </div>
    </Element>
  );
}

export default ContactUs;
