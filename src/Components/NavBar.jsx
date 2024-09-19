import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.scss";

const Navbar = () => {
    return (
        <nav className="navBar">
            <button className="buttonNavBar">
                <Link to="/nos_autrices_auteurs">Nos Autrices/Auteurs</Link>
            </button>

            <button className="buttonNavBar">
                <Link to="/vos_avis">Vos Avis</Link>
            </button>

            <button className="buttonNavBar">
                <Link to="/contact" >Contact</Link>
            </button>
        </nav>
    );
};

export default Navbar;
