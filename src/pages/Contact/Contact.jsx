import "./Contact.css";

// components
import { Link } from "react-router-dom";

// icons
import { BiLogoWhatsapp } from "react-icons/bi";
import { BiLogoInstagram } from "react-icons/bi";
import { BiLogoLinkedin } from "react-icons/bi";
import { MdOutlineEmail } from "react-icons/md";

const Contact = () => {
  return (
    <div id="contact">
      <div className="container">
        <h1>Meios de contato</h1>
        <p className="description">Entre em contato comigo como preferir pelos meios abaixo:</p>
        <div id="contacts">
          <div className="wpp">
            <Link
              to="https://api.whatsapp.com/send/?phone=%2B5521976589424&text&type=phone_number&app_absent=0"
              target="_blank"
            >
              <BiLogoWhatsapp />
              <p>Whatsapp</p>
            </Link>
          </div>
          <div className="insta">
            <Link to="https://www.instagram.com/yomarcelll/" target="_blank">
              <BiLogoInstagram />
              <p>Instagram</p>
            </Link>
          </div>
          <div className="linkedin">
            <Link
              to="https://www.linkedin.com/in/marcel-silva-251851302/"
              target="_blank"
            >
              <BiLogoLinkedin />
              <p>Linkedin</p>
            </Link>
          </div>
          <div className="email">
            <Link to="mailto:marcelalvessc@gmail.com" target="_blank">
              <MdOutlineEmail />
              <p>Email</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
