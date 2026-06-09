import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import logo from "../assets/logo.svg";
import '/style/global.css'

function Footer () {
    return (
<footer className="footer">
      <div className="footer-contact">
        <p>F.A.Q</p>
        <p>mentions légales</p>
        <p>contact</p>
      </div>

      <img src={logo} alt="Mountain" className="footer-logo" />

      <div className="footer-socials">
        <img src={facebook} alt="Facebook" className="facebook" />
        <img src={instagram} alt="Instagram" className="insta" />
      </div>
    </footer>



);};

export default Footer;