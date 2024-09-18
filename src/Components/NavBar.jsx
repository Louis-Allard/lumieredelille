import React from "react";
import { Link } from "react-router-dom";
import "../Styles/NavBar.scss";

const Navbar = () => {
    return (
        <nav className="navBar">
            <button className="buttonNavBar">Nos Autrices/Auteurs</button>
            <button className="buttonNavBar">Vos Avis</button>
            <button className="buttonNavBar">Contact</button>
        </nav>
    );
};

export default Navbar;
