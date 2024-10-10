import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.scss";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navBar">
            <div className={`burger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
            
            {/* Menu de navigation pour les grands écrans */}
            <div className="navLinks">
                <Link to="/nos_autrices_auteurs" className="buttonNavBar" title="Autrices - Auteurs">
                    <button className="buttonNavBar">Autrices/Auteurs</button>
                </Link>

                <Link to="/catalogue" className="buttonNavBar" title="Catalogue">
                    <button className="buttonNavBar">Catalogue</button>
                </Link>

                <Link to="/actualités" className="buttonNavBar">
                    <button className="buttonNavBar" title="Actualités">Actualités</button>
                </Link>

                <Link to="/contact" className="buttonNavBar">
                    <button className="buttonNavBar" title="Contact">Contact</button>
                </Link>
            </div>

            {/* Menu de navigation pour les petits écrans */}
            <div className={`navLinksMobile ${isOpen ? "open" : ""}`}>
                <Link to="/nos_autrices_auteurs" className="navItem">Autrices/Auteurs</Link>
                <Link to="/catalogue" className="navItem">Catalogue</Link>
                <Link to="/actualités" className="navItem">Actualités</Link>
                <Link to="/contact" className="navItem">Contact</Link>
            </div>
        </nav>
    );
};

export default Navbar;