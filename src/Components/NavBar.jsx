import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.scss";

const Navbar = () => {
    // État pour gérer l'ouverture/fermeture du menu sur les petits écrans
    const [isOpen, setIsOpen] = useState(false);

    // Fonction pour basculer l'état du menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navBar">
            {/* Logo ou autre contenu en haut si besoin */}
            
            {/* Bouton burger visible sur petits écrans */}
            <div className={`burger ${isOpen ? "open" : ""}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>

            {/* Menu de navigation, affiché ou caché en fonction de l'état */}
            <div className={`navLinks ${isOpen ? "open" : ""}`}>
                <Link to="/nos_autrices_auteurs" className="buttonNavBar">
                    <button className="buttonNavBar">Nos Autrices/Auteurs</button>
                </Link>

                <Link to="/vos_avis" className="buttonNavBar">
                    <button className="buttonNavBar">Vos Avis</button>
                </Link>

                <Link to="/contact" className="buttonNavBar">
                    <button className="buttonNavBar">Contact</button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
