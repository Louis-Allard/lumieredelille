import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.scss";

const Navbar = () => {
    return (
        <nav className="navBar">
            <Link to="/nos_autrices_auteurs" className="buttonNavBar">
            <button className="buttonNavBar">Nos Autrices/Auteurs</button>
            </Link>

            <Link to="/vos_avis"className="buttonNavBar">
            <button className="buttonNavBar">Vos Avis</button>
            </Link>

            <Link to="/contact" className="buttonNavBar">
            <button className="buttonNavBar">Contact</button>
            </Link>
        </nav>
    );
};

export default Navbar;
