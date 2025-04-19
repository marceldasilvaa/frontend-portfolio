import "./Footer.css";

// link
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div id="footer">
      <p>
        Copyrigth &copy; <Link to="/about">Marcel Alves</Link>
      </p>
    </div>
  );
};

export default Footer;
