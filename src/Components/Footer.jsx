import React from "react";
import "../Styles/Footer.scss";
import Instagram from "../Assets/instagram.png";
import Facebook from "../Assets/logo-de-lapplication-facebook.png";
import Email from "../Assets/courrier.png";
import { Link } from "react-router-dom";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer">
            <div className="footerComplet">
                <div className="footerText">
                    <p><Link to="/CGV">CGV/CGU</Link> </p>
                    <p><Link to="/qui_sommes_nous?">Qui sommes-nous?</Link></p>
                    <p><Link to="/mentions_legales">Mentions légales</Link></p>
                    <p>&copy; Les Lumières de Lille {currentYear}</p>
                </div>
                <div className="iconeReseaux">
                    <img src={Instagram} alt="Instagram" className="icon" />
                    <img src={Facebook} alt="Facebook" className="icon" />
                    <img src={Email} alt="Email" className="icon3" />
                </div>
            </div>
        </footer>
    );
};

export default Footer;